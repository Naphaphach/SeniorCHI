const vision =  require('@google-cloud/vision');
const admin = require('firebase-admin');

exports.handler = (object) => {
    const filePath = object.name
    const bucketName = object.bucket
    const metadata = object.metadata

    const tempLocalFile = path.join(os.tmpdir(), filePath)
    const tempLocalDir = path.dirname(tempLocalFile)

    const visionClient =  new vision.ImageAnnotatorClient();
    const storage = new Storage();
    const bucket = storage.bucket(bucketName)

    if (!object.contentType.startsWith('image/')) {
        console.log('This is not an image.')
        return null
    }

    if (metadata.autoOrient) {
        console.log('This is already rotated')
        return null
    }

    return mkdirp(tempLocalDir).then(() => {
        // Download file from bucket.
        return bucket.file(filePath).download({ destination: tempLocalFile })
    }).then(() => {
        const docId = filePath.split('.jpg')[0];

        const docRef = admin.firestore().collection('photos').doc(docId);

        // Await the cloud vision response
        const results = visionClient.labelDetection(imageUri);

        // Map the data to desired format
        const labels = results[0].labelAnnotations.map(obj => obj.description);
        const hotdog = labels.includes('hot dog')


        return docRef.set({ hotdog, labels })
    }).then(() => {
        console.log('rotated image created at', tempLocalFile)
        metadata.autoOrient = true
        return bucket.upload(tempLocalFile, {
            destination: filePath,
            metadata: { metadata: metadata }
        })
    }).then(() => {
        console.log('image uploaded to Storage at', filePath)
        // Once the image has been converted delete the local files to free up disk space.
        fs.unlinkSync(tempLocalFile)
        return console.log('Deleted local file', filePath)
    })
}
const mkdirp = require('mkdirp-promise')
const { Storage } = require('@google-cloud/storage');
const path = require('path')
const os = require('os')
const fs = require('fs')
const gm = require('gm').subClass({ imageMagick: true });
const spawn = require('child-process-promise').spawn

exports.handler = (object) => {
    const filePath = object.name
    const bucketName = object.bucket
    const metadata = object.metadata

    const tempLocalFile = path.join(os.tmpdir(), filePath)
    const tempLocalDir = path.dirname(tempLocalFile)

    const storage = new Storage();
    const bucket = storage.bucket(bucketName)

    if (!object.contentType.startsWith('image/')) {
        console.log('This is not an image.')
        return null
    }

    if (metadata.autoMarking) {
        console.log('This is already autoMarking')
        return null
    }

    return mkdirp(tempLocalDir).then(() => {
        // Download file from bucket.
        return bucket.file(filePath).download({ destination: tempLocalFile })
    }).then(() => {
        console.log('The file has been downloaded to', tempLocalFile)
        // Blur the image using ImageMagick.
        
        return new Promise((resolve, reject) => {
            gm(tempLocalFile)
                .drawRectangle(0, 200, 256, 256)
                .write(tempLocalFile, (err, stdout) => {
                    if (err) {
                        console.error('Failed to box.', err);
                        reject(err);
                    } else {
                        resolve(stdout);
                    }
                });
        });
    }).then(() => {
        console.log('rotated image created at', tempLocalFile)
        metadata.autoMarking = true
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
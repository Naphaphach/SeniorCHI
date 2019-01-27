const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const path = require('path')
const os = require('os')
const mkdirp = require('mkdirp-promise')
const fs = require('fs')

// Imports the Google Cloud client library
const language = require('@google-cloud/language');
// Creates a client
const client = new language.LanguageServiceClient();

exports.handler = (object) => {
    const filePath = object.name
    const bucketName = object.bucket
    const metadata = object.metadata

    const tempLocalFile = path.join(os.tmpdir(), filePath)
    const tempLocalDir = path.dirname(tempLocalFile)

    if (!metadata.tags) {
        console.log('not look the meaning of the image yet');
        return null
    }

    if (metadata.themes) {
        console.log('already looking at theme');
        return null
    }

    const bucket = storage.bucket(bucketName)

    return mkdirp(tempLocalDir).then(() => {
        // Download file from bucket.
        return bucket.file(filePath).download({ destination: tempLocalFile })
    }).then(() => {
        const document = {
            content: metadata.tags,
            type: 'PLAIN_TEXT',
        };
        return client.analyzeEntities({ document: document })
    }).then((results) => {
        const entities = results[0].entities;
        metadata.themes = [...new Set(entities.map(entity => entity.type))].toString()
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
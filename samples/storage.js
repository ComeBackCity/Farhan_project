const fs = require('fs')
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage({
    keyFilename: "Ajraar-shop-c838fbef2c87.json",
    projectId: 'ajraar-shop'
});

const bucketName = 'ajraar-shop.appspot.com';
const bucket = storage.bucket(bucketName);

const baseURL = "https://storage.cloud.google.com/ajraar-shop.appspot.com/"

const ourFileLocation = "./example.png"
const cloudStorageFileLocation = "photo/test.png"

const file = bucket.file(cloudStorageFileLocation);

fs.createReadStream(ourFileLocation)
    .pipe(file.createWriteStream({resemble: false}))
    .on('error', function(err) {console.log(err)})
    .on('finish', function(res) {
        console.log("Done")
        console.log("DownLoad Link",  baseURL + cloudStorageFileLocation)
        console.log(res)
    });

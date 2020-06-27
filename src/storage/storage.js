const express = require('express')
const router = new express.Router()
const multer = require('multer')
const {Storage} = require('@google-cloud/storage')

const MAX_IMAGE_SIZE = 10 * 1024 * 1024

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]

    if(!allowedTypes.includes(file.mimetype)){
        const error = new Error("Only jpeg, jpg and png images are allowed.")
        error.code = "INCORRECT_FILETYPE"

        return cb(error, false)
    }

    return cb(null, true)
}

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: {
        fileSize: MAX_IMAGE_SIZE
    }
})

const storage = new Storage({
    keyFilename: "Ajraar-shop-c838fbef2c87.json",
    projectId: 'ajraar-shop'
});

const bucketName = 'ajraar-shop.appspot.com';
const bucket = storage.bucket(bucketName);

const baseURL = "https://storage.cloud.google.com/ajraar-shop.appspot.com/"

router.post('/dashboard/image/upload', upload.single('image'), (req, res) => {
    //console.log(req.file)

    const name = getRandomName(req.file.originalname)
    const cloudStorageFileName = "photo/"  + name
    const file = bucket.file(cloudStorageFileName);

    file.createWriteStream({resemble: false})
        .on('error', function(err) {
            console.log(err)
            res.status(400).send("Error")
        })
        .on('finish', function(result) {
            //console.log("Done")
            //console.log("DownLoad Link",  baseURL + cloudStorageFileName)

            res.send({
                name,
                link: baseURL + cloudStorageFileName,
            })

        }).end(req.file.buffer)
})

const getRandomName = (name) => {
    return new Date().getTime().toString() +
        Math.ceil(Math.random() * 10000 + 112345).toString() +
        "." + name.split('.').pop()
}

module.exports = router

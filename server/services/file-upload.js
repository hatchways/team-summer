const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');

const { secretAccessKey, accessKeyId, region, bucket } = process.env;

aws.config.update({
    secretAccessKey,
    accessKeyId,
    region
})

const app = express();
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'TESTING_META_DATA!' });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
})

module.exports = upload;
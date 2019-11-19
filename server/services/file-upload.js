const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');

const { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, AWS_REGION, AWS_BUCKET } = process.env;

aws.config.update({
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY_ID,
    region: AWS_REGION
})

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'TESTING_META_DATA!' });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
})

module.exports = upload;
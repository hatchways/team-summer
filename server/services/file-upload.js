const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY_ID, AWS_REGION, AWS_BUCKET } = process.env;

aws.config.update({
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    accessKeyId: AWS_ACCESS_KEY_ID,
    region: AWS_REGION
})

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid MIME Type, only JPEG or PNG'), false)
    }
}

const upload = multer({
    fileFilter,
    storage: multerS3({
        s3,
        bucket: AWS_BUCKET,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'TESTING_META_DATA!' });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
})

module.exports = upload;
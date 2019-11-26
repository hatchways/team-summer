const express = require("express");
const router = express.Router();
const {isAuth} = require('../middlewares')
// const { userById } = auth;

const { imageUpload, addProject, getProject } = require('../controllers/project');
const auth = require('../controllers/authController.api');

router.get('/:id', getProject)

router.post('/image-upload', imageUpload);
router.post('/', isAuth, addProject); //now receives userId from isAuth

// router.param('userId', userById);

module.exports = router;
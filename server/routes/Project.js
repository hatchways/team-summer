const express = require("express");
const router = express.Router();

const { imageUpload, addProject } = require('../controllers/project');
const auth = require('../controllers/authController.api');
const { isAuth, userById } = auth;

router.post('/projects/image-upload', imageUpload);
router.post('/projects/add/:userId', isAuth, addProject);

router.param('userId', userById);

module.exports = router;
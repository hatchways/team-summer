const express = require("express");
const router = express.Router();

const { imageUpload, getProjects, addProject } = require('../controllers/project');
const auth = require('../controllers/authController.api');
const { isAuth, userById } = auth;

router.get('/projects', getProjects);
router.post('/projects/image-upload', imageUpload);
router.post('/projects/add/:userId', isAuth, addProject);

router.param('userId', userById);

module.exports = router;
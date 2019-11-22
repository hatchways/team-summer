const express = require("express");
const router = express.Router();

const { projectById, getUserProjects, imageUpload, addProject } = require('../controllers/project')
const { verifyJwt } = require('../middlewares')
const auth = require('../controllers/authController.api');
const { isAuth, userById } = auth;

router.get('/projects/:userId', getUserProjects);
router.post('/projecs/image-upload', imageUpload);
router.post('/projects/add/:userId', verifyJwt, isAuth, addProject);

router.param('userId', userById);
// router.param('projectId', projectById);

module.exports = router;
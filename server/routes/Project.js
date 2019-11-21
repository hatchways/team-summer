const express = require("express");
const router = express.Router();

const { projectById, getUserProjects, imageUpload, addProject } = require('../controllers/project')
const auth = require('../controllers/authController.api');
const { requireSignIn, isAuth, userById } = auth;

// router.get('/:userId/:projectId', getProject);
router.get('/projects/:userId', getUserProjects);
router.post('/projecs/image-upload', imageUpload);
router.post('/projects/add/:userId', requireSignIn, isAuth, addProject);

router.param('userId', userById);
// router.param('projectId', projectById);

module.exports = router;
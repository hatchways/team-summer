const express = require("express");
const router = express.Router();

const { projectById, getProjects, imageUpload, addProject } = require('../controllers/Project')
const auth = require('../controllers/authController.api');
const { requireSignIn, isAuth, userById } = auth;

// router.get('/:userId/:projectId', getProject);
router.get('/projects/:userId', getProjects);
router.post('/projecs/image-upload', imageUpload);
// router.post('/add/:userId', addProject);
router.post('/projects/add/:userId', requireSignIn, isAuth, addProject);
// router.post('/user/:userId/projects', requireSignIn, isAuth, addProject);

router.param('userId', userById);
// router.param('projectId', projectById);

module.exports = router;
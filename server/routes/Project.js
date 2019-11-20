const express = require("express");
const router = express.Router();

const { projectById, getProjects, imageUpload, uploadImages, addProject } = require('../controllers/Project')
// const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');

// router.get('/:userId/:projectId', getProject);
router.get('/:userId', getProjects);
router.post('/image-upload', imageUpload);
// router.post('/add/:userId', addProject);
router.post('/add/:userId', uploadImages, addProject);
// router.post('/user/:userId/projects', requireSignIn, isAuth, addProject);

// router.param('userId', userById);
// router.param('projectId', projectById);

module.exports = router;
const express = require("express");
const router = express.Router();

const { projectById, getProjects } = require('../controllers/Project')
// const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');

// router.get('/:projectId', getProject);
router.get('/:userId/projects', getProjects);
// router.post('/user/:userId/projects', requireSignIn, isAuth, addProject);

router.param('userId', userById);
router.param('projectId', projectById);

module.exports = router;
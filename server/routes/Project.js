const express = require("express");
const router = express.Router();

const { getProjects } = require('../controllers/Project')
// const { requireSignIn, isAuth, isAdmin } = require('../controllers/auth');

router.get('/user/:userId/projects', getProjects);
// router.post('/user/:userId/projects', requireSignIn, isAuth, addProject);

router.param('userId', userById);

module.exports = router;
const express = require("express");
const router = express.Router();
const { isAuth, userById } = require('../middlewares');
const projects = require('../controllers/project');

router.get('/:id', projects.getProject)
router.get('/:userId', projects.getProjects);
router.post('/image-upload', projects.imageUpload);
router.post('/', isAuth, projects.addProject);

router.param('userId', userById);

module.exports = router;

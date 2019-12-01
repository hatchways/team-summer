const express = require("express");
const router = express.Router();
const { isAuth, userById } = require('../middlewares');
const projects = require('../controllers/project');

router.get('/:id', projects.getProject);
router.post('/', isAuth, projects.addProject);
router.get('/', projects.getUserProjects); //?userId=
router.post('/image-upload', projects.imageUpload);

router.param('userId', userById);

module.exports = router;

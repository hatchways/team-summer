const express = require("express");
const router = express.Router();
const { isAuth, userById } = require('../middlewares');
const projects = require('../controllers/projectController.api');

router.get('/:projectId', projects.getProject);
router.post('/', isAuth, projects.addProject);
router.put('/:projectId', isAuth, projects.editProject);
router.get('/', projects.getUserProjects); //?userId=
router.post('/image-upload', projects.imageUpload);

router.param('userId', userById);

module.exports = router;

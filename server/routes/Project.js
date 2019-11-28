const express = require("express");
const router = express.Router();
const { isAuth, userById } = require('../middlewares');
const projects = require('../controllers/project');

router.get('/:id', projects.getProject)
router.post('/image-upload', projects.imageUpload);
router.post('/', isAuth, projects.addProject);

module.exports = router;

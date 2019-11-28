const { User, Project } = require('../models');
const { popUserProjects } = require('../utils');

const upload = require('../services/file-upload');
const singleUpload = upload.single('image');
const multiUpload = upload.array('images');

exports.imageUpload = (req, res) => {
  singleUpload(req, res, function(err) {
    if (err)
      return res
        .status(422)
        .json({ errors: [{ title: 'File Upload Error', detail: err.message }] });
    return res.json({ imageUrl: req.file.location });
  });
};

exports.addProject = (req, res) => {
  multiUpload(req, res, async (err) => {
    if (err)
      return res.status(422).json({
        errors: [
          {
            title: 'File Upload Error',
            detail: err.message
          }
        ]
      });
    const { title, description, industry, location, fundingGoal } = req.body;
    const images = req.files ? req.files.map((file) => file.location) : [];
    const user = req.user
    try {
      const project = await Project.create({
        user,
        title,
        description,
        industry,
        location,
        images,
        fundingGoal: parseInt(fundingGoal)
      });
      await User.updateOne({ _id: user._id }, { $push: { projects: project._id } });
      res.json(project);
    } catch (err) {
      res.status(400).json({
        error: "User project's could not be updated.",
        err
      });
    }
  });
};

exports.getProject = (req, res) => {
  const { id } = req.params;
  Project.findOne({ _id: id }, async (err, project) => {
    if (err) {
      res.json({
        status: 500,
        err
      });
    } else {
      res.json({
        status: 200,
        project: project 
      });
    }
  });
};

const { User, Project } = require('../models');
const { popUserProjects } = require('../utils');

const upload = require('../services/file-upload');
const singleUpload = upload.single('image');
const multiUpload = upload.array('images');

exports.imageUpload = (req, res) => {
  singleUpload(req, res, function (err) {
    if (err)
      return res
        .status(422)
        .json({ errors: [{ title: 'File Upload Error', detail: err.message }] });
    return res.json({ imageUrl: req.file.location });
  });
};

exports.getProject = (req, res) => {
  const { projectId } = req.params;

  Project.findOne({ _id: projectId })
    .populate({ path: 'user', select: 'name' })
    .exec((err, project) => {
      if (err) return res.status(400).json({ err });

      return res.status(200).json(project);
    });
};

exports.getUserProjects = (req, res) => {
  const _id = req.query.userId;

  const order = req.query.order || 'asc';
  const sortBy = req.query.sortBy || 'fundingDeadline';
  const cutoff = new Date();

  const filterOptions = {
    user: { $ne: _id },
    fundingDeadline: { $gt: cutoff }
  };

  if (req.query.industry) filterOptions.industry = req.query.industry;
  if (req.query.location) filterOptions.location = req.query.location;

  Project.find(filterOptions)
    .populate({ path: 'user', select: 'name' })
    .sort([[sortBy, order]])
    .exec((err, projects) => {
      if (err) {
        return res.status(400).json({
          error: 'Projects not found.'
        });
      }
      return res.status(200).json(projects);
    });
};

exports.addProject = (req, res) => {
  multiUpload(req, res, async (err) => {
    if (err) {
      return res.status(422).json({
        errors: [
          {
            title: 'File Upload Error',
            detail: err.message
          }
        ]
      });
    }

    const { title, subtitle, description, industry, location, fundingGoal, fundingDeadline } = req.body;

    const images = req.files ? req.files.map((file) => file.location) : [];
    const user = req.user;
    try {
      const project = await Project.create({
        user,
        title,
        subtitle,
        description,
        industry, location,
        images,
        fundingGoal: parseInt(fundingGoal),
        fundingDeadline
      });
      await User.updateOne({ _id: user._id }, { $push: { projects: project._id } });
      return res.status(200).json(project);
    } catch (err) {
      return res.status(400).json({
        error: 'User project\'s could not be created.',
        err
      });
    }
  });
};

exports.editProject = async (req, res) => {
  multiUpload(req, res, async (err) => {
    if (err) {
      return res.status(422).json({
        errors: [
          {
            title: 'File Upload Error',
            detail: err.message
          }
        ]
      });
    }
    if (req.body.projectUserId !== req.user._id) {
      return res.status(403).json({
        error: 'Access denied.'
      });
    }
    try {
      const { projectId } = req.params;
      const { title, subtitle, description, industry, location, fundingGoal, stringImage, fundingDeadline } = req.body;
      let images = req.files ? req.files.map((file) => file.location) : stringImage;
      if (req.files && stringImage) images = [...images, stringImage];
      const newProject = { title, subtitle, description, industry, location, fundingGoal: parseInt(fundingGoal), fundingDeadline, images };
      await Project.findByIdAndUpdate(
        { _id: projectId },
        { $set: newProject },
        { new: true },
        (err, newProject) => {
          if (err) {
            return res.status(400).json({
              error: 'Project could not be updated.'
            })
          }
          return res.status(200).json(newProject);
        }
      )
    } catch (err) {
      res.status(400).json({
        error: 'User project\'s could not be updated',
        err
      })
    }
  })
}
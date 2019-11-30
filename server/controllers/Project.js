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

exports.getProjects = (req, res) => {
    const { _id } = req.profile;
    const order = req.query.order || 'asc';
    const sortBy = req.query.sortBy || 'fundingDeadline';
    const limit = parseInt(req.query.limit) || 6;
    const cutoff = new Date();

    const filterOptions = {
        user: { $ne: _id },
        fundingDeadline: { $gt: cutoff },
    }

    if (req.query.industry) filterOptions.industry = req.query.industry;
    if (req.query.location) filterOptions.location = req.query.location;

    console.log(order, sortBy, limit)
    Project.find(filterOptions)
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, projects) => {
            if (err) {
                return res.status(400).json({
                    error: "Projects not found."
                })
            }
            return res.status(200).json(projects);
        })
}

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
    const { title, subtitle, description, industry, location, fundingGoal, fundingDeadline } = req.body;

    const images = req.files ? req.files.map((file) => file.location) : [];
    const user = req.user
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
      res.json(project);
    } catch (err) {
      res.status(400).json({
        error: "User project's could not be updated.",
        err
      });
    }
  });
};

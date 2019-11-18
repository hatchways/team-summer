const Project = require('../models/Project');

exports.getProjects = (req, res, next) => {
    Project.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, projects) => {
            if (err) {
                return res.status(400).json({
                    error: 'Projects not found.'
                });
            }
            res.json(projects)
        })
}

exports.addProject = (req, res, next) => {
    const project = new Project(req.body);
    Project.save((err, project) => {
        if (err) {
            return res.status(400).json({
                error: 'Project could not be created.'
            });
        }
        res.json(project)
    })
}
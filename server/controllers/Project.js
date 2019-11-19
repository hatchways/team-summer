const Project = require('../models/Project');
const upload = require('../services/file-upload');
const singleUpload = upload.single('image');

exports.imageUpload = (req, res) => {
    singleUpload(req, res, function (err) {
        if (err) return res.status(400).json({ 'error': err });
        return res.json({ 'imageUrl': req.file.location })
    })
}

exports.projectById = (req, res, next, id) => {
    Project.findById(id)
        .populate('user')
        .exec((err, project) => {
            if (err || !project) {
                return res.status(400).json({
                    error: 'Project not found.'
                });
            }
            req.project = project;
            next();
        })
}

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
    const { userId } = req.params
    const { title, description, industry, location, fundingGoal } = req.body
    const project = new Project({ title, description, industry, location, fundingGoal: parseInt(fundingGoal) });
    project.save((err, project) => {
        if (err) {
            return res.status(400).json({
                error: 'Project could not be created.'
            });
        }
        return res.json(project)
    })
}
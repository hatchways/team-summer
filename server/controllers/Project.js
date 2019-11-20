const Project = require('../models/Project');
const formidable = require('formidable');
const upload = require('../services/file-upload');
const singleUpload = upload.single('image');
const multiUpload = upload.array('images');


exports.imageUpload = (req, res) => {
    singleUpload(req, res, function (err) {
        if (err) return res.status(422).json({ errors: [{ title: 'File Upload Error', detail: err.message }] });
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

exports.uploadImages = (req, res, next) => {
    console.log('req', req)
    multiUpload(req, res, function (err) {
        if (err) return res.status(422).json({ errors: [{ title: 'File Upload Error', detail: err.message }] });
        const fileLocations = req.files.map(file => file.location);
        req.locations = fileLocations
        next();
    })
}

exports.addProject = (req, res, next) => {
    // console.log('req files', req.locations)
    const images = req.locations
    console.log(images)
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded.'
            });
        }

        const { title, description, industry, location, fundingGoal } = fields;
        if (!title || !description || !industry || !location || !fundingGoal) {
            return res.status(400).json({
                error: 'Please fill out the required fields.'
            });
        }
        console.log(fields)
        const project = new Project({ title, description, industry, location, images, fundingGoal: parseInt(fundingGoal) })
        project.save((err, project) => {
            if (err) {
                return res.status(400).json({
                    error: 'Project could not be created.'
                })
            }
            return res.json(project);
        })
        // console.log(fields)
        // return res.status(200).json('hey who is that female?')
    })
}
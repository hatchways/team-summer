const { User, Project } = require('../models');
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

exports.addProject = (req, res) => {
    multiUpload(req, res, function (err) {
        if (err) return res.status(422).json({
            errors: [{
                title: 'File Upload Error', detail: err.message
            }]
        });
        const { title, description, industry, location, fundingGoal } = req.body;
        if (!title || !description || !industry || !location || !fundingGoal) {
            return res.status(400).json({
                error: 'Please fill out the required fields.'
            });
        }
        const images = req.files.map(file => file.location);
        const user = req.profile;
        const project = new Project({
            user,
            title,
            description,
            industry, location,
            images,
            fundingGoal: parseInt(fundingGoal)
        })
        project.save((err, project) => {
            if (err) {
                return res.status(400).json({
                    error: 'Project could not be created.'
                })
            }
            User.updateOne(
                { "_id": user._id },
                { "$push": { "projects": project._id } },
                (err, project) => {
                    if (err) {
                        return res.status(400).json({
                            error: "User project\'s could not be updated."
                        });
                    }
                    console.log(project);
                }
            )
            return res.json(project);
        })
    })
}
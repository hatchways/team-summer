const { ObjectId } = require('mongoose').Types;
const { User, Project, Investment } = require('../models');

exports.addInvestment = async (req, res) => {
    const { value, projectId } = req.body;
    const user = req.user

    try {
        const investment = await Investment.create({
            user: ObjectId(user._id),
            project: ObjectId(projectId),
            value: parseInt(value)
        });
        await User.updateOne({ _id: user._id }, { $push: { investments: investment._id } });
        await Project.updateOne(
            { _id: projectId },
            {
                $inc: {
                    'funding.donorCount': 1,
                    'funding.fundingTotal': parseInt(value)
                }
            }
        );
        res.status(201).send(investment);
    } catch (err) {
        res.status(400).json({
            error: "User Investment's could not be updated.",
            err
        });
    }
};

exports.getInvestment = async (req, res) => {
    const { id } = req.params;

    Investment.findById(id)
        // .populate('user')
        .populate('projects')
        .exec((err, investment) => {
            if (err) {
                return res.status(400).json({
                    error: 'Investment could not be found.',
                    err
                });
            }
            return res.status(200).json(investment);
        })
}
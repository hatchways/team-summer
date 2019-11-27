const { ObjectId } = require('mongoose').Types;
const {User, Project, Investment} = require('../models');

exports.addInvestment = async (req, res) => {
  const { value, projectId } = req.body;
  const user = req.profile._id;

  try {
    const investment = await Investment.create(
      { user, project: ObjectId(projectId), 
        value: parseInt(value) }
    );
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

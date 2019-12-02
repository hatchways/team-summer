const { ObjectId } = require('mongoose').Types;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {User, Project, Investment} = require('../models');

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


exports.sendKey = (req, res) => {
  try {
    res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY });
  } catch (e) {
    res.send({ error: e.message });
  }
};

const fromDollarToCent = (amount) => parseInt(amount * 100);

exports.makePayment = async (req, res) => {
  const { investmentAmount, token } = req.body;
  const t = token.token
  console.log('token invest id', t)

  const order = {
      amount: fromDollarToCent(2000),
      currency: 'USD',
      source: t.id, 
      description: 'test desc'
    }

  console.log("order",order)
  stripe.charges.create( order, (err, charge) => {
      if(err){
        res.send({ errooor: err });
      } else {
        res.send(charge);
      }
    }
  );
}


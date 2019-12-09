const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { ObjectId } = require('mongoose').Types;
const { User, Project, Investment } = require('../models');


exports.getInvestment = async (req, res) => {
  const { id } = req.params;

  Investment.findById(id)
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

const invest = async (userId, projectId, investmentAmount) => {
  const dollarAmount = toDollarsWithCents(investmentAmount)

  try {
    const investment = await Investment.create({
      user: ObjectId(userId),
      project: ObjectId(projectId),
      value: dollarAmount
    });
    await User.updateOne(
      { _id: userId }, 
      { $push: { investments: investment._id } }
    );
    await Project.updateOne(
      { _id: projectId },
      { $inc: {
          'funding.donorCount': 1,
          'funding.fundingTotal': dollarAmount
        }
      }
    );
    return investment;
  } catch (err) {
    res.status(400).json({
      error: "User Investment's could not be updated."
    });
  }
};

//adds cents to dollar amount
//stripe counts the last two digits on an int as cents
const toDollarsWithCents = (amount) => parseInt(amount * 100);

exports.makePayment = async (req, res) => {
  const { projectId, token, investmentAmount } = req.body;
  const userId = req.user._id
  const dollarAmount = toDollarsWithCents(investmentAmount)
  const stripeToken = token.token

  const order = {
    amount: dollarAmount,
    currency: 'USD',
    source: stripeToken.id,
    description: 'investment'
  }
  try {
    const investment = await invest(userId, projectId, investmentAmount);
    if (investment) {
      stripe.charges.create(order, (err, charge) => {
        if (err) {
          return res.status(400).json({ message: 'an error occurred' });
        } else {
          return res.status(200).json({ investment });
        }
      })
    }
  } catch (err) {
    return res.status(400).json({ message: 'an error occurred' });
  }
}
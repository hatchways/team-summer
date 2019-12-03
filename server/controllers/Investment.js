const { ObjectId } = require('mongoose').Types;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {User, Project, Investment} = require('../models');



//I've adjusted this to be called prior to the payment but needs a refactor
//might be cleaner with promise chains
const invest = async (userId, projectId, token, investmentAmount) => {
  try {
    const investment = await Investment.create({
      user: ObjectId(userId),
      project: ObjectId(projectId),
      value: fromDollarsToCents(investmentAmount)
    });
    await User.updateOne({ _id: userId }, { $push: { investments: investment._id } });
    await Project.updateOne(
      { _id: projectId },
      {
        $inc: {
          'funding.donorCount': 1,
          'funding.fundingTotal': fromDollarsToCents(investmentAmount)
        }
      }
    );
    return investment;
  } catch (err) {
    return err
  }
};

const fromDollarsToCents = (amount) => parseInt(amount * 100);

exports.makePayment = async (req, res) => {
  const { userId, projectId, token, investmentAmount } = req.body;
  const t = token.token

  const order = {
      amount: fromDollarsToCents(investmentAmount),
      currency: 'USD',
      source: t.id, 
      description: 'investment'
    }

  try {
    const investment = await invest(userId, projectId, token, investmentAmount);
    console.log("investment", investment)
    if (investment) {
      stripe.charges.create( order, (err, charge) => {
        if(err){
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


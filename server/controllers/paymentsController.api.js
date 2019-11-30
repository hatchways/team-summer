'use strict';
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { User } = require('../models');
// const { Investment } = require('../models');


exports.sendKey = (req, res) => {
  res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY });
};


const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // You should always calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

exports.pay = async (req, res) => {
  const { token, items } = req.body;

  const orderAmount = calculateOrderAmount(items);

  try {
    // Create a charge with the token sent by the client
    const charge = await stripe.charges.create({
      amount: orderAmount,
      currency: "usd",
      source: token
    });

    // The payment was processed
    res.send(charge);
  } catch (e) {
    // Handle "hard declines" e.g. insufficient funds, expired card, etc
    // See https://stripe.com/docs/declines/codes for more
    res.send({ error: e.message });
  }
}

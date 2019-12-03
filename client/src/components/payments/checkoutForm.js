import React, { Component } from "react";
import { pay } from '../../api/payments';

import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PaymentRequestButtonElement,
  StripeProvider,
  Elements,
  injectStripe
} from 'react-stripe-elements';

import './checkoutForm.css'


const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4'
        },
        padding
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };
};

const  CheckoutForm = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userId, projectId, investmentAmount } = props

    if (props.stripe) {
      props.stripe.createToken().then((payload) => {
        pay(userId, projectId, payload, investmentAmount).then((investment) => {
          return investment
        });
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card details
        <CardElement
          {...createOptions(props.fontSize)}
        />
      </label>
      <button>Pay</button>
    </form>
  );
}

export default injectStripe(CheckoutForm);


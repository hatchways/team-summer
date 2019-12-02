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

const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = (change) => {
  console.log('[change]', change);
};
const handleClick = () => {
  console.log('[click]');
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

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

class _CardForm extends React.Component {
  
  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then((payload) => {
        pay(payload, 5000);
      })
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <label>
      Card details
      <CardElement
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      onReady={handleReady}
      {...createOptions(this.props.fontSize)}
      />
      </label>
      <button>Pay</button>
      </form>
      );
    }
}
const CardForm = injectStripe(_CardForm);



class CheckoutForm extends React.Component {
  constructor() {
    super();
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px'
    };
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({ elementFontSize: '14px' });
      } else if (window.innerWidth >= 450 && this.state.elementFontSize !== '18px') {
        this.setState({ elementFontSize: '18px' });
      }
    });
  }

  render() {
    const { elementFontSize } = this.state;
    return (
      <div className="Checkout">
        <Elements>
          <CardForm fontSize={elementFontSize} />
        </Elements>
      </div>
    );
  }
}

export default CheckoutForm;


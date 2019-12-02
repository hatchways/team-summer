import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../components/payments/checkoutForm';
import { getPublicStripeKey } from '../api/payments';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      pending: false
    };
  }

  render() {
    return (
      <div className="checkout">
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}>
          <CheckoutForm projectId={'5ddd811b557fb6177e87eb05'} />
        </StripeProvider>
      </div>
      );
    }
  }
  
  export default Checkout;

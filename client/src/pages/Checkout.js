import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../components/payments/CheckoutForm';
import { getPublicStripeKey } from '../api/payments';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiKey: null
    };
  }

  componentDidMount() {
    getPublicStripeKey().then((apiKey) => {
      this.setState({
        apiKey: apiKey
      });
    });
  }

  render() {
    return (
      <div className="checkout">
        {this.state.apiKey && (
          <StripeProvider apiKey={this.state.apiKey}>
            <Elements>
              <CheckoutForm />
            </Elements>
          </StripeProvider>
        )}
      </div>
    );
  }
}

export default Checkout;

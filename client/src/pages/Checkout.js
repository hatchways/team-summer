import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../components/payments/checkoutForm';
import { getPublicStripeKey } from '../api/payments';

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      publicKey: '',
      projectId: '5ddd811b557fb6177e87eb05'
    };
  }

  componentDidMount() {
    getPublicStripeKey().then(({data}) => {
      this.setState({
        test: 'testing',
        publicKey: data.publicKey,
      });
    });
  }

  render() {
    return (
      <div className="checkout">
        {this.state.publicKey && (
          <StripeProvider apiKey={this.state.publicKey}>
              <CheckoutForm projectId={this.state.projectId}/>
          </StripeProvider>
        )}
      </div>
    );
  }
}

export default Checkout;

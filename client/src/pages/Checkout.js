import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from '../components/payments/CheckoutForm';
const stripeApiKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

class Checkout extends Component {

    render() {
        return (
            <div className="checkout">
                <StripeProvider apiKey={stripeApiKey}>
                    <Elements>
                        <CheckoutForm
                            projectId={this.props.projectId}
                            projectTitle={this.props.projectTitle}
                            handleClosePopup={this.handleClosePopup}
                            handlePaymentCompletion={this.handlePaymentCompletion} />
                    </Elements>
                </StripeProvider>
            </div>
        );
    }
}

export default Checkout;
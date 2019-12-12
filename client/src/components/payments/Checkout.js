import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from 'components/payments/CheckoutForm';
const stripeApiKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

class Checkout extends Component {

    render() {
        const {
            projectId,
            projectTitle,
            handleClosePopup,
            handlePaymentCompletion} = this.props

        return (
            <div className="checkout">
                <StripeProvider apiKey={stripeApiKey}>
                    <Elements>
                        <CheckoutForm
                            projectId={projectId}
                            projectTitle={projectTitle}
                            handleClosePopup={handleClosePopup}
                            handlePaymentCompletion={handlePaymentCompletion} />
                    </Elements>
                </StripeProvider>
            </div>
        );
    }
}

export default Checkout;
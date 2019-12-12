import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from 'components/payments/CheckoutForm';
const stripeApiKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

class Checkout extends Component {

    render() {
        const {
            userName,
            projectOwner,
            projectId,
            projectTitle,
            handleClosePopup,
            handlePaymentCompletion,
            socket
        } = this.props

        return (
            <div className="checkout">
                <StripeProvider apiKey={stripeApiKey}>
                    <Elements>
                        <CheckoutForm
                            projectId={projectId}
                            projectTitle={projectTitle}
                            handleClosePopup={handleClosePopup}
                            handlePaymentCompletion={handlePaymentCompletion}
                            userName={userName}
                            projectOwner={projectOwner}
                            socket={socket}
                        />
                    </Elements>
                </StripeProvider>
            </div>
        );
    }
}

export default Checkout;
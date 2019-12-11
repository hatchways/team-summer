import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from 'components/payments/CheckoutForm';
const stripeApiKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

class Checkout extends Component {

    render() {
        const { projectId, projectTitle, userId, handlePaymentCompletion } = this.props
        
        return (
            <div className="checkout">
                <StripeProvider apiKey={stripeApiKey}>
                    <Elements>
                        <CheckoutForm
                            handlePaymentCompletion={handlePaymentCompletion}
                            projectId={projectId}
                            projectTitle={projectTitle}
                            userId={userId} />
                    </Elements>
                </StripeProvider>
            </div>
        );
    }
}

export default Checkout;

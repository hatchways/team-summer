import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from '../components/payments/CheckoutForm';
import { withPageContext } from '../components/pageContext';
const stripeApiKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

class Checkout extends Component {

    renderForm = () => {
        const {
            history,
            activateToast,
            location: { state: { projectId, projectTitle, userId } }
        } = this.props

        return (
            <StripeProvider apiKey={stripeApiKey}>
                <Elements>
                    <CheckoutForm
                        projectId={projectId}
                        history={history}
                        projectTitle={projectTitle}
                        userId={userId}
                        activateToast={activateToast} />
                </Elements>
            </StripeProvider>
        );
    }

    render() {
        return (
            <div className="checkout">
                {this.renderForm()}
            </div>
        );
    }
}

export default withPageContext(Checkout);
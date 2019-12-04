import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from '../components/payments/checkoutForm';
const apiKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'INACTIVE' //SUCCESS, FAIL, PENDING
    };
  }

  handlePmtStatus = (status) => {
    if (status === 'SUCCESS') this.handleSuccess();
    this.setState(status)
  }

  handleClose = () => {
    //TODO: redirect to...
  }

  renderContent = () => {
    const { status } = this.state

    if (status === 'INACTIVE') {
      return this.renderForm()
    } else {
      if (status === 'SUCCESS') {
        return <h3>success</h3>
      }
      else if (status === 'PENDING') {
        return <h3>loading</h3> //WE need a loading component
      }
      else { //FAILURE
        return <h3>that didn't work. try again?</h3>//TODO: try again button
      }
    }
  }

  renderTryAgainButton = () => {
    // TODO: set status back to inactive
  }

  renderForm = () => {
    // const { userId, projectId, projectName } = this.props
    const projectId = '5ddd811b557fb6177e87eb05';
    const userId = '5ddd6d81cc85fd072f13f532';
    const projectName = 'some great project'

    return (
      <StripeProvider apiKey={apiKey}>
        <Elements>
          <CheckoutForm
            projectId={projectId}
            userId={userId}
            projectName={projectName}
            handlePmtStatus={this.handlePmtStatus} />
        </Elements>
      </StripeProvider>
    );
  }

  render() {
    return (
      <div className="checkout">
        {this.renderContent()}
      </div>
    );
  }
}

export default Checkout;

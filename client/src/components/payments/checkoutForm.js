import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import "./checkoutForm.css";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 4000,
      currency: "",
      clientSecret: null,
      error: null,
      metadata: null,
      disabled: false,
      succeeded: false,
      processing: false
    };
  }

  componentDidMount() {
    // Step 1: Fetch product details such as amount and currency 
    // from API to make sure it can't be tampered with in the client.
    // api.getProductDetails().then(productDetails => {
    //   this.setState({
    //     amount: productDetails.amount / 100,
    //     currency: productDetails.currency
    //   });
    // });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const stripe = require('stripe')('sk_test_3Fg6kMZnk5fYn908gMc2ERBK00anJkgGpg');

    const stripeAuthHeader = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer rk_test_Cta0Tyvtm5APY9rMpo1r5Y8N`
    }

      this.props.stripe.createToken({name: state.name}).then(({token}) => {
        /* //Simple Direct Charge//
          const price = cart.banana * prices.banana + cart.cucumber * prices.cucumber
          axios.post(`https://api.stripe.com/v1/charges`, 
          qs.stringify({
            source: token.id,
            amount: price,
            currency: 'usd'
          }),
          { headers: stripeAuthHeader })
          .then((resp) => {
            this.setState({fetching: false})
            alert(`Thank you for your purchase! You card has been charged with: ${(resp.data.amount / 100).toLocaleString('en-US', {style: 'currency', currency: 'usd'})}`)
          })
          .catch(error => {
            this.setState({fetching: false})
            console.log(error)
          })
        */

        const order = {
          currency: 'usd',
          items: Object.keys(cart).filter((name) => cart[name] > 0 ? true : false).map(name => {
            return {
              type: 'sku',
              parent: skus[name],
              quantity: cart[name]
            }
          }),
          email: state.email,
          shipping: {
            name: state.name,
            address: state.address
          }
        }

        if (state.coupon) {
          order.coupon = state.coupon
        }

        axios.post(`http://localhost:3001/api/shop/order`, {order, source: token.id})
        .then(() => {
          this.setState({fetching: false})
          alert(`Thank you for your purchase!`)
        })
        .catch(error => {
          this.setState({fetching: false})
          console.log(error)
        })
      }).catch(error => {
        this.setState({fetching: false})
        console.log(error)
      })
    }

  }

  renderSuccess() {
    return (
      <div className="sr-field-success message">
        <h1>Your test payment succeeded</h1>
        <p>View PaymentIntent response:</p>
        <pre className="sr-callout">
          <code>{JSON.stringify(this.state.metadata, null, 2)}</code>
        </pre>
      </div>
    );
  }

  renderForm() {
    var style = {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>
          {this.state.currency.toLocaleUpperCase()}{" "}
          {this.state.amount.toLocaleString(navigator.language, {
            minimumFractionDigits: 2
          })}{" "}
        </h1>
        <h4>Pre-order the Pasha package</h4>

        <div className="sr-combo-inputs">
          <div className="sr-combo-inputs-row">
            <input
              type="text"
              id="name"
              placeholder="Name"
              autoComplete="cardholder"
              className="sr-input"
            />
          </div>

          <div className="sr-combo-inputs-row">
            <CardElement className="sr-input sr-card-element" style={style} />
          </div>
        </div>

        {this.state.error && (
          <div className="message sr-field-error">{this.state.error}</div>
        )}

        {!this.state.succeeded && (
          <button className="btn" disabled={this.state.disabled}>
            {this.state.processing ? "Processing…" : "Pay"}
          </button>
        )}
      </form>
    );
  }

  render() {
    return (
      <div className="checkout-form">
        <div className="sr-payment-form">
          <div className="sr-form-row" />
          {this.state.succeeded && this.renderSuccess()}
          {!this.state.succeeded && this.renderForm()}
        </div>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
import React, { Component } from "react";
import { pay } from '../../api/payments';

import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PaymentRequestButtonElement,
  injectStripe
} from 'react-stripe-elements';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Divider,
  Input
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import './checkoutForm.css'
const styles = (muiBaseTheme) => ({
  card: {
    width: '500px',
    margin: '50px auto',
    padding: muiBaseTheme.spacing.unit * 3,
    // transition: '0.5s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
    }
  },
  content: {
    textAlign: 'center',
    padding: muiBaseTheme.spacing.unit
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '40px'
  },
  subheading: {
    lineHeight: 1.8
  },
  divider: {
    margin: '35px auto 25px'
  },
  input: {
    width: '100%',
    height: '3.875em'
  }
});

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize: '25px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4'
        },
        marginBottom: '25px',
        padding: '15px'
      },
      invalid: {
        color: '#9e2146'
      },
    }
  };
};

const buttonStyle = {
  width: '220px',
  height: '64px',
  color: '#ffffff',
  backgroundColor: true ? '#69E781' : 'rgb(73, 161, 90)',
  fontFamily: '"Roboto"',
  fontSize: '1.3em',
  textTransform: 'uppercase'
}

const inputStyle = {
  margin: '10px 0 20px 0',
  padding: '22px',
  boxShadow: 'rgba(50, 50, 93, 0.54902) 0px 1px 3px, rgba(0, 0, 0, 0.0196078) 0px 1px 0px',
  border: '0',
  outline: '0',
  borderRadius: '4px',
  background: 'white'
}

class _CheckoutForm extends Component {
  // const _CheckoutForm = (this.props) => {

  state = {
    investmentAmount: 0,
    investmentSaved: false
  }

  handleSubmit = (e) => {
    const { userId, projectId } = this.props
    const { investmentAmount } = this.state


    e.preventDefault();

    if (this.props.stripe) {
      this.props.stripe.createToken().then((payload) => {
        pay(userId, projectId, payload, investmentAmount).then((investment) => {
          return investment
        });
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  formatDollars = (num) => {
    const s = "" + num
    return s.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }


  render() {
    const { userId, projectId, projectName, classes } = this.props
    const { investmentAmount } = this.state
    const investInDollars = this.formatDollars(investmentAmount)

    return (
      <div>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h2"}
              gutterBottom >
              {projectName}
            </Typography>
            <Divider className={classes.divider}></Divider>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h4"}
              gutterBottom >
              Investment amount: {`$${investmentAmount}`}
            </Typography>

            <Input
              className={classes.input}
              placeholder={`$${investInDollars}.00`}

            ></Input>


          </CardContent>

          <form onSubmit={this.handleSubmit}>
            <CardContent className={classes.content}>
              <CardElement
                {...createOptions()}
              />
            </CardContent>

            <CardContent className={classes.content}>
              <button style={buttonStyle}>invest</button>
            </CardContent>
          </form>
        </Card>
      </div>
    );
  }
}

const CheckoutForm = injectStripe(_CheckoutForm);
export default withStyles(styles)(CheckoutForm);
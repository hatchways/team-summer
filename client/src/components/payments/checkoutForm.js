import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types'; 
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  OutlinedInput,
  InputAdornment } from '@material-ui/core';
  import { withStyles } from '@material-ui/core/styles';
  import { OutlinedSelect } from '../../components/Inputs';
  import { CardElement, injectStripe } from 'react-stripe-elements';
import CloseIcon from '@material-ui/icons/Close';
import { pay } from '../../api/payments';


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
    height: '3.875em',
  },
  button: {
    margin: '4px 0px 13px 0px'
  },
  outlinedInput: {
    paddingLeft: "25px"
  },
  icon: {
    horizontalAlign: "right",
    position: "relative",
    top: "1px"
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

const formStyle = {
  paddingBottom: "17px",
  textAlign: "right",
  marginRight: "8px"
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
  constructor(props) {
    super(props);

    this.state = {
      investmentAmount: "",
      investmentSaved: false
    }
  }

  handleInvestmentInput = (e) => {
    const investmentAmount = e.target.value 
    this.setState({ investmentAmount })
  }

  handleInvestmentSubmit = (e) => {
    e.preventDefault();
    this.setState({investmentSaved: true})
  }

  handlePaymentSubmit = (e) => {
    e.preventDefault();
    const { userId, projectId, stripe } = this.props
    const { investmentAmount } = this.state
    if (stripe) {
      stripe.createToken().then((payload) => {
        pay(userId, projectId, payload, investmentAmount)
          .then((investment) => investment);
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  renderPaymentCard = (classes) => {
    const { investmentAmount } = this.state

    return (
      <Fragment>
        <CardContent className={classes.content}>
          <Typography
            className={"MuiTypography--heading"}
            style={ {textAlign: "center", margin: "15px 0 -10px"}}
            variant={"h4"}
            gutterBottom >
            Investment amount: {investmentAmount}
          </Typography>
        </CardContent>
        <Divider className={classes.divider}></Divider>  
        <form onSubmit={this.handlePaymentSubmit} >
          <CardContent className={classes.content}>
            <CardElement
            {...createOptions()}
            />
          </CardContent>
          <Divider className={classes.divider}></Divider>
          <CardContent className={classes.content}>
            <button
              style={buttonStyle}>
              invest
            </button>
          </CardContent>
        </form>
      </Fragment>
    )
  }
        
  renderInvestmentCard = (classes) => {
    const { investmentAmount } = this.state

    return (
      <Fragment>
        <CardContent className={classes.content}>
        <Typography
          style={{marginBottom: '40px'}}
          variant="h4" >How much would you like to invest?>
        </Typography>
        <OutlinedInput
          className={classes.outlinedInput}
          name="investmentAmount"
          id="investmentAmount"
          placeholder='0'
          value={investmentAmount}
          fullWidth={true}
          onChange={this.handleInvestmentInput}
          type="number"
          variant="outlined"
          startAdornment={
            <InputAdornment
            position="start">
            $
            </InputAdornment>}
            />
        </CardContent>
        <Divider 
          className={classes.divider}
          style={ { color: 'white', marginTop: '42px' }}></Divider>
        <CardContent className={classes.content}>
          <Button
            classes={{ root: classes.button }}
            onClick={this.handleInvestmentSubmit}
            type="submit"
            variant="contained"
            color="primary" >
            save
          </Button>
        </CardContent>
      </Fragment>
    )
  }

  render() {
    const { userId, projectId, projectName, classes } = this.props
    const { investmentAmount, investmentSaved } = this.state

    return (
      <div className="checkout-form">
        <Card className={classes.card}>
          <div style={formStyle}>
            <CloseIcon className={classes.icon}></CloseIcon>
          </div>
          <CardContent className={classes.content}>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h2"} >
              {projectName}
            </Typography>
          </CardContent>
        {
          this.state.investmentSaved ?
          this.renderPaymentCard(classes) :
          this.renderInvestmentCard(classes)
        }
      </Card>
    </div>
    );
  }
}
    
const CheckoutForm = injectStripe(_CheckoutForm);
export default withStyles(styles)(CheckoutForm);

_CheckoutForm.propTypes = {
  userId: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};
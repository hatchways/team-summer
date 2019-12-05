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
  import { CardElement, injectStripe } from 'react-stripe-elements';
import CloseIcon from '@material-ui/icons/Close';
import { stripeStyle } from './stripeStyles';
import { pay } from '../../api/payments';
import { toDollars } from '../../helpers/formatting';

const styles = (muiBaseTheme) => ({
  card: {
    width: '500px',
    margin: '50px auto',
    padding: muiBaseTheme.spacing.unit * 3,
    transition: '0.5s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
    },
    [muiBaseTheme.breakpoints.down('sm')]: {
      width: '100%',
      padding: "0"
    }
  },
  content: {
    textAlign: 'center',
    padding: muiBaseTheme.spacing.unit
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
  icon: { //in case this will become a popup
    horizontalAlign: "right",
    position: "relative",
    top: "1px"
  },
  form: {
    paddingBottom: "17px",
    textAlign: "right",
    marginRight: "8px"
  }
});

class _CheckoutForm extends Component {

  state = {
      investmentAmount: "",
      investmentSaved: false
  }

  handleInvestmentInput = (e) => {
    const investmentAmount = e.target.value 
    if (investmentAmount <= 999999){
      this.setState({ investmentAmount })
    }
  }

  handleInvestmentSubmit = (e) => {
    e.preventDefault();
    if(this.state.investmentAmount >= 5) {
      this.setState({investmentSaved: true})
    } else {
      this.props.activateToast('Sorry, $5 minimum', 'neutral')
    }
  }

  handlePaymentSubmit = (e) => {
    e.preventDefault();
    const { userId, projectId, stripe, history, activateToast } = this.props
    const { investmentAmount } = this.state

    stripe.createToken().then((payload) => {
      pay(userId, projectId, payload, investmentAmount)
        .then((investment) => investment)
        .then(() => activateToast('success. you invested.', 'success'))
        .then(() => history.push("/explore"))
        .catch(() => activateToast('that was a fail', 'error'))
      });
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
            Investment amount: {toDollars(investmentAmount)}
          </Typography>
        </CardContent>
        <Divider className={classes.divider}></Divider>  
        <form onSubmit={this.handlePaymentSubmit} >
          <CardContent className={classes.content}>
            <CardElement
              {...stripeStyle.card()}
            />
          </CardContent>
          <Divider className={classes.divider}></Divider>
          <CardContent className={classes.content}>
            <button
              style={stripeStyle.button}>
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
          variant="h4" >How much would you like to invest?
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
    const { projectTitle, classes } = this.props
    const { investmentAmount, investmentSaved } = this.state

    return (
      <div className="checkout-form">
        <Card className={classes.card}>
          <div style={stripeStyle.form}>
            <CloseIcon className={classes.icon}></CloseIcon>
          </div>
          <CardContent className={classes.content}>
            <Typography
              className={"MuiTypography--heading"}
              variant={"h2"} >
              {projectTitle}
            </Typography>
          </CardContent>
        {
          investmentSaved && 
          investmentAmount >= 5 ?
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
  projectId: PropTypes.string.isRequired,
  projectTitle: PropTypes.string.isRequired,
  stripe: PropTypes.object.isRequired, 
  history: PropTypes.object.isRequired,
  activateToast: PropTypes.func.isRequired
};
//This component does not have access to its own history, toast
import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
    OutlinedInput,
    InputAdornment
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { stripeStyle } from './stripeStyle';
import { pay } from 'api/payments';
import { toDollars } from 'helpers/formatting';
const MINIMUM_AMOUNT = 5;

class _CheckoutForm extends Component {

    state = {
        investmentAmount: "",
        investmentSaved: false
    }

    handleInvestmentInput = (e) => {
        const investmentAmount = e.target.value
        if (investmentAmount <= 999999) {
            this.setState({ investmentAmount })
        }
    }

    handleInvestmentSubmit = (e) => {
        e.preventDefault();
        if (this.state.investmentAmount >= MINIMUM_AMOUNT) {
            this.setState({ investmentSaved: true })
        }
    }

    handlePaymentSubmit = (e) => {
        e.preventDefault();
        const { projectId, stripe } = this.props
        const { investmentAmount } = this.state
        stripe.createToken().then((payload) => {
            pay(projectId, payload, investmentAmount)
                .then(this.props.handlePaymentCompletion(true))
                .catch((err) => this.props.handlePaymentCompletion(true))
        });
    };

    renderPaymentCard = (classes) => {
        const { investmentAmount } = this.state

        return (
            <Fragment>
                <CardContent className={classes.content}>
                    <Typography
                        className={`MuiTypography--heading ${classes.paymentTypo}`}
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
                            style={stripeStyle.stripeButton}>
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
                        className={`MuiTypography--heading ${classes.investmentTypo}`}
                        variant="h4" >
                        How much would you like to invest?
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
                    className={classes.paymentDivider}>
                </Divider>
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
        const { projectTitle, classes, handleClosePopup } = this.props
        const { investmentAmount, investmentSaved } = this.state

        return (
            <div className="checkout-form">
                <Card className={classes.card}>
                    <button onClick={handleClosePopup} className={classes.iconButton}>
                        <CloseIcon className={classes.icon}></CloseIcon>
                    </button>
                    <CardContent className={classes.content}>
                        <Typography
                            className={"MuiTypography--heading"}
                            variant={"h2"} >
                            {projectTitle}
                        </Typography>
                    </CardContent>
                    {
                        investmentSaved &&
                            investmentAmount >= MINIMUM_AMOUNT ?
                            this.renderPaymentCard(classes) :
                            this.renderInvestmentCard(classes)
                    }
                </Card>
            </div>
        );
    }
}

const CheckoutForm = injectStripe(_CheckoutForm);
export default withStyles(stripeStyle.checkoutStyles)(CheckoutForm);

_CheckoutForm.propTypes = {
    projectId: PropTypes.string.isRequired,
    projectTitle: PropTypes.string.isRequired,
    stripe: PropTypes.object.isRequired,
};

//stripe elements span card info, form, inputs, button
//of payment card. If you figure out how to use MUI
//components for these items please let me know. -taryn

const checkoutStyles = (muiBaseTheme) => ({
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
    investmentTypo: {
        marginBottom: '40px',
    },
    paymentTypo: {
        textAlign: "center", margin: "15px 0 -10px"
    },
    divider: {
        margin: '35px auto 25px'
    },
    paymentDivider: {
        margin: '35px auto 25px',
        color: 'white',
        marginTop: '42px'
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
    form: {
        paddingBottom: "17px",
        textAlign: "right",
        marginRight: "8px"
    },
    icon: {
        horizontalAlign: "right",
        position: "relative",
        top: "1px"
    },
    iconButton: {
        position: 'absolute',
        left: '505px',
        top: '60px',
        border: 'none'
    }
});


const buttonStyle = {
    width: '220px',
    height: '64px',
    color: '#ffffff',
    backgroundColor: true ? '#69E781' : 'rgb(73, 161, 90)',
    fontSize: '1em',
    textTransform: 'uppercase',
    '&:hover': {
        color: 'purple'//not working
    },
}

//Stripe cardElement-specific
const card = () => {
    return {
        style: {
            base: {
                fontSize: '25px',
                color: '#424770',
                fontFamily: 'roboto', //not working
                letterSpacing: '0.025em',
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

export const stripeStyle = {
    card,
    checkoutStyles,
    stripeButton: buttonStyle,
}



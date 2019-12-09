//stripe elements span card info, form, inputs, button
//of payment card. If you figure out how to use MUI
//components for these items please let me know. -taryn

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
    button: buttonStyle,
}
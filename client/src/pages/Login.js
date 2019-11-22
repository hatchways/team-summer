import React from 'react';
import {
    withStyles,
    Button
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import validator from 'validator';

import {CustomOutlinedInput} from '../components/Inputs';
import CenteredPageHeader from '../components/CenteredPageHeader';
import FormValidator from '../helpers/form-validation';

const styles = {
    pageContent: {
        // Alignment
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        //Spacing & Page width
        margin: '0 auto',
        padding: '40px 30px',
        maxWidth: 500
    },
    form: {
        // Alignment
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // Form sizing
        width: '100%',
    },
    lastInput: {
        // Last input has spacing to separate from bottom
        // according to specs.
        marginBottom: 70
    }
};

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.validators = FormValidator([
            {
                field: 'email',
                method: validator.isEmpty,
                validWhen: false,
                message: 'Email is required.'
            },
            {
                field: 'email',
                method: validator.isEmail,
                validWhen: true,
                message: 'Email format is incorrect.'
            },
            {
                field: 'password',
                method: validator.isEmpty,
                validWhen: false,
                message: 'Password is required'
            },
            {
                field: 'password',
                method: (value) => value.length >= 6,
                validWhen: true,
                message: 'Password must be 6 characters or more'
            },
        ]);

        this.state = {
            email: '',
            password: '',
            validation: this.validators.valid()
        };
    }

    handleInput = (event) => {
        const {value, name} = event.target;

        this.setState({[name]: value});
    };

    disableSubmit = () => {
        const {email, password} = this.state;

        return [email, password].some((value) => !value);


    };

    handleSubmit = (event) => {
        event.preventDefault();

        const validation = this.validators.validate(this.state);
        this.setState({validation});

        if (validation.isValid) {
            // TODO: Integration form submission with backend
            console.log('valid');
        }
    };

    render() {
        const {classes} = this.props;
        const {email, password, validation} = this.state;

        return (
            <main className={classes.pageContent}>
                {/* Page Header */}
                <CenteredPageHeader
                    title="Member Login"
                    descriptionText={<span>New here? <Link to="/signup">Sign Up</Link></span>}
                />

                {/* Login Form */}
                <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
                    <CustomOutlinedInput
                        name="email"
                        value={email}
                        label="Email"
                        onChange={this.handleInput}
                        type="email"
                        required
                        error={validation.email.isInvalid}
                        helperText={validation.email.message}
                    />
                    <CustomOutlinedInput
                        name="password"
                        value={password}
                        label="Password"
                        onChange={this.handleInput}
                        type="password"
                        required
                        error={validation.password.isInvalid}
                        helperText={validation.password.message}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={this.disableSubmit()}>
                        Login
                    </Button>
                </form>
            </main>
        );
    }
}

export default withStyles(styles)(Login);
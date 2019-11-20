import React, {useState} from 'react';
import {
    makeStyles,
    Button
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import validator from 'validator';

import {CustomOutlinedInput} from '../components/Inputs';
import CenteredPageHeader from '../components/CenteredPageHeader';
import FormValidator from '../helpers/form-validation';

const useStyles = makeStyles({
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
        marginBottom: 80
    }
});

const formValidatiors = FormValidator([
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
    {
        field: 'confirmPassword',
        method: (value, state) => state.password === value,
        validWhen: true,
        message: 'Passwords must match'
    }
]);

const Login = () => {
    const classes = useStyles();

    // Controlled form paramaters
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validation, setValidation] = useState({
        email: {isInvalid: false, message: ''},
        password: {isInvalid: false, message: ''},
        confirmPassword: {isInvalid: false, message: ''}
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const validation = formValidatiors.validate({email, password, confirmPassword});
        setValidation(validation);

        if (validation.isValid) console.log('valid')
    };

    return (
        <main className={classes.pageContent}>
            {/* Page Header */}
            <CenteredPageHeader
                title="Member Login"
                descriptionText={<span>New here? <Link to="/signup">Sign Up</Link></span>}
            />

            {/* Login Form */}
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <CustomOutlinedInput
                    name="email"
                    value={email}
                    label="Email"
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    required
                    error={validation.email.isInvalid}
                    helperText={validation.email.message}
                />
                <CustomOutlinedInput
                    name="password"
                    value={password}
                    label="Password"
                    onChange={(event) => setPassword(event.target.value)}
                    type="password"
                    required
                    error={validation.password.isInvalid}
                    helperText={validation.password.message}
                />
                <CustomOutlinedInput
                    name="confirmPassword"
                    value={confirmPassword}
                    label="Confirm Password"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    type="password"
                    required
                    className={classes.lastInput}
                    error={validation.confirmPassword.isInvalid}
                    helperText={validation.confirmPassword.message}
                />
                <Button type="submit" variant="contained" color="primary">Login</Button>
            </form>
        </main>
    );
};

export default Login;
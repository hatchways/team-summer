import React, {useState} from 'react';
import {
    makeStyles,
    Button
} from '@material-ui/core';
import {Link} from 'react-router-dom';

import {CustomOutlinedInput} from '../components/Inputs';
import CenteredPageHeader from '../components/CenteredPageHeader';

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

const Login = () => {
    const classes = useStyles();

    // Controlled form paramaters
    const [emailValue, setEmail] = useState('');
    const [passwordValue, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <main className={classes.pageContent}>
            {/* Page Header */}
            <CenteredPageHeader
                title="Member Login"
                descriptionText={<span>New here? <Link to="/signup">Sign Up</Link></span>}
            />

            {/* Login Form */}
            <form className={classes.form} noValidate>
                <CustomOutlinedInput
                    name="email"
                    value={emailValue}
                    label="Email"
                    onChange={setEmail}
                    type="email"
                    required
                />
                <CustomOutlinedInput
                    name="password"
                    value={passwordValue}
                    label="Password"
                    onChange={setPassword}
                    type="password"
                    required
                />
                <CustomOutlinedInput
                    name="confirmPassword"
                    value={confirmPassword}
                    label="Confirm Password"
                    onChange={setConfirmPassword}
                    type="password"
                    required
                    className={classes.lastInput}
                />
                <Button variant="contained" color="primary">Login</Button>
            </form>
        </main>
    );
};

export default Login;
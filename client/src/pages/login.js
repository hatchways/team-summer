import React, {useState} from 'react';
import {
    makeStyles,
    Button
} from '@material-ui/core';
import {Link} from "react-router-dom";

import {CustomOutlinedInput} from "../components/inputs";
import CenteredPageHeader from '../components/centered-page-header';

const useStyles = makeStyles({
    pageContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        padding: '40px 30px',
        maxWidth: 500
    },
    form: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    lastInput: {
        marginBottom: 80
    }
});

const Login = () => {
    const classes = useStyles();
    const [emailValue, setEmail] = useState(null);
    const [passwordValue, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    return (
        <main className={classes.pageContent}>
            <CenteredPageHeader
                title="Member Login"
                descriptionText={(
                    <span>New here? <Link to="/signup">Sign Up</Link></span>
                )}
            />
            <form className={classes.form}>
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
                    name="confirm-password"
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
    )
};

export default Login
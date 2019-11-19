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

const SignUp = () => {
    const classes = useStyles();
    const [nameValue, setName] = useState(null);
    const [emailValue, setEmail] = useState(null);
    const [passwordValue, setPassword] = useState(null);

    return (
        <main className={classes.pageContent}>
            <CenteredPageHeader
                title="Create an Account"
                descriptionText={(
                    <span>Already a member? <Link to="/login">Login</Link></span>
                )}
            />
            <form className={classes.form}>
                <CustomOutlinedInput
                    name="name"
                    value={nameValue}
                    label="Name"
                    onChange={setName}
                    required
                />
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
                    className={classes.lastInput}
                />

                <Button variant="contained" color="primary">Create account</Button>
            </form>
        </main>
    )
};

export default SignUp
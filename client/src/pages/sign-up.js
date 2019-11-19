import React, {useState} from 'react';
import {
    makeStyles,
    Typography,
} from '@material-ui/core';

import BoldLine from '../components/bold-line';
import {Link} from "react-router-dom";
import {CustomOutlinedInput} from "../components/inputs";

const useStyles = makeStyles({
    pageContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        padding: '40px 30px',
        maxWidth: 500
    },
    pageTitle: {
        marginBottom: 30
    },
    explanationText: {
        textAlign: 'center',
        marginBottom: 40
    },
    input: {
        width: '100%'
    }
});

const SignUp = () => {
    const classes = useStyles();
    const [nameValue, setName] = useState(null);
    const [emailValue, setEmail] = useState(null);
    const [passwordValue, setPassword] = useState(null);

    return (
        <main className={classes.pageContent}>
            <Typography variant="h2" className={classes.pageTitle}>Create an account</Typography>
            <BoldLine/>
            <Typography variant="body1" className={classes.explanationText}>
                Already a member? <Link to="/login">Login</Link>
            </Typography>
            <form style={{width: '100%'}}>
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
                />
            </form>
        </main>
    )
};

export default SignUp
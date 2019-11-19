import React from 'react'
import {makeStyles, Typography} from '@material-ui/core'

import BoldLine from '../components/bold-line'

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
    }
})

const SignUp = (props) => {
    const classes = useStyles()
    return (
        <main className={classes.pageContent}>
            <Typography variant="h2" className={classes.pageTitle}>Let's get started</Typography>
            <BoldLine/>
            <Typography variant="body1" className={classes.explanationText}>
                Pick a project industry to connect with a community. You can always update this later.
            </Typography>
        </main>
    )
}

export default SignUp
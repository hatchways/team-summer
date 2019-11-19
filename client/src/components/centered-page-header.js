import React from 'react';
import {makeStyles, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

import BoldLine from './bold-line';

const useStyles = makeStyles({
    header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    pageTitle: {
        marginBottom: 30
    },
    descriptionText: {
        textAlign: 'center',
        marginBottom: 40
    },
});

const CenteredPageHeader = (props) => {
    const classes = useStyles();

    return (
        <header className={classes.header}>
            <Typography variant="h2" className={classes.pageTitle}>{props.title}</Typography>
            <BoldLine />
            <Typography variant="body1" className={classes.descriptionText}>
                {props.descriptionText}
            </Typography>
        </header>
    );
};

CenteredPageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    descriptionText: PropTypes.string.isRequired
};


export default CenteredPageHeader;
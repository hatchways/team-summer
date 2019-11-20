import React from 'react';
import {AppBar, makeStyles, Toolbar, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import SvgProductLaunchLogo from './ProductLaunchPage';

const useStyles = makeStyles((theme) => ({
    navBar: {
        borderBottom: `1px solid ${theme.meta}`
    },
    navBarHomeLink: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,

        '&:hover': {
            color: 'unset'
        }
    },
    navLinks: {
        display: 'flex'
    },
    menuItem: {
        marginRight: 50,
        paddingBottom: 2,
        borderBottom: `2px solid #ffffff`,

        '&:hover': {
            color: '#000000',
            borderBottom: `2px solid ${theme.palette.primary.main}`,
        }
    }
}));

export default () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.navBar} position="static" color="inherit" elevation={0}>
            <Toolbar>
                <Link to="/" className={classes.navBarHomeLink}>
                    <SvgProductLaunchLogo style={{marginRight: 22}}/>
                    <Typography variant="h1">Product Launch</Typography>
                </Link>
                <div className={classes.navLinks}>
                    <Link to="/explore" className={classes.menuItem}>
                        <Typography variant="h6">
                            Explore
                        </Typography>
                    </Link>
                    <Link to="/marketplace" className={classes.menuItem}>
                        <Typography variant="h6">
                            Messages
                        </Typography>
                    </Link>
                    <Link to="/launch" className={classes.menuItem}>
                        <Typography variant="h6">
                            Launch
                        </Typography>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
};

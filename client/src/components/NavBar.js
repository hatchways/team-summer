import React, {useState} from 'react';
import {
    AppBar,
    makeStyles,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem
} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';

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
        display: 'flex',
        alignItems: 'center'
    },
    menuItem: {
        marginRight: 50,
        paddingBottom: 2,
        borderBottom: `2px solid #ffffff`,

        '&:hover': {
            color: '#000000',
            borderBottom: `2px solid ${theme.palette.primary.main}`,
        }
    },
    userAvatar: {
        width: 50,
        height: 50
    }
}));

const NavBar = (props) => {
    const classes = useStyles();
    const [userDropdown, toggleUserDropdown] = useState(null);

    const handleClick = (route) => {
        props.history.push(route);
        toggleUserDropdown(null)
    };

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
                    <div>
                        <IconButton aria-controls="user-dropdown"
                                    onClick={(event) => toggleUserDropdown(event.currentTarget)}>
                            <Avatar className={classes.userAvatar} src={props.user.avatar || null}>
                                {props.user.avatar || props.user.name.split('')[0]}
                            </Avatar>
                        </IconButton>
                        <Menu
                            id="user-dropdown"
                            anchorEl={userDropdown}
                            keepMounted
                            open={Boolean(userDropdown)}
                            onClose={() => toggleUserDropdown(null)}
                        >
                            <MenuItem onClick={() => handleClick('/profile')}>Profile</MenuItem>
                            <MenuItem onClick={() => handleClick('/logout')}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default withRouter(NavBar);

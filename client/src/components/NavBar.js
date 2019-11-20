import React, {useState} from 'react';
import {
    AppBar,
    makeStyles,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem, Drawer, withTheme, useMediaQuery
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import {Link, withRouter} from 'react-router-dom';

import SvgProductLaunchLogo from './ProductLaunchPage';

const useStyles = makeStyles((theme) => ({
    navBar: {
        display: 'flex',
        justifyContent: 'center',
        height: 74,
        padding: '0 30px',
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

const Navigation = (props) => {
    const [userDropdown, toggleUserDropdown] = useState(null);

    const links = [
        {label: 'Explore', url: '/explore'},
        {label: 'Messages', url: '/messages'},
        {label: 'Launch', url: '/launch'}
    ];

    const Wrapper = props.desktop ? 'div' : Drawer;

    let wrapperProps = {
        className: props.classes.navLinks,
    };

    if (!props.desktop) {
        wrapperProps = {
            open: props.drawerState,
            onClose: () => props.toggleDrawer(false),
            ...wrapperProps
        };
    }

    const handleClick = (route) => {
        props.history.push(route);
        toggleUserDropdown(null);
    };

    return (
        <Wrapper {...wrapperProps}>
            {links.map((link) => (
                <Link to={link.url} className={props.classes.menuItem} key={link.label}>
                    <Typography variant="h6">
                        {link.label}
                    </Typography>
                </Link>
            ))}
            <div id="account-dropdown">
                <IconButton aria-controls="user-dropdown"
                            onClick={(event) => toggleUserDropdown(event.currentTarget)}>
                    <Avatar className={props.classes.userAvatar} src={props.user.avatar || null}>
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
        </Wrapper>
    );
};

const NavBar = (props) => {
    const classes = useStyles();
    const desktop = useMediaQuery(props.theme.breakpoints.up('md'));
    const [drawer, toggleDrawer] = useState(false);

    const showDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
        toggleDrawer(true)
    };

    return (
        <AppBar className={classes.navBar} position="static" color="inherit" elevation={0}>
            <Toolbar>
                <Link to="/" className={classes.navBarHomeLink}>
                    <SvgProductLaunchLogo style={{marginRight: 22}}/>
                    <Typography variant="h1">Product Launch</Typography>
                </Link>
                <Navigation {...props}
                            drawerState={drawer}
                            toggleDrawer={toggleDrawer}
                            classes={classes}
                            desktop={desktop}/>
                {!desktop
                    ? <IconButton onClick={showDrawer}>
                        <MenuIcon fontSize="large"/>
                    </IconButton>
                    : null
                }
            </Toolbar>
        </AppBar>
    );
};

export default withRouter(withTheme(NavBar));

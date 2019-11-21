import React, { useState } from 'react';
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  withTheme,
  useMediaQuery
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { Link, withRouter } from 'react-router-dom';

import SvgProductLaunchLogo from './ProductLaunchLogo';

const useStyles = makeStyles((theme) => ({
  navBar: {
    display: 'flex',
    justifyContent: 'center',
    height: 74,
    padding: 0,
    borderBottom: `1px solid ${theme.meta}`,

    [theme.breakpoints.up('md')]: {
      padding: '0 30px'
    }
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
    margin: '10px 0',
    borderBottom: `2px solid #ffffff`,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',

    '& h6': {
      borderBottom: `2px solid #ffffff`,
      paddingBottom: 2
    },

    '&:hover > h6': {
      color: '#000000',
      borderBottom: `2px solid ${theme.palette.primary.main}`
    },

    [theme.breakpoints.up('md')]: {
      margin: '0 50px 0 0'
    }
  },
  userAvatar: {
    width: 50,
    height: 50
  },
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 150,
    padding: 30
  }
}));

const Navigation = (props) => {
  const [userDropdown, toggleUserDropdown] = useState(null);

  const links = [
    { label: 'Explore', url: '/explore' },
    { label: 'Messages', url: '/messages' },
    { label: 'Launch', url: '/launch' }
  ];

  /* Wrapper is the element that surrounds this component
   * if it is desktop, its a plain html div, else a drawer
   * from material-design-ui.
   *
   * This allows me to have same content for both mobile
   * and desktop, but in a mobile menu
   */
  const Wrapper = props.desktop ? 'div' : Drawer;

  let wrapperProps = {
    className: props.classes.navLinks
  };

  if (!props.desktop) {
    wrapperProps = {
      open: props.drawerState,
      onClose: () => props.toggleDrawer(false),
      classes: { paper: props.classes.drawer },
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
          <Typography variant="h6">{link.label}</Typography>
        </Link>
      ))}

      {/* User dropdown actions*/}
      <div id="account-dropdown">
        <IconButton
          aria-controls="user-dropdown"
          onClick={(event) => toggleUserDropdown(event.currentTarget)}>
          <Avatar
            className={props.classes.userAvatar}
            src={props.user.avatar || null}>
            {props.user.avatar || props.user.name.split('')[0]}
          </Avatar>
        </IconButton>
        <Menu
          id="user-dropdown"
          anchorEl={userDropdown}
          keepMounted
          open={Boolean(userDropdown)}
          onClose={() => toggleUserDropdown(null)}>
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
  const [drawer, toggleDrawer] = useState(true);

  const showDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    )
      return;
    toggleDrawer(true);
  };

  return (
    <AppBar
      className={classes.navBar}
      position="static"
      color="inherit"
      elevation={0}>
      <Toolbar>
        <Link to="/" className={classes.navBarHomeLink}>
          <SvgProductLaunchLogo style={{ marginRight: 22 }} />
          <Typography variant="h1">Product Launch</Typography>
        </Link>

        <Navigation
          {...props}
          drawerState={drawer}
          toggleDrawer={toggleDrawer}
          classes={classes}
          desktop={desktop}
        />
        {!desktop ? (
          <IconButton onClick={showDrawer}>
            <MenuIcon fontSize="large" />
          </IconButton>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(withTheme(NavBar));

import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

import SvgProductLaunchLogo from './ProductLaunchLogo';
import NotificationDropdown from './NotificationDropdown';
import { getNotifications } from '../api/notifications';

const useStyles = makeStyles((theme) => ({
  navBar: {
    // Alignment
    display: 'flex',
    justifyContent: 'center',

    // Sizing
    height: 74,
    padding: 0,

    // Styling
    borderBottom: `1px solid ${theme.meta}`,

    // Desktop style adjustments
    [theme.breakpoints.up('md')]: {
      padding: '0 30px'
    }
  },
  navBarHomeLink: {
    // Alignment
    flexGrow: 1,
    '& a': {
      display: 'flex',
      alignItems: 'center',
      maxWidth: 300
    }
  },
  navLinks: {
    // Alignment
    display: 'flex',
    alignItems: 'center'
  },
  menuItem: {
    // Alignment
    display: 'flex',
    justifyContent: 'center',

    // Sizing
    margin: '10px 0',
    width: '100%',

    // Style link label pre-hover
    '& h6': {
      borderBottom: `2px solid #ffffff`,
      paddingBottom: 2
    },

    // Link hover
    '&:hover > h6': {
      color: '#000000',
      borderBottom: `2px solid ${theme.palette.primary.main}`
    },

    // Desktop margins
    [theme.breakpoints.up('md')]: {
      margin: '0 50px 0 0'
    }
  },
  userAvatar: {
    // Sizing
    width: 50,
    height: 50
  },
  drawer: {
    // Alignment
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    // Sizing
    width: 150,
    padding: 30
  }
}));

const Navigation = (props) => {
  const [userDropdown, toggleUserDropdown] = useState(null);

  /* Show property values: authenticated, unauthenticated, both */
  const links = [
    { label: 'Explore', url: '/explore', show: 'authenticated' },
    { label: 'Messages', url: '/messages', show: 'authenticated' },
    { label: 'Launch', url: '/launch', show: 'authenticated' },
    { label: 'Login', url: '/login', show: 'unauthenticated' }
  ];

  const userDropdownLinks = [
    { label: 'Profile', url: '/profile' },
    { label: 'Logout', url: '/logout' }
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

  const handleDropdownClick = (route) => () => {
    if (route === '/logout') {
      localStorage.removeItem('jwtToken');
      props.setAuthenticated(false);
      props.setUserDetails(null, '', '', '', '');
      props.setNotifications([]);
      props.history.push('/login');
    } else {
      props.history.push(route);
    }

    toggleUserDropdown(null);
  };

  return (
    <Wrapper {...wrapperProps}>
      {links.map((link) => {
        /* Render link if:
         * - Link is for authenticated users and logged in
         * - Link is for unauthenticated users and not logged in
         * - Link is meant for both authenticated and unauthenticated
         * */
        if (
          (link.show === 'authenticated' && props.userAuthenticated) ||
          (link.show === 'unauthenticated' && !props.userAuthenticated) ||
          link.show === 'both'
        ) {
          return (
            <Link to={link.url} className={props.classes.menuItem} key={link.label}>
              <Typography variant="h6">{link.label}</Typography>
            </Link>
          );
        }

        return null;
      })}

      {/* User dropdown actions */}
      {props.userAuthenticated && (
        <div id="account-dropdown">
          <IconButton
            aria-controls="user-dropdown"
            onClick={(event) => toggleUserDropdown(event.currentTarget)}>
            <Avatar className={props.classes.userAvatar} src={props.userDetails.avatar || null}>
              {
                props.userDetails.avatar
                  ? props.userDetails.avatar
                  : props.userDetails.name
                    ? props.userDetails.name.split('')[0]
                    : '?'
              }
            </Avatar>
          </IconButton>
          <Menu
            id="user-dropdown"
            anchorEl={userDropdown}
            keepMounted
            open={Boolean(userDropdown)}
            onClose={() => toggleUserDropdown(null)}>
            {userDropdownLinks.map((link) => (
              <MenuItem onClick={handleDropdownClick(link.url)} key={link.label}>
                {link.label}
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}
    </Wrapper>
  );
};

const NavBar = (props) => {
  const classes = useStyles();
  const desktop = useMediaQuery(props.theme.breakpoints.up('md'));
  const [drawer, toggleDrawer] = useState(false);

  useEffect(() => {
    console.log('mounted');
    const loadData = async () => {
      await loadNotifications();
    }
    if (props.userAuthenticated) {
      loadData();
    }
  }, [])

  const loadNotifications = async () => {
    try {
      const response = await getNotifications(props.userDetails.id);
      const { data } = response;
      props.setNotifications(data);
      props.socket.on('newInvestment', (data) => {
        props.activateToast(`${data.name} invested in your project, ${data.projectName}!`, 'success');
      })
    } catch (err) {
      console.log(err);
    }
  }

  // If navbar is in desktop mode and drawer is still set to open,
  // toggle the drawer closed
  if (desktop && drawer) toggleDrawer(false);

  const showDrawer = (event) => toggleDrawer(true);

  return (
    <AppBar className={classes.navBar} position="static" color="inherit" elevation={0}>
      <Toolbar>
        <div className={classes.navBarHomeLink}>
          <Link to="/">
            <SvgProductLaunchLogo style={{ marginRight: 22 }} />
            <Typography variant="h1">Product Launch</Typography>
          </Link>
        </div>
        {props.notifications && props.notifications.length > 0 &&
          <div>
            <NotificationDropdown
              alerts={props.notifications.length}
              notifications={props.notifications}
            />
          </div>
        }
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
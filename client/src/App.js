import React from 'react';
import { MuiThemeProvider, AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom';

import { theme } from './themes/theme';

import SvgProductLaunchLogo from './components/ProductLaunchLogo';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const useStyles = makeStyles({
  navBar: (theme) => ({
    borderBottom: `1px solid ${theme.meta}`
  }),
  navBarHomeLink: {
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
      color: 'unset'
    }
  }
});

const globalStyles = makeStyles({
  '@global': {
    '.MuiButton-root': {
      width: 220,
      height: 64,
      boxShadow: 'none'
    },
    a: {
      textDecoration: 'none',
      color: '#000000',

      '&:hover': {
        color: theme.palette.primary.main
      }
    }
  }
});

const App = () => {
  globalStyles();
  const classes = useStyles(theme);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {/* Navbar */}
        <AppBar className={classes.navBar} position="static" color="inherit" elevation={0}>
          <Toolbar>
            <Link to="/" className={classes.navBarHomeLink}>
              <SvgProductLaunchLogo style={{ marginRight: 22 }} />
              <Typography variant="h1">Product Launch</Typography>
            </Link>
          </Toolbar>
        </AppBar>

        {/* Routes */}
        {/*
                    - Base route uses a Redirect Component to redirect to
                    /signup. Change render to component with the home page
                    component if changing landing page.
                */}
        <Route exact path="/" render={() => <Redirect to="/signup" />} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;

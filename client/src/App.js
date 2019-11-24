import React, { useState, useEffect } from 'react';
import { MuiThemeProvider, makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { theme } from './themes/theme';

import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const globalStyles = makeStyles({
  '@global': {
    '.MuiButton-root': {
      // Custom styling for buttons according to specs
      width: 220,
      height: 64,
      boxShadow: 'none'
    },
    // Styling links
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
  const [userAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(Boolean(localStorage.getItem('jwtToken')));
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {/* Placeholder user object */}
        <NavBar
          user={{ name: 'Joe' }}
          authenticated={userAuthenticated}
          setAuthenticated={setAuthenticated}
        />

        {/* Routes */}
        {/*- Base route uses a Redirect Component to redirect to
            /signup. Change render to component with the home page
            component if changing landing page.
        */}
        <Route exact path="/" render={() => <Redirect to="/signup" />} />
        <Route
          path="/signup"
          render={(routerProps) => <SignUp setAuthenticated={setAuthenticated} {...routerProps} />}
        />
        <Route
          path="/login"
          render={(routerProps) => <Login setAuthenticated={setAuthenticated} {...routerProps} />}
        />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;

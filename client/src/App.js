import React, { useState, useEffect } from 'react';
import { MuiThemeProvider, makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { verify as jwtVerify } from 'jsonwebtoken';

import { theme } from './themes/theme';

import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ProfilePage from './pages/Profile';
import Toast, { ToastContext } from './components/Toast';

require('dotenv').config();

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

  const [toastProperties, setToastProperties] = useState({
    text: '',
    button: 'CLOSE',
    variant: 'neutral'
  });
  const [showToast, toggleToast] = useState(false);
  const [userAuthenticated, setAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const activateToast = (text, variant = 'neutral', button = 'CLOSE') => {
    setToastProperties({ text, variant, button });
    toggleToast(true);
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      try {
        const data = jwtVerify(jwtToken, process.env.REACT_APP_JWT_SECRET).payload;
        setUserDetails({ name: data.name, id: data.id });
        setAuthenticated(true);
      } catch (error) {
        if (error.name === 'TokenExpiredError') localStorage.removeItem('jwtToken');
        activateToast('Your session has expired, please log in again.', 'error');
      }
    }
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
        <ToastContext.Provider value={activateToast}>
          <Route
            exact
            path="/"
            render={() => <Redirect to={userAuthenticated ? '/profile' : '/signup'} />}
          />
          <Route
            path="/signup"
            render={(routerProps) => (
              <SignUp setAuthenticated={setAuthenticated} {...routerProps} />
            )}
          />
          <Route
            path="/login"
            render={(routerProps) => <Login setAuthenticated={setAuthenticated} {...routerProps} />}
          />
          <Route path="/profile/:id?" component={ProfilePage} />
        </ToastContext.Provider>
        <Toast
          buttonText={toastProperties.button}
          toastMessage={toastProperties.text}
          variant={toastProperties.variant}
          toggleToast={toggleToast}
          showToast={showToast}
        />
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;

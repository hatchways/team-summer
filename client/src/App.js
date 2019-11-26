import React, { useState, useEffect } from 'react';
import { MuiThemeProvider, makeStyles } from '@material-ui/core';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { verify as jwtVerify } from 'jsonwebtoken';

import { theme } from './themes/theme';

import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ProfilePage from './pages/Profile';
import Toast from './components/Toast';
import { PageContext } from './components/pageContext';

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
  const [userDetails, setUserDetails] = useState({
    id: null,
    name: ''
  });

  const activateToast = (text, variant = 'neutral', button = 'CLOSE') => {
    setToastProperties({ text, variant, button });
    toggleToast(true);
  };

  const contextProps = {
    activateToast,
    userAuthenticated,
    setAuthenticated,
    userDetails,
    setUserDetails
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      try {
        const data = jwtVerify(jwtToken, process.env.REACT_APP_JWT_SECRET).payload;
        setUserDetails({ name: data.name, id: data._id });
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
        <NavBar
          userDetails={userDetails}
          userAuthenticated={userAuthenticated}
          setAuthenticated={setAuthenticated}
        />

        {/* Routes */}
        {/*- Base route uses a Redirect Component to redirect to
            /signup. Change render to component with the home page
            component if changing landing page.

          - wrap export in withPageContext to retrieve global state like:
          - - Authentication
          - - User details
          - Other global variables can be put in the variable contextProps to pass it
          - to each page.
        */}
        <PageContext.Provider value={contextProps}>
          <Route
            exact
            path="/"
            render={() => <Redirect to={userAuthenticated ? '/profile' : '/signup'} />}
          />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/profile/:id?" component={ProfilePage} />
        </PageContext.Provider>
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

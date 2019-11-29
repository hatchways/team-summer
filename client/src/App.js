import React from 'react';
import { MuiThemeProvider, withStyles } from '@material-ui/core';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { theme } from './themes/theme';

import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ProfilePage from './pages/Profile';
import AddProject from './pages/AddProject';
import Project from './pages/Project';
import Explore from './pages/Explore';

import Toast from './components/Toast';
import { PageContext } from './components/pageContext';
import jwTokenCheck from './helpers/JwtTokenHelper';

require('dotenv').config();

const styles = {
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
};

class App extends React.Component {
  constructor(props) {
    super(props);
    // globalStyles();

    this.state = {
      toastProperties: {
        text: '',
        button: 'CLOSE',
        variant: 'neutral'
      },
      showToast: false,
      userAuthenticated: false,
      userDetails: {
        name: '',
        id: null
      }
    };

    // Authenticate users pre-render
    jwTokenCheck(this.state);
  }

  activateToast = (text, variant = 'neutral', button = 'CLOSE') => {
    this.setState({
      toastProperties: { text, variant, button },
      showToast: true
    });
  };

  setAuthenticated = (authenticated) => this.setState({ userAuthenticated: authenticated });
  setUserDetails = (id, name) => this.setState({ userDetails: { id, name } });
  toggleToast = () => this.setState((state) => ({ showToast: !state.showToast }));

  render() {
    const { toastProperties, userDetails, userAuthenticated, showToast } = this.state;

    const contextProps = {
      activateToast: this.activateToast,
      userAuthenticated: userAuthenticated,
      setAuthenticated: this.setAuthenticated,
      userDetails: userDetails,
      setUserDetails: this.setUserDetails
    };

    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar
            userDetails={userDetails}
            setUserDetails={this.setUserDetails}
            userAuthenticated={userAuthenticated}
            setAuthenticated={this.setAuthenticated}
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
              render={() => <Redirect to={userAuthenticated ? '/profile' : '/signup'}/>}
            />
            <Route path="/signup" component={SignUp}/>
            <Route path="/login" component={Login}/>
            <Route path="/profile/:id?" component={ProfilePage}/>
            <Route path="/projects/add/:id" component={AddProject}/>
            <Route path="/project/:id" component={Project}/>
            <Route path="/explore" component={Explore}/>
          </PageContext.Provider>
          <Toast
            buttonText={toastProperties.button}
            toastMessage={toastProperties.text}
            variant={toastProperties.variant}
            toggleToast={this.toggleToast}
            showToast={showToast}
          />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
};

export default withStyles(styles)(App);

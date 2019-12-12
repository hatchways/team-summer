import React from 'react';
import { MuiThemeProvider, withStyles } from '@material-ui/core';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import socketClient from 'socket.io-client';

import { theme } from 'themes/theme';

import NavBar from 'components/NavBar';
import ProtectedRoute from 'components/ProtectedRoute';
import SignUp from 'pages/SignUp';
import Login from 'pages/Login';
import ProfilePage from 'pages/Profile';
import EditProfile from 'pages/EditProfile';
import AddProject from 'pages/AddProject';
import EditProject from 'pages/EditProject';
import Project from 'pages/Project';
import Explore from 'pages/Explore';
import Messages from 'pages/Messages';
import Checkout from 'pages/Checkout';

import Toast from 'components/Toast';
import { PageContext } from 'components/pageContext';
import jwTokenCheck from 'helpers/JwtTokenHelper';

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
        id: null,
        description: '',
        avatar: '',
        location: ''
      },
      notifications: []
    };

    // Authenticate users pre-render
    jwTokenCheck(this.state);
  }

  socket = socketClient(process.env.REACT_APP_SOCKET_ENDPOINT, { autoConnect: false });

  openSocketAuthenticate = () => {
    /*
    *  Handle opening the socket and sending the user id to the backend socket connection,
    *  so we can identify socket connections with users
    * */
    const { id } = this.state.userDetails;
    this.socket.open();
    // TODO: Make a function where it automatically adds the token to the 3rd argument
    return this.socket.emit('authenticate', id, { token: localStorage.getItem('jwtToken') });
  };

  closeSocket = () => {
    if (this.socket.connected) this.socket.close();
  };

  componentDidMount() {
    this.socket.on('error', (error) => console.error(`Socket Warning: ${error}`));

    /*
    * If on page load/refresh, user is authenticated, open the socket connection,
    * otherwise close the socket connection if connected
    * */
    if (this.state.userAuthenticated) return this.openSocketAuthenticate();

    this.closeSocket();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /*
    * When the state is update, if the user authentication changes, connect/disconnect
    * the socket.
    * */
    const { userAuthenticated: wasAuthenticated } = prevState;
    const { userAuthenticated: isAuthenticated } = this.state;

    if (!wasAuthenticated && isAuthenticated) return this.openSocketAuthenticate();
    if (wasAuthenticated && !isAuthenticated) return this.closeSocket();
  }

  activateToast = (text, variant = 'neutral', button = 'CLOSE') => {
    this.setState({
      toastProperties: { text, variant, button },
      showToast: true
    });
  };
  toggleToast = () => this.setState((state) => ({ showToast: !state.showToast }));
  setNotifications = (notifications) => this.setState({ notifications });
  setAuthenticated = (authenticated) => this.setState({ userAuthenticated: authenticated });
  setUserDetails = (id, name, about, avatar, location) => this.setState({
    userDetails: {
      id,
      name,
      about,
      avatar,
      location
    }
  });

  render() {
    const {
      toastProperties,
      userDetails,
      userAuthenticated,
      showToast,
      notifications } = this.state;

    const contextProps = {
      activateToast: this.activateToast,
      userAuthenticated: userAuthenticated,
      setAuthenticated: this.setAuthenticated,
      userDetails: userDetails,
      setUserDetails: this.setUserDetails,
      notifications: notifications,
      setNotifications: this.setNotifications,
      socket: this.socket
    };

    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <NavBar
            userDetails={userDetails}
            setUserDetails={this.setUserDetails}
            userAuthenticated={userAuthenticated}
            setAuthenticated={this.setAuthenticated}
            notifications={notifications}
            setNotifications={this.setNotifications}
            socket={this.socket}
            activateToast={this.activateToast}
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
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to={userAuthenticated ? '/profile' : '/signup'} />}
              />
              <Route path="/signup" component={SignUp}/>
              <Route path="/login" component={Login}/>
              <Route path="/profile/:id?" exact component={ProfilePage}/>
              <ProtectedRoute exact path="/profile/edit/:id" component={EditProfile} />
              <ProtectedRoute path="/launch" component={AddProject}/>
              <Route path="/projects/:id" exact component={Project}/>
              <ProtectedRoute path="/projects/edit/:id" exact component={EditProject}/>
              <Route path="/explore" component={Explore}/>
              <ProtectedRoute path="/messages" component={Messages}/>
              <ProtectedRoute path="/checkout" component={Checkout}/>
            </Switch>
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

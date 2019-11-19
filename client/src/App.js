import React from 'react'
import {MuiThemeProvider, AppBar, Toolbar, Typography, makeStyles} from '@material-ui/core'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'

import {theme} from './themes/theme';

import SvgProductLaunchLogo from './components/ProductLaunchLogo';
import SignUp from './pages/sign-up';
import Login from './pages/login';

const useStyles = makeStyles({
    navBar: (theme) => ({
        borderBottom: `1px solid ${theme.meta}`
    })
});

const App = () => {
    const classes = useStyles(theme);
    return (
        <MuiThemeProvider theme={theme}>
            <AppBar className={classes.navBar} position="static" color="#ffffff" elevation={0}>
                <Toolbar>
                    <SvgProductLaunchLogo style={{marginRight: 22}}/>
                    <Typography variant="h1">Product Launch</Typography>
                </Toolbar>
            </AppBar>
            <BrowserRouter>
                    <Route exact path="/" render={() => <Redirect to="/signup"/>}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/login" component={Login}/>
            </BrowserRouter>
        </MuiThemeProvider>
    )
};

export default App

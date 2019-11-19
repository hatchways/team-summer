import React from 'react'
import {MuiThemeProvider, AppBar, Toolbar, Typography, makeStyles} from '@material-ui/core'
import {BrowserRouter, Route} from 'react-router-dom'

import {theme} from './themes/theme'
import LandingPage from './pages/Landing'

import SvgProductLaunchLogo from './components/ProductLaunchLogo'

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <AppBar position="static" color="#ffffff">
                <Toolbar>
                    <SvgProductLaunchLogo style={{marginRight: 22}}/>
                    <Typography variant="h1">Product Launch</Typography>
                </Toolbar>
            </AppBar>
            <BrowserRouter>
                <Route path="/" component={LandingPage}/>
            </BrowserRouter>
        </MuiThemeProvider>
    )
}

export default App

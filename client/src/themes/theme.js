import {createMuiTheme} from '@material-ui/core';

export const theme = createMuiTheme({
    typography: {
        fontFamily: '"Roboto"',
        h1: {
            fontSize: '1.5em',
            fontWeight: 'semi-bold',
            textAlign: 'center'
        },
        h2: {
            fontSize: '2.75em',
            fontWeight: 'semi-bold',
            textAlign: 'center'
        },
        h6: {
            fontSize: '1em',
            fontWeight: 'semi-bold',
            textAlign: 'center'
        }
    },
    palette: {
        primary: {
            main: '#69E781',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#1f1f1f'
        }
    },
    primary: '#69E781',
    secondary: '#1f1f1f',
    meta: '#E8E8E8',
    error: '#d8000c',
    bgcolor: '#f6f6f6',

});

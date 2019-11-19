import {createMuiTheme} from '@material-ui/core'

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
        }
    },
    primary: '#69E781',
    secondary: '#1f1f1f',
    error: '#d8000c',
    bgcolor: '#f6f6f6',

})

import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    h1: {
      fontSize: '1.7em',
      fontWeight: 'semi-bold',
      textAlign: 'center'
    },
    h2: {
      fontSize: '2.2em',
      fontWeight: '500',
      textAlign: 'center'
    },
    h3: {
      fontSize: '1.9em',
      fontWeight: 'semi-bold'
    },
    h4: {
      fontSize: '1.6em',
      fontWeight: '500'
    },
    h5: {
      fontSize: '1.3em'
    },
    h6: {
      fontSize: '1em',
      fontWeight: '500',
      textAlign: 'center'
    },
    body1: {
      margin: '10px 0'
    }
  },
  breakpoints: {
    values: {
      sm: 415,
      md: 800
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
  bgcolor: '#f6f6f6'
});

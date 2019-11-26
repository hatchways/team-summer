import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    h1: {
      fontSize: '1.5em',
      fontWeight: 'semi-bold',
      textAlign: 'center'
    },
    h2: {
      fontSize: '2.2em',
      fontWeight: 'semi-bold',
      textAlign: 'center',
    },
    h3: {
      fontSize: '2em',
      fontWeight: 'semi-bold'
    },
    h6: {
      fontSize: '1em',
      fontWeight: '500',
      textAlign: 'center'
    },
    body1: {
      margin: '10px 0'
    },
    subtitle2: {
      color: '#d3d3d3',
      fontSize: '1em',
      fontWeight: 300
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

import { createMuiTheme } from '@material-ui/core';

const headerMargin = '10px 0';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    h1: {
      fontSize: '1.7em',
      fontWeight: 'semi-bold',
      textAlign: 'center',
    },
    h2: {
      fontSize: '2.2em',
      fontWeight: '500',
      textAlign: 'center',
      margin: `${headerMargin}`
    },
    h3: {
      fontSize: '1.9em',
      fontWeight: 'semi-bold',
      margin: `${headerMargin}`
    },
    h4: {
      fontSize: '1.6em',
      fontWeight: '500',
      margin: `${headerMargin}`
    },
    h5: {
      fontSize: '1.3em',
      margin: '2px 0'
    },
    h6: {
      fontSize: '1em',
      fontWeight: '500',
      margin: `2px 0`
    },
    body1: {
      margin: '5px 0'
    },
    subtitle2: {
      color: '#d3d3d3',
      fontSize: '1em',
      fontWeight: 300,
      margin: '10px 0'
    },
    overline: {
      fontWeight: 500,
      fontSize: '0.9em',
      marginRight: 3,
      lineHeight: 'unset'
    }
  },
  breakpoints: {
    values: {
      sm: 415,
      md: 800,
      lg: 1060
    }
  },
  palette: {
    primary: {
      main: '#69E781',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#BDBDBD',
      contrastText: '#000000'
    }
  },
  primary: '#69E781',
  secondary: '#1f1f1f',
  meta: '#E8E8E8',
  error: '#d8000c',
  bgcolor: '#f6f6f6'
});

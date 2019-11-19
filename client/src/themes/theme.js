import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    h1: {
      fontSize: '1.5em',
      fontWeight: 'semi-bold'
    }
  },
  primary: "#69E781",
  secondary: "#1f1f1f",
  error: "#d8000c",
  bgcolor: "#f6f6f6"
});

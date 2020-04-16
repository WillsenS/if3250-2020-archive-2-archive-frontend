import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    common: {
      black: "rgba(0, 0, 0, 0.87)",
      white: "#FFF",
      darkGray: "#292D35",
      yellow: "#FFCE1F",
    },
    primary: {
      main: "#175389",
      light: "#4B9DD3",
      bg: "#C4C4C4",
    },
    warning: {
      main: "#FFCE1F",
    },
    secondary: {
      main: "#292D35",
    },
    background: {
      default: "#fafafa",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    body1: {
      fontSize: "14px",
    },
    body2: {
      fontSize: "12px",
      fontWeight: "600",
    },
    h1: {
      fontSize: "36px",
      fontWeight: "fontWeightBold",
    },
    h2: {
      fontSize: "32px",
    },
    h3: {
      fontSize: "24px",
      fontWeight: "600",
    },
    h4: {
      fontSize: "18px",
      fontWeight: "fontWeightBold",
    },
    h5: {
      fontSize: "14px",
      fontWeight: "600",
    },
    h6: {
      fontSize: "14px",
      fontWeight: "fontWeightBold",
    },
  },
});

export default theme;

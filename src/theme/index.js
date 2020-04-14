import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    common: {
      black: "rgba(0, 0, 0, 0.87)",
      white: "#FFF",
      darkGray: "#292D35",
      lightGray: "#3D4148",
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
    },
    h3: {
      fontSize: "18px",
      fontWeight: "600",
    },
    h4: {
      fontSize: "14px",
      fontWeight: "600",
    },
    h5: {
      fontSize: "12px",
    },
  },
});

export default theme;

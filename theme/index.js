import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    common: {
      black: "rgba(0, 0, 0, 0.87)",
      white: "#FFF",
      darkGray: "292D35"
    },
    primary: {
      main: "#175389",
      bg: "#C4C4C4"
    },
    secondary: {
      main: "#FFCE1F"
    },
    background: {
      default: "#fafafa"
    }
  },
  typography: {
    fontFamily: "Montserrat",
    h3: {
      fontSize: "18px",
      fontWeight: "600"
    },
    h4: {
      fontSize: "14px",
      fontWeight: "600"
    }
  }
});

export default theme;

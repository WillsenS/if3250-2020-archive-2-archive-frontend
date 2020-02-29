import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        common: {
            black: "rgba(0, 0, 0, 0.87)",
            white: "#fff"
        },
            primary: {
            main: "#175389"
        },
            secondary: {
            main: "#FFCE1F"
        },
            background: {
            default: "#fafafa"
        }
    },
    typography: {
        fontFamily: "'Source Sans Pro', 'Helvetica', sans-serif"
    }
});

export default theme;
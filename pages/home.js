import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import theme from "../theme/index";
const UseStyles = makeStyles(() => ({
    root: {
        margin : "32px"
    }
}))

const HomePage = () => {
    return(
        <ThemeProvider theme={theme}>
            <Header />
            <Footer />
        </ThemeProvider>
    );
};

export default HomePage;
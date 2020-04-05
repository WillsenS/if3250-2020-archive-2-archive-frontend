import React from "react";
import theme from "../theme";
import {
    Box,
    AppBar,
    Container,
    Toolbar,
    Typography,
    Grid
} from "@material-ui/core";
import withWidth, {isWidthDown} from "@material-ui/core/withWidth";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import NavLink from "./Link/NavLink";
import Link from 'next/link'


//PropTypes validation
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    title: {
        marginTop: "auto",
        marginBottom: "auto",
    },
    yellow: {
        color: theme.palette.warning.main
    },
    imageLg: {
        maxWidth: "75%"
    },
    imageXs: {
        maxWidth: "90%"
    },
    grid: {
        display: "inline-flex"
    },
    toolbar: {
        padding: "16px 0"
    },
    login: {
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "auto"
    }
}));

const Header = props => {
    const classes = useStyles();

    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar position="static" className={classes.root}>
                    <Container>
                        <Toolbar className={classes.toolbar}>
                            <Grid container spacing={0}>

                                <Grid item xs={2} sm={1} lg={1} className={classes.grid}>
                                    <Link href="/">
                                        <img
                                            src="/static/img/logo-itb.png"
                                            alt="logo ITB"
                                            className={
                                                isWidthDown("sm", props.width)
                                                    ? classes.imageXs
                                                    : classes.imageLg
                                            }
                                            style={{cursor: "pointer"}}
                                        />
                                    </Link>
                                </Grid>
                                <Grid item xs={8} className={classes.grid}>

                                    <Box className={classes.title}>
                                        <Box>
                                            <Typography
                                                variant={isWidthDown("sm", props.width) ? "h4" : "h3"}
                                                className={classes.yellow}
                                            >
                                                Archive Digital Information Center
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography
                                                variant={isWidthDown("sm", props.width) ? "h4" : "h3"}
                                            >
                                                INSTITUT TEKNOLOGI BANDUNG
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>


                                <Grid item lg={3} xs={2} className={classes.grid}>
                                    <div className={classes.login}>
                                        <Typography variant="h4">LOGIN</Typography>
                                    </div>
                                    {/*TODO: Harusnya baru muncul kalo udah login*/}
                                    <div className={classes.login}>
                                        <Typography variant="h4">
                                            <NavLink href="/admin-panel">
                                                ADMIN PANEL
                                            </NavLink>
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
        </>
    )
        ;
};

export default withWidth()(Header);


Header.propTypes = {
    width: PropTypes.string
};
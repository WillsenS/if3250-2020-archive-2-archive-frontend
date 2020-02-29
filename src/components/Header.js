import React from 'react';
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import logoITB from '../asset/logo-itb-1024px.png';
import { Toolbar, Typography } from '@material-ui/core';
import theme from '../theme/index';
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme =>({
    title: {
        flexGrow: 1,
    },
    logo: {
        marginRight: '16px'
    },
    yellow: {
        color:'#FFCE1F'
    },
}));

function Header(){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <img src={logoITB} alt="logo ITB" width = "50" height = "50" className={classes.logo}></img>
                        <Box fontFamily="montserrat semi-bold" className={classes.title}>
                            <Box className={classes.yellow}> SISTEM ARSIP </Box>
                            <Box> INSTITUT TEKNOLOGI BANDUNG </Box>
                        </Box>    
                        <a color="inherit">Login</a>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
}

export default Header;
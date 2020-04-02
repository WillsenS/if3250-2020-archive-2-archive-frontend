import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {useTheme} from "@material-ui/core/styles";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";
//Custom
import useStyles from "./style";
import profile from "../../../../public/static/img/pp.jpg";
import Header from "../../Header";
import Footer from "../../Footer";

function AdminLayout(props) {
    let {container, section} = props; //section 1 = home, 2 = users, 3 = archives
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    if (!section) {
        section = 1;
    }
    // if (!title) {
    //     title = "Halaman Utama Admin Panel";
    // }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            {/* <div className={classes.toolbar} /> */}
            <div className={classes.profile}>
                <Avatar
                    alt="Profile Picture"
                    src={profile}
                    className={classes.picture}
                />
                <Typography component="span" variant="h6">
                    <Box fontWeight="fontWeightBold">Adam Malik</Box>
                </Typography>
                <Typography component="span" variant="body1">
                    <Box fontWeight="fontWeightBRegular">Administrator STEI</Box>
                </Typography>
            </div>
            <Divider/>
            <List>
                <Link href="/admin-panel">
                    <ListItem
                        button
                        key={"Home"}
                        classes={{root: section === 1 ? classes.currentLink : ""}}
                        className={classes.buttonHover}
                    >
                        <ListItemIcon>
                            <HomeIcon classes={{root: classes.icon}}/>
                        </ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItem>
                </Link>
                <Link href="/admin-panel/admins">
                    <ListItem
                        button
                        key={"Admins"}
                        classes={{root: section === 2 ? classes.currentLink : ""}}
                        className={classes.buttonHover}
                    >
                        <ListItemIcon>
                            <SupervisorAccountIcon classes={{root: classes.icon}}/>
                        </ListItemIcon>
                        <ListItemText primary={"Admin"}/>
                    </ListItem>
                </Link>
                <Link href="/admin-panel/archives">
                    <ListItem
                        button
                        key={"Archives"}
                        classes={{root: section === 3 ? classes.currentLink : ""}}
                        className={classes.buttonHover}
                    >
                        <ListItemIcon>
                            <FindInPageIcon classes={{root: classes.icon}}/>
                        </ListItemIcon>
                        <ListItemText primary={"Arsip"}/>
                    </ListItem>
                </Link>
            </List>
            <Divider/>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <span className={classes.contentWrapper}>
                <Header/>
              <main className={classes.content}>
        <div className={classes.toolbar}/>
                  {props.children ? props.children : ""}
      </main>
                <Footer/>
            </span>

        </div>
    );
}

AdminLayout.propTypes = {
    container: PropTypes.any,
    section: PropTypes.number,
    children: PropTypes.element,
    title: PropTypes.string
};

export default AdminLayout;

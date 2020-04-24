import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { useTheme } from "@material-ui/core/styles";

//Custom
import useStyles from "./style";
import Header from "../../../Header";
import Footer from "../../../Footer";
import NavButton from "../../Custom/Button/NavButton";

import HighestAdminAuth from "../../../../../layout/HighestAdminAuth";
import { StateUserContext } from "../../../../../reducers/user";
import SideBar from "../../SideBar";

function HighAdminLayout(props) {
  let { container, section, token } = props; //section 1 = home, 2 = users, 3 = archives
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const userState = React.useContext(StateUserContext);

  if (!section) {
    section = 1;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <HighestAdminAuth token={token} className={classes.root}>
        <CssBaseline />
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
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <SideBar section={section} user={userState.user} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <SideBar section={section} user={userState.user} />
            </Drawer>
          </Hidden>
        </nav>
        <span className={classes.contentWrapper}>
          <Header user={userState.user} />
          <main className={classes.content}>
            <NavButton handleClick={handleDrawerToggle} />
            {props.children ? props.children : ""}
          </main>
          <Footer />
        </span>
      </HighestAdminAuth>
    </>
  );
}

HighAdminLayout.propTypes = {
  container: PropTypes.any,
  section: PropTypes.number,
  children: PropTypes.element,
  title: PropTypes.string,
};

export default HighAdminLayout;

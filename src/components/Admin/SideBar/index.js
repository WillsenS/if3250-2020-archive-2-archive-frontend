import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";

import useStyles from "./style";

const SideBar = (props) => {
  const classes = useStyles();
  const { section, user } = props;

  const adminLink =
    user.role === 1 ? (
      <Link href="/admin-panel/admins" color="inherit">
        <ListItem
          button
          key={"Admins"}
          classes={{ root: section === 2 ? classes.currentLink : "" }}
          className={classes.buttonHover}
        >
          <ListItemIcon>
            <SupervisorAccountIcon classes={{ root: classes.icon }} />
          </ListItemIcon>
          <ListItemText primary={"Admin"} />
        </ListItem>
      </Link>
    ) : null;

  const archiveRequestLink =
    user.role === 1 ? (
      <Link href="/admin-panel/archive-requests" color="inherit">
        <ListItem
          button
          key={"Archives"}
          classes={{ root: section === 4 ? classes.currentLink : "" }}
          className={classes.buttonHover}
        >
          <ListItemIcon>
            <EventAvailableIcon classes={{ root: classes.icon }} />
          </ListItemIcon>
          <ListItemText primary={"Peminjaman"} />
        </ListItem>
      </Link>
    ) : null;

  const keywordLink =
    user.role === 1 ? (
      <Link href="/admin-panel/keywords" color="inherit">
        <ListItem
          button
          key={"Keywords"}
          classes={{ root: section === 5 ? classes.currentLink : "" }}
          className={classes.buttonHover}
        >
          <ListItemIcon>
            <FindInPageIcon classes={{ root: classes.icon }} />
          </ListItemIcon>
          <ListItemText primary={"Keyword"} />
        </ListItem>
      </Link>
    ) : null;

  return (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <div className={classes.profile}></div>
      <Divider />
      <List>
        <Link href="/admin-panel" color="inherit">
          <ListItem
            button
            key={"Home"}
            classes={{ root: section === 1 ? classes.currentLink : "" }}
            className={classes.buttonHover}
          >
            <ListItemIcon>
              <HomeIcon classes={{ root: classes.icon }} />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
        {adminLink}
        <Link href="/admin-panel/archives" color="inherit">
          <ListItem
            button
            key={"Archives"}
            classes={{ root: section === 3 ? classes.currentLink : "" }}
            className={classes.buttonHover}
          >
            <ListItemIcon>
              <FindInPageIcon classes={{ root: classes.icon }} />
            </ListItemIcon>
            <ListItemText primary={"Arsip"} />
          </ListItem>
        </Link>
        {archiveRequestLink}
        {keywordLink}
      </List>
      <Divider />
    </div>
  );
};

export default SideBar;

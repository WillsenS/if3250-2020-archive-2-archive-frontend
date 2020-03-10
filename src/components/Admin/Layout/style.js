import { makeStyles } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    boxShadow: "none"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  profile: {
    margin: "1rem auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  picture: {
    margin: ".7rem auto",
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: blueGrey[900],
    color: blueGrey[50]
  },
  icon: {
    color: blueGrey[50]
  },
  buttonHover: {
    "&:hover": {
      backgroundColor: blueGrey[700]
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  currentLink: {
    backgroundColor: blueGrey[700]
  }
}));

export default useStyles;

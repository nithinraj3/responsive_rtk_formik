import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import {
  AppBar,
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { toast } from "react-toastify";
import WorkIcon from "@material-ui/icons/Work";
import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
  },
  title_container: {
    marginLeft: theme.spacing(0),
  },
  icons: {
    color: theme.palette.primary.paper,
    marginRight: theme.spacing(1),
  },
  drawer_container: {
    backgroundColor: theme.palette.primary.paper,
    margin: theme.spacing(2),
    height: theme.spacing(110),
  },
  title: {
    color: theme.palette.primary.paper,
  },
  list_item: {
    "& .MuiButtonBase-root": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  link_text: {
    marginLeft: theme.spacing(1),
  },
  purple: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const activeStyle = {
  color: "#333996",
  backgroundColor: "rgba(51, 57, 150, 0.5)",
  fontWeight: "bold",
};

export default function Drawer(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    localStorage.removeItem("loginUser");

    window.location.href = "/login";

    toast.success("Logged out successfully!, Comeback later :)", {
      position: "top-center",
      autoClose: 2000,
      pauseOnHover: true,
    });
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={classes.drawer_container}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.purple}>N</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Nithin Raj" secondary="nithin@gmail.com" />
        </ListItem>
      </List>
      <Divider variant="fullwidth" />
      <List>
        <NavLink className="drawer_link" exact activeStyle={activeStyle} to="/">
          <ListItem button className={classes.list_item}>
            <HomeIcon />
            <Typography className={classes.link_text}>HOME</Typography>
          </ListItem>
        </NavLink>
        <NavLink
          className="drawer_link"
          exact
          activeStyle={activeStyle}
          to="/employees"
        >
          <ListItem button className={classes.list_item}>
            <PeopleIcon />
            <Typography className={classes.link_text}>EMPLOYEES</Typography>
          </ListItem>
        </NavLink>
        <NavLink
          className="drawer_link"
          exact
          activeStyle={activeStyle}
          to="/designations"
        >
          <ListItem button className={classes.list_item}>
            <WorkIcon />
            <Typography className={classes.link_text}>DESIGNATIONS</Typography>
          </ListItem>
        </NavLink>
      </List>
      <Divider variant="fullwidth" />
    </div>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.root}>
        {["top"].map((anchor) => (
          <React.Fragment key={anchor}>
            <IconButton
              className={classes.icons}
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}

        <div className={classes.title_container}>
          <Toolbar>
            <Typography variant="body1" component="h3">
              ADMIN TEMPLATE
            </Typography>
          </Toolbar>
        </div>
        {/* <IconButton
          className={classes.icons}
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
        >
          <AccountCircle />
        </IconButton> */}
      </AppBar>
      {renderMenu}
    </>
  );
}

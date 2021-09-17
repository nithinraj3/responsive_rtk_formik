import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import LockIcon from "@material-ui/icons/Lock";

const useStyles = makeStyles((theme) => ({
  profile_container: {
    marginLeft: theme.spacing(0),
  },
  mobile_container: {
    margin: theme.spacing(0),
    padding: theme.spacing(1, 0),
  },
  header1: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header2: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    color: theme.palette.primary.paper,
  },
  purple: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function UserNavBar(props) {
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

    props.logout();

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
      <List className={classes.profile_container}>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.purple}>N</Avatar>
          </ListItemAvatar>
          <ListItemText primary="Nithin Raj" secondary="nithin@gmail.com" />
        </ListItem>
      </List>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <Typography variant="inherit">My Account</Typography>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <Typography variant="inherit">Settings</Typography>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <Typography variant="inherit">Logout</Typography>
      </MenuItem>
    </Menu>
  );

  const [clickLink, setClickLink] = useState(false);

  const linkHandler = (event) => {
    setClickLink(true);
  };
  console.log(clickLink);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">Admin Template</Typography>
          <Box flexGrow={1}></Box>
          <ButtonGroup>
            <Button
              onClick={linkHandler}
              component={NavLink}
              to="/"
              variant={clickLink ? "contained" : "text"}
            >
              <Typography variant="body1">Home</Typography>
            </Button>
            <Button
              onClick={linkHandler}
              component={NavLink}
              to="/employees"
              variant="text"
              color="inherit"
            >
              <Typography variant="body1">Employees</Typography>
            </Button>
            <Button
              onClick={linkHandler}
              component={NavLink}
              to="/designations"
              variant="text"
              color="inherit"
            >
              <Typography variant="body1">Designations</Typography>
            </Button>
          </ButtonGroup>
          <IconButton
            className={classes.icons}
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Tooltip title="Nithin Raj" interactive>
              <AccountCircle />
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  );
}

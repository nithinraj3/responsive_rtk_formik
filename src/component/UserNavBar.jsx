import React from "react";
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
import styled from "styled-components";
import { Grid, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  menu: {
    marginLeft: theme.spacing(5),
  },
  titlee: {
    marginLeft: theme.spacing(0),
    color: "#fff",
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
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin-left: 15px;
  height: 100%;
`;

const ListItem = styled.li`
  font-size: 16px;
  margin-left: 25px;
  height: 100%;
`;

const activeStyle = {
  color: "cyan",
  fontWeight: "bold",
};

export default function UserNavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const userNavbarMatches = useMediaQuery("(min-width:640px)");

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
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      {userNavbarMatches ? (
        <div className={classes.grow}>
          <AppBar position="fixed">
            <Toolbar>
              <Typography variant="h6" className={classes.logo}>
                ADMIN TEMPLATE
              </Typography>
              <List>
                <ListItem>
                  <NavLink
                    exact
                    to="/"
                    className="link"
                    activeStyle={activeStyle}
                  >
                    Home
                  </NavLink>
                </ListItem>
                <ListItem>
                  <NavLink
                    className="link"
                    exact
                    to="/employees"
                    activeStyle={activeStyle}
                  >
                    Employees
                  </NavLink>
                </ListItem>
                <ListItem>
                  <NavLink
                    className="link"
                    exact
                    to="/designations"
                    activeStyle={activeStyle}
                  >
                    Designations
                  </NavLink>
                </ListItem>
              </List>
              <div className={classes.grow} />
              <div>
                <IconButton
                  className={classes.icons}
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      ) : (
        <AppBar position="fixed" className={classes.mobile_container}>
          <Toolbar>
            <Grid container>
              <Grid item xs={12} className={classes.header1}>
                <Typography variant="h6">ADMIN TEMPLATE</Typography>
                <IconButton
                  className={classes.icons}
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                >
                  <AccountCircle />
                </IconButton>
              </Grid>
              <Grid item xs={12} className={classes.header2}>
                <NavLink
                  exact
                  to="/"
                  className="link"
                  activeStyle={activeStyle}
                >
                  <Typography>Home</Typography>
                </NavLink>
                <NavLink
                  exact
                  to="/employees"
                  className="link"
                  activeStyle={activeStyle}
                >
                  <Typography>Employees</Typography>
                </NavLink>
                <NavLink
                  exact
                  to="/designations"
                  className="link"
                  activeStyle={activeStyle}
                >
                  <Typography>Designations</Typography>
                </NavLink>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      )}
      {renderMenu}
    </>
  );
}

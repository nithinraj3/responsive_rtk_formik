import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: theme.palette.primary.light,
  },
  logo: {
    color: "#000",
  },
  menu: {
    display: "flex",
  },
  title: {
    marginLeft: theme.spacing(3),
    flexGrow: 1,
    color: "#000",
  },
}));

const AuthNavBar = () => {
  const classes = useStyles();
  const history = useHistory();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLoginPage = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  const handleRegisterPage = (e) => {
    e.preventDefault();
    history.push("/register");
  };
  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.nav}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Laravel
            </Typography>
            <div className={classes.menu}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="standard"
                indicatorColor="primary"
                aria-label="icon label tabs example"
                centered
              >
                <Tab
                  className={classes.title}
                  onClick={handleLoginPage}
                  label="Login"
                />
                <Tab
                  className={classes.title}
                  onClick={handleRegisterPage}
                  label="Register"
                />
              </Tabs>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default AuthNavBar;

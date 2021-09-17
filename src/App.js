import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import Designations from "./pages/designations/List";
import Employees from "./pages/employees/List";
import EmployeeEdit from "./pages/employees/Edit";
import { CssBaseline, createTheme, ThemeProvider } from "@material-ui/core";
import AddDesignations from "./pages/designations/Create";
import AddEmployees from "./pages/employees/Create";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./component/Header";
import Home from "./pages/Home";
import DesignationEdit from "./pages/designations/Edit";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#482880",
      light: "#3c44b126",
      paper: "#fff",
      black: "#000",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
      paper: "#fff",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

function App() {
  const storagetkn = JSON.parse(localStorage.getItem("loginUser")) && true;
  const [token, setToken] = useState(false);

  const login = (tkn) => {
    setToken(tkn);
  };
  const logout = () => {
    setToken(false);
  };

  let isLogged;
  if (token || storagetkn) {
    isLogged = true;
  } else {
    isLogged = false;
  }

  let routes;

  if (isLogged) {
    routes = (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/employees">
          <Employees />
        </Route>
        <Route exact path="/designations">
          <Designations />
        </Route>
        <Route path="/designations/create">
          <AddDesignations />
        </Route>
        <Route path="/employees/create">
          <AddEmployees />
        </Route>
        <Route path="/employees/:id/edit">
          <EmployeeEdit />
        </Route>
        <Route path="/designations/:id/edit">
          <DesignationEdit />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/register">
          {isLogged ? <Redirect to="/login" /> : <Register />}
        </Route>
        <Route path="/login">
          <Login login={login} />
        </Route>
        <Route>
          <Redirect from="*" to="/login" />
        </Route>
      </Switch>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Header user={isLogged} logout={logout} />
      {routes}
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;

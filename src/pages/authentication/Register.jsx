import React, { useCallback, useReducer } from "react";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_EQUAL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import {
  Container,
  CssBaseline,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  Button,
  Card,
} from "@material-ui/core";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "../../component/Input";

import { useHistory } from "react-router-dom";
import LoadingSpinners from "../../component/LoadingSpinners";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/usersApi";

const useStyles = makeStyles((theme) => ({
  main_container: {
    marginTop: theme.spacing(12),
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    margin: theme.spacing(2, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  spinner: {
    marginLeft: theme.spacing(20),
  },
}));

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const Register = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      fname: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const reg = formState.inputs;

  const registerDetails = {
    name: reg.fname.value,
    email: reg.email.value,
    password: reg.password.value,
    password_confirmation: reg.confirmPassword.value,
  };

  const [register, { isLoading }] = useRegisterMutation();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await register(registerDetails).then((payload) => {
        toast.success("Successfully logged...", {
          position: "top-center",
          autoClose: 1000,
        });

        history.push("/login");

        localStorage.setItem(
          "loginUser",
          JSON.stringify(payload.data.data.access_token)
        );
      });
    } catch (err) {
      toast.error("Check your connection or Something went wrong", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className={classes.main_container}
      >
        <Card>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <form
                className={classes.form}
                autoComplete="off"
                onSubmit={placeSubmitHandler}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Input
                      element="input"
                      id="fname"
                      name="fname"
                      variant="outlined"
                      required
                      fullWidth
                      label="User Name"
                      autoFocus
                      errorText="Name with atleat 3 characters"
                      validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
                      onInput={inputHandler}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Input
                      element="input"
                      variant="outlined"
                      required
                      fullWidth
                      type="email"
                      id="email"
                      label="E-mail Address"
                      name="email"
                      errorText="Valid email required"
                      validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                      onInput={inputHandler}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      element="password"
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      errorText="Atleast 7 characters"
                      validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(7)]}
                      onInput={inputHandler}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Input
                      element="password"
                      variant="outlined"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      errorText="Provide same password"
                      validators={[
                        VALIDATOR_REQUIRE(),
                        VALIDATOR_EQUAL(formState.inputs.password.value),
                      ]}
                      onInput={inputHandler}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!formState.isValid}
                  startIcon={isLoading && <LoadingSpinners />}
                >
                  {!isLoading && <Typography>Login</Typography>}
                </Button>
              </form>
            </div>
          </Container>
        </Card>
      </Grid>
    </>
  );
};

export default Register;

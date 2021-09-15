import React, { useCallback } from "react";
import {
  Container,
  Card,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "../../component/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useReducer } from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinners from "../../component/LoadingSpinners";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/usersApi";

const useStyles = makeStyles((theme) => ({
  main_container: {
    marginTop: theme.spacing(12),
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      email: {
        value: "",
        isValid: false,
      },
      password: {
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

  const log = formState.inputs;

  const loginDetails = {
    email: log.email.value,
    password: log.password.value,
  };

  const [login, { isLoading }] = useLoginMutation();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();

    login(loginDetails)
      .then((payload) => {
        toast.success("Successfully logged...", {
          position: "top-center",
          autoClose: 1000,
        });

        props.login(payload.data.data.access_token);

        history.push("/");

        localStorage.setItem(
          "loginUser",
          JSON.stringify(payload.data.data.access_token)
        );
      })
      .catch((error) => {
        toast.error("Check your connection or Something went wrong", {
          position: "top-center",
          autoClose: 1000,
        });
      });
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
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
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
                  {isLoading && (
                    <>
                      <Grid item xs={12}>
                        <LoadingSpinners />
                      </Grid>
                    </>
                  )}
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  fullWidth
                  disabled={!formState.isValid}
                >
                  Login
                </Button>
              </form>
            </div>
          </Container>
        </Card>
      </Grid>
    </>
  );
};

export default Login;

import React from "react";
import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  Button,
  Paper,
  useMediaQuery,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useHistory } from "react-router-dom";
import { useCreateDesignationMutation } from "../../redux/usersApi";
import { toast } from "react-toastify";
import TextField from "../../component/FormUI/Textfield";
import AddBoxIcon from "@material-ui/icons/AddBox";

const useStyles = makeStyles((theme) => ({
  main_container: {
    margin: theme.spacing(12),
    padding: theme.spacing(3),
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
  },
  form: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(2, 2, 0, 0),
  },
  mobile_container: {
    margin: theme.spacing(15, 2),
    padding: theme.spacing(3),
  },
  mobile_wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2, 0, 4),
  },
  mobile_avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
  },
  mobile_form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const AddDesignation = () => {
  const classes = useStyles();
  const history = useHistory();

  const FORM_VALIDATION = Yup.object().shape({
    designation_name: Yup.string().required("Required"),
  });

  const [createDesignation] = useCreateDesignationMutation();

  const createDesignationHandler = (values) => {
    const list = { designation_name: values.designation_name };
    createDesignation(list)
      .then((payload) => {
        toast.success("Successfully added...", {
          position: "top-center",
          autoClose: 1000,
        });

        history.push("/designations");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };

  const createDesignationMatches = useMediaQuery("(min-width:640px)");

  return (
    <>
      <Paper
        className={
          createDesignationMatches
            ? classes.main_container
            : classes.mobile_container
        }
      >
        <Container
          className={
            createDesignationMatches ? classes.wrapper : classes.mobile_wrapper
          }
        >
          <Avatar
            className={
              createDesignationMatches ? classes.avatar : classes.mobile_avatar
            }
          >
            <AddBoxIcon />
          </Avatar>

          {createDesignationMatches ? (
            <Typography component="h1" variant="h6">
              Create Designation
            </Typography>
          ) : (
            <Typography
              style={{ fontSize: "20px" }}
              component="h1"
              variant="h6"
            >
              Create Designation
            </Typography>
          )}
        </Container>

        <Formik
          initialValues={{ designation_name: "" }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => createDesignationHandler(values)}
        >
          <Form className={classes.form} autoComplete="off">
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  name="designation_name"
                  label="Designation Name"
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" justifyContent="flex-start">
              <Grid item>
                <Button
                  className={classes.submit}
                  xs={12}
                  sm={6}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.submit}
                  xs={12}
                  sm={6}
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => history.push("/designations")}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Paper>
    </>
  );
};

export default AddDesignation;

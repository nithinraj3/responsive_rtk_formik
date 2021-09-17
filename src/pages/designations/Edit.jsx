import React from "react";
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  Button,
  Paper,
  useMediaQuery,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
import {
  useGetDesignationsQuery,
  useUpdateDesignationMutation,
} from "../../redux/usersApi";
import { toast } from "react-toastify";

import TextField from "../../component/FormUI/Textfield";

const useStyles = makeStyles((theme) => ({
  page_content: {
    margin: theme.spacing(12, 2),
    padding: theme.spacing(0, 3, 3),
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(0, -3),
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
    margin: theme.spacing(3, 2, 0, 0),
  },
  mobile_container: {
    margin: theme.spacing(15, 2),
    padding: theme.spacing(3),
  },
  mobile_wrapper: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(2, -2, 3),
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

const Edit = () => {
  const classes = useStyles();

  const history = useHistory();
  const params = useParams();

  const { data } = useGetDesignationsQuery();
  const designationData = data;

  const resultObject = search(params.id, designationData.data);
  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id.toString() === nameKey) {
        return myArray[i];
      }
    }
  }

  const [updateDesignations] = useUpdateDesignationMutation();

  const FORM_VALIDATION = Yup.object().shape({
    designation_name: Yup.string().required("Required"),
  });

  const editDesignationHandler = async (values) => {
    const list = {
      id: params.id,
      designation_name: values.designation_name,
    };

    try {
      await updateDesignations(list).then((res) => {
        toast.success("Successfully edited...", {
          position: "top-center",
          autoClose: 1000,
        });

        history.push("/designations");
      });
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  const isDesktop = useMediaQuery("(min-width:640px)");

  return (
    <>
      <Paper
        className={isDesktop ? classes.page_content : classes.mobile_container}
      >
        <Container
          className={isDesktop ? classes.wrapper : classes.mobile_wrapper}
        >
          {isDesktop ? (
            <Typography component="h1" variant="h6">
              Edit Designation
            </Typography>
          ) : (
            <Typography component="h1" variant="h6">
              Edit Designation
            </Typography>
          )}
        </Container>
        <Formik
          initialValues={{ designation_name: resultObject.name }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => editDesignationHandler(values)}
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

export default Edit;

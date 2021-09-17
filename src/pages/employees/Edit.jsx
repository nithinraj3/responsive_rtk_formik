import React from "react";
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  Paper,
  Button,
  useMediaQuery,
} from "@material-ui/core";

import { useHistory, useParams } from "react-router-dom";
import {
  useGetDesignationsQuery,
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../../redux/usersApi";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../component/FormUI/Textfield";
import RadioGender from "../../component/FormUI/RadioGender";
import Select from "../../component/FormUI/Select";
import DateTime from "../../component/FormUI/DateTimePicker";
import AddressCheckboxField from "../../component/FormUI/AddressCheckboxField";

const useStyles = makeStyles((theme) => ({
  main_container: {
    margin: theme.spacing(12, 2),
    padding: theme.spacing(0, 3),
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(0, -3),
    padding: theme.spacing(3),
  },
  text_field: {
    marginBottom: theme.spacing(4),
  },
  gender: {
    marginBottom: theme.spacing(3),
  },
  button_container: {
    margin: theme.spacing(-1, 0, 3, -1),
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
  mobile_text_field: {
    marginBottom: theme.spacing(3),
  },
  mobile_gender: {
    marginBottom: theme.spacing(3),
  },
  mobile_button_container: {
    margin: theme.spacing(0, 0, 1, -1),
  },
}));

const Edit = () => {
  const classes = useStyles();

  const history = useHistory();
  const params = useParams();

  const { data: designationData } = useGetDesignationsQuery();
  const designationId = designationData.data;

  const { data } = useGetEmployeesQuery();
  const prevEmployeeData = data;

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].id.toString() === nameKey) {
        return myArray[i];
      }
    }
  }
  var resultObject = search(params.id, prevEmployeeData.data);

  function statusProvider(val) {
    if (val === "1") {
      return "Temporary";
    } else if (val === "2") {
      return "Trainee";
    } else {
      return "Permanent";
    }
  }

  const INITIAL_FORM_STATE = {
    first_name: resultObject.first_name,
    last_name: resultObject.last_name,
    email: resultObject.email,
    mobile: resultObject.mobile,
    landline: resultObject.landline,
    designation_id: resultObject.designation_id,
    gender: resultObject.gender,
    present_address: resultObject.present_address,
    permanent_address: resultObject.permanent_address,
    status: statusProvider(resultObject.status),
    join_date: new Date(resultObject.join_date),
    date_of_birth: new Date(resultObject.date_of_birth),
  };

  const FORM_VALIDATION = Yup.object().shape({
    first_name: Yup.string().required("First name required"),
    last_name: Yup.string().required("Last name required"),
    email: Yup.string().email().required("Email required"),
    mobile: Yup.number().required("Mobile number required"),
    landline: Yup.number().nullable(),
    gender: Yup.string().nullable().required("Please select a gender"),
    present_address: Yup.string().required("Present Address required"),
    permanent_address: Yup.string().required("Permanent Address required"),
    join_date: Yup.date().nullable().required("Joining Date required"),
    date_of_birth: Yup.date().nullable().required("Date of birth required"),
    designation_id: Yup.string().nullable().required("Designation required"),
    status: Yup.string().required("Status required"),
  });

  const [updateEmloyee] = useUpdateEmployeeMutation();

  const editEmployeeHandler = async (values) => {
    const object = {
      id: params.id,
      first_name: values.first_name,
      last_name: values.last_name,
      join_date: values.join_date,
      date_of_birth: values.date_of_birth,
      designation_id: values.designation_id.toString(),
      gender: values.gender,
      status: values.status,
      email: values.email,
      mobile: values.mobile,
      landline: values.landline,
      present_address: values.present_address,
      permanent_address: values.permanent_address,
    };

    try {
      await updateEmloyee(object).then((payload) => {
        toast.success("Successfully added...", {
          position: "top-center",
          autoClose: 1000,
        });

        history.push("/employees");
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
      {isDesktop ? (
        <Paper className={classes.main_container}>
          <Container className={classes.wrapper}>
            <Typography component="h1" variant="h6">
              Edit Employee
            </Typography>
          </Container>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => editEmployeeHandler(values)}
          >
            <Form autoComplete="off">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    className={classes.text_field}
                    name="first_name"
                    label="First Name"
                  />
                  <TextField
                    className={classes.text_field}
                    name="last_name"
                    label="Last Name"
                  />{" "}
                  <TextField
                    className={classes.text_field}
                    name="email"
                    label="Email"
                  />
                  <TextField
                    className={classes.text_field}
                    name="mobile"
                    label="Mobile"
                  />
                  <TextField
                    className={classes.text_field}
                    name="landline"
                    label="Landline"
                  />
                  <DateTime
                    className={classes.text_field}
                    name="join_date"
                    label="Joining Date"
                  />
                  <DateTime
                    className={classes.text_field}
                    name="date_of_birth"
                    label="Date of Birth"
                  />
                  <Select
                    className={classes.text_field}
                    name="designation_id"
                    label="Designation"
                    options={designationId}
                  />
                  <Select
                    className={classes.text_field}
                    label="Status"
                    name="status"
                    options={[
                      { id: "1", name: "Temporary" },
                      { id: "2", name: "Trainee" },
                      { id: "3", name: "Permanent" },
                    ]}
                  />
                  <RadioGender className={classes.gender} row name="gender" />
                  <TextField
                    className={classes.text_field}
                    name="present_address"
                    label="Present Address"
                    multiline
                    rows={3}
                  />
                  <div style={{ marginBottom: "1.5rem" }}>
                    <AddressCheckboxField />
                  </div>
                  <TextField
                    className={classes.text_field}
                    name="permanent_address"
                    label="Permenent Address"
                    multiline
                    rows={3}
                  />
                  <Grid
                    container
                    spacing={2}
                    className={classes.button_container}
                  >
                    <Grid item>
                      <Button type="submit" color="primary" variant="contained">
                        Submit
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        color="secondary"
                        variant="outlined"
                        component="label"
                        onClick={() => history.push("/employees")}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      ) : (
        <Paper className={classes.mobile_container}>
          <Container className={classes.mobile_wrapper}>
            <Typography component="h1" variant="h6">
              Edit Employee
            </Typography>
          </Container>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => editEmployeeHandler(values)}
          >
            <Form autoComplete="off">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    className={classes.mobile_text_field}
                    name="first_name"
                    label="First Name"
                  />
                  <TextField
                    className={classes.mobile_text_field}
                    name="last_name"
                    label="Last Name"
                  />
                  <TextField
                    className={classes.mobile_text_field}
                    name="email"
                    label="Email"
                  />
                  <TextField
                    className={classes.mobile_text_field}
                    name="mobile"
                    label="Mobile"
                  />
                  <TextField
                    className={classes.mobile_text_field}
                    name="landline"
                    label="Landline"
                  />
                  <DateTime
                    className={classes.mobile_text_field}
                    name="join_date"
                    label="Joining Date"
                  />
                  <DateTime
                    className={classes.mobile_text_field}
                    name="date_of_birth"
                    label="Date of Birth"
                  />
                  <Select
                    className={classes.mobile_text_field}
                    name="designation_id"
                    label="Designation"
                    options={designationId}
                  />
                  <Select
                    className={classes.mobile_text_field}
                    label="Status"
                    name="status"
                    options={[
                      { id: "1", name: "Temporary" },
                      { id: "2", name: "Trainee" },
                      { id: "3", name: "Permanent" },
                    ]}
                  />
                  <RadioGender
                    row
                    name="gender"
                    className={classes.mobile_gender}
                  />

                  <TextField
                    className={classes.mobile_text_field}
                    name="present_address"
                    label="Present Address"
                    multiline
                    rows={3}
                  />
                  <div style={{ marginBottom: "1.5rem" }}>
                    <AddressCheckboxField />
                  </div>
                  <TextField
                    className={classes.mobile_text_field}
                    name="permanent_address"
                    label="Permenent Address"
                    multiline
                    rows={3}
                  />
                  <Grid
                    container
                    spacing={2}
                    className={classes.mobile_button_container}
                  >
                    <Grid item>
                      <Button type="submit" color="primary" variant="contained">
                        Submit
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        color="secondary"
                        variant="outlined"
                        component="label"
                        onClick={() => history.push("/employees")}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      )}
    </>
  );
};

export default Edit;

import React, { useState } from "react";
import {
  Container,
  makeStyles,
  Avatar,
  Typography,
  Grid,
  Paper,
  FormControlLabel,
  Button,
  Checkbox,
  useMediaQuery,
} from "@material-ui/core";

import { useHistory, useParams } from "react-router-dom";
import {
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
} from "../../redux/usersApi";
import { toast } from "react-toastify";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../component/FormUI/Textfield";
import RadioGender from "../../component/FormUI/RadioGender";
import Select from "../../component/FormUI/Select";
import DateTime from "../../component/FormUI/DateTimePicker";

const useStyles = makeStyles((theme) => ({
  main_container: {
    margin: theme.spacing(12, 5, 5),
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
  text_field: {
    marginBottom: theme.spacing(4),
  },
  date_container: {
    marginTop: theme.spacing(-2),
    marginBottom: theme.spacing(2),
  },
  date_field: {
    marginBottom: theme.spacing(2),
  },
  button_container: {
    marginLeft: theme.spacing(-1),
  },
  mobile_container: {
    marginTop: theme.spacing(15),
    padding: theme.spacing(1),
  },
  mobile_wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2, 0, 2),
  },
  mobile_avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
  },
  mobile_text_field: {
    marginBottom: theme.spacing(3),
  },
  mobile_date_container: {
    marginTop: theme.spacing(-2),
    marginBottom: theme.spacing(2),
  },
  mobile_date_field: {
    marginTop: theme.spacing(2),
  },
  mobile_gender: {
    marginBottom: theme.spacing(-2),
  },
}));

const EmployeeEdit = () => {
  const classes = useStyles();

  const history = useHistory();
  const params = useParams();

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
      return "Part time";
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

  console.log(INITIAL_FORM_STATE);
  const FORM_VALIDATION = Yup.object().shape({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    present_address: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    permanent_address: Yup.string().required("Required"),
    mobile: Yup.number().required("Required"),
    landline: Yup.number().required("Required"),
    join_date: Yup.date().nullable().required("Required"),
    date_of_birth: Yup.date().nullable().required("Required"),
    designation_id: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
  });

  const [checkBoxAddress, setCheckBoxAddress] = useState(false);

  const checkBoxAddressChange = (e) => {
    setCheckBoxAddress(!checkBoxAddress);
  };

  const [updateEmloyee] = useUpdateEmployeeMutation();

  const editEmployeeHandler = (values) => {
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

    updateEmloyee(object)
      .then((payload) => {
        toast.success("Successfully added...", {
          position: "top-center",
          autoClose: 1000,
        });

        history.push("/employees");
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 1000,
        });
      });
  };

  const EditEmployeeMatches = useMediaQuery("(min-width:640px)");

  return (
    <>
      {EditEmployeeMatches ? (
        <Paper className={classes.main_container}>
          <Container className={classes.wrapper}>
            <Avatar className={classes.avatar}>
              <PersonAddIcon />
            </Avatar>
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
              <Grid container spacing={10}>
                <Grid item xs={6}>
                  <TextField
                    className={classes.text_field}
                    name="first_name"
                    label="First Name"
                  />
                  <TextField
                    className={classes.text_field}
                    name="last_name"
                    label="Last Name"
                  />
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
                  <div className={classes.date_container}>
                    <DateTime
                      className={classes.date_field}
                      fullWidth="true"
                      name="join_date"
                      label="Joing Date"
                    />
                    <DateTime
                      className={classes.date_field}
                      fullWidth="true"
                      name="date_of_birth"
                      label="Date of Birth"
                    />
                  </div>
                  <div>
                    <Grid
                      container
                      spacing={2}
                      className={classes.button_container}
                    >
                      <Grid item>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Submit
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          type="button"
                          color="secondary"
                          variant="outlined"
                          component="label"
                          onClick={() => history.push("/employees")}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <RadioGender row name="gender" />
                  <Select
                    className={classes.text_field}
                    name="designation_id"
                    label="designation"
                    options={[
                      { id: 1, title: "React Developer" },
                      { id: 2, title: "Java Developer" },
                      { id: 3, title: "PHP Developer" },
                    ]}
                  />
                  <Select
                    className={classes.text_field}
                    label="Status"
                    name="status"
                    options={[
                      { id: "1", title: "Temporary" },
                      { id: "2", title: "Part Time" },
                      { id: "3", title: "Permanent" },
                    ]}
                  />

                  <TextField
                    className={classes.text_field}
                    name="present_address"
                    label="Present Address"
                    multiline
                    rows={2}
                  />
                  <div style={{ marginBottom: "25px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkBoxAddress}
                          onChange={checkBoxAddressChange}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Same as present Address"
                    />
                  </div>

                  <TextField
                    className={classes.text_field}
                    name="permanent_address"
                    label="Permenent Address"
                    multiline
                    rows={2}
                    isChecked={checkBoxAddress}
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Paper>
      ) : (
        <Paper className={classes.mobile_container}>
          <Container className={classes.mobile_wrapper}>
            <Avatar className={classes.mobile_avatar}>
              <PersonAddIcon />
            </Avatar>
            <Typography
              style={{ fontSize: "20px" }}
              component="h1"
              variant="h6"
            >
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
                  <div className={classes.mobile_date_container}>
                    <DateTime
                      className={classes.mobile_date_field}
                      fullWidth="true"
                      name="join_date"
                      label="Joing Date"
                    />
                    <DateTime
                      className={classes.mobile_date_field}
                      fullWidth="true"
                      name="date_of_birth"
                      label="Date of Birth"
                    />
                  </div>
                  <Select
                    className={classes.mobile_text_field}
                    name="designation_id"
                    label="designation"
                    options={[
                      { id: 1, title: "React Developer" },
                      { id: 2, title: "Java Developer" },
                      { id: 3, title: "PHP Developer" },
                    ]}
                  />
                  <Select
                    className={classes.mobile_text_field}
                    label="Status"
                    name="status"
                    options={[
                      { id: "1", title: "Temporary" },
                      { id: "2", title: "Part Time" },
                      { id: "3", title: "Permanent" },
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

                  <div style={{ marginBottom: "8px" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkBoxAddress}
                          onChange={checkBoxAddressChange}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Same as present Address"
                    />
                  </div>
                  <TextField
                    className={classes.mobile_text_field}
                    name="permanent_address"
                    label="Permenent Address"
                    multiline
                    rows={3}
                    isChecked={checkBoxAddress}
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
      )}
    </>
  );
};

export default EmployeeEdit;

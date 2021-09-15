import {
  Container,
  Typography,
  makeStyles,
  Grid,
  Button,
  Paper,
  Avatar,
} from "@material-ui/core";

import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../component/FormUI/Textfield";
import RadioGender from "../../component/FormUI/RadioGender";
import Select from "../../component/FormUI/Select";
import FileInput from "../../component/FormUI/FileField";
import DateTime from "../../component/FormUI/DateTimePicker";
import { useCreateEmployeeMutation } from "../../redux/usersApi";
import { toast } from "react-toastify";
import AddressCheckboxField from "../../component/FormUI/AddressCheckboxField";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
    margin: theme.spacing(15, 2, 0),
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

const INITIAL_FORM_STATE = {
  first_name: "",
  last_name: "",
  mobile: null,
  landline: null,
  email: "",
  join_date: null,
  date_of_birth: null,
  status: null,
  gender: null,
  profile_picture: null,
  resume: null,
  present_address: "",
  permanent_address: "",

  designation_id: null,
};
const FORM_VALIDATION = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  present_address: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  permanent_address: Yup.string().required("Required"),
  mobile: Yup.number().required("Required"),
  landline: Yup.number(),
  join_date: Yup.date().nullable().required("Required"),
  date_of_birth: Yup.date().nullable().required("Required"),
  designation_id: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
  profile_picture: Yup.mixed().required("File Required"),
  resume: Yup.mixed().required("File Required"),
});

const AddEmployee = () => {
  const history = useHistory();
  const classes = useStyles();

  const [createEmployee] = useCreateEmployeeMutation();

  const createEmployeeHandler = (values) => {
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append(
      "join_date",
      new Date(values.join_date).toLocaleDateString("zh-Hans-CN")
    );
    formData.append(
      "date_of_birth",
      new Date(values.date_of_birth).toLocaleDateString("zh-Hans-CN")
    );
    formData.append("designation_id", values.designation_id);
    formData.append("gender", values.gender);
    formData.append("status", values.status);
    formData.append("email", values.email);
    formData.append("mobile", values.mobile);
    formData.append("landline", values.landline);
    formData.append("present_address", values.present_address);
    formData.append("permanent_address", values.permanent_address);
    formData.append(
      "profile_picture",
      values.profile_picture,
      values.profile_picture?.name || ""
    );
    formData.append("resume", values.resume, values.resume?.name);

    createEmployee(formData)
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

  const createEmployeeMatches = useMediaQuery("(min-width:640px)");

  return (
    <>
      {createEmployeeMatches ? (
        <Paper className={classes.main_container}>
          <Container className={classes.wrapper}>
            <Avatar className={classes.avatar}>
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h6">
              Create Employee
            </Typography>
          </Container>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => createEmployeeHandler(values)}
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

                  <div>
                    <Grid
                      container
                      spacing={2}
                      className={classes.button_container}
                    >
                      <Grid item>
                        <Button
                          type="submit"
                          color="primary"
                          variant="contained"
                        >
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
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <RadioGender row name="gender" />
                  <FileInput
                    className={classes.text_field}
                    name="profile_picture"
                    label="Profile Picture"
                  />
                  <FileInput
                    className={classes.text_field}
                    name="resume"
                    label="Resume"
                  />
                  <TextField
                    className={classes.text_field}
                    name="present_address"
                    label="Present Address"
                    multiline
                    rows={3}
                  />

                  <div style={{ marginBottom: "8px" }}>
                    <AddressCheckboxField />
                  </div>
                  <TextField
                    className={classes.text_field}
                    name="permanent_address"
                    label="Permenent Address"
                    multiline
                    rows={3}
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
              Create Employee
            </Typography>
          </Container>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={(values) => createEmployeeHandler(values)}
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
                      label="Join Date"
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
                  <FileInput
                    className={classes.mobile_text_field}
                    name="profile_picture"
                    label="Profile Picture"
                  />
                  <FileInput
                    className={classes.mobile_text_field}
                    name="resume"
                    label="Resume"
                  />
                  <TextField
                    className={classes.mobile_text_field}
                    name="present_address"
                    label="Present Address"
                    multiline
                    rows={3}
                  />

                  <div style={{ marginBottom: "8px" }}>
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

export default AddEmployee;

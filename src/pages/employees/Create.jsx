import {
  Container,
  Typography,
  makeStyles,
  Grid,
  Button,
  Paper,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../component/FormUI/Textfield";
import RadioGender from "../../component/FormUI/RadioGender";
import Select from "../../component/FormUI/Select";
import FileInput from "../../component/FormUI/FileField";
import DateTime from "../../component/FormUI/DateTimePicker";
import {
  useCreateEmployeeMutation,
  useGetDesignationsQuery,
} from "../../redux/usersApi";
import { toast } from "react-toastify";
import AddressCheckboxField from "../../component/FormUI/AddressCheckboxField";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

const INITIAL_FORM_STATE = {
  first_name: "",
  last_name: "",
  mobile: null,
  landline: null,
  email: "",
  join_date: null,
  date_of_birth: null,
  status: "",
  gender: null,
  profile_picture: null,
  resume: null,
  present_address: "",
  permanent_address: "",

  designation_id: null,
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
  profile_picture: Yup.mixed().required("Profile picture required"),
  resume: Yup.mixed().required("Resume file required"),
});

const Create = () => {
  const history = useHistory();
  const classes = useStyles();

  const [createEmployee] = useCreateEmployeeMutation();
  const { data } = useGetDesignationsQuery();

  const designationId = data.data;

  const createEmployeeHandler = async (values) => {
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

    console.log(formData);
    try {
      await createEmployee(formData).then((res) => {
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

export default Create;

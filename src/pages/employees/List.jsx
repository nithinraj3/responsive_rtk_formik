import * as React from "react";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { IconButton, LinearProgress, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteEmployeeMutation,
  useGetDesignationsQuery,
  useGetEmployeesQuery,
} from "../../redux/usersApi";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles((theme) => ({
  main_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: theme.spacing(12, 2),
    padding: theme.spacing(3),
  },
  title_wrapper: {
    marginBottom: theme.spacing(3),
  },
  grid_items_left: {
    marginLeft: theme.spacing(0),
  },
  grid_items_right: {
    marginRight: theme.spacing(0),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: theme.spacing(2),
  },
  mobile_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(15, 2),
    padding: theme.spacing(3),
  },
  mobile_title_wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: theme.spacing(2, 0, 2),
  },
  mobile_create_button: {
    marginRight: theme.spacing(0),
  },
}));

function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress />
      </div>
    </GridOverlay>
  );
}

function RowMenuCell(props) {
  const { id } = props;
  const classes = useStyles();
  const history = useHistory();

  const [deleteEmployees] = useDeleteEmployeeMutation();

  const handleEditClick = (id) => {
    history.push(`/employees/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployees(id).then((res) => {
        toast.success("Successfully deleted...", {
          position: "top-center",
          autoClose: 1000,
        });

        history.push(`/employees`);
      });
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className={classes.root}>
      <IconButton
        color="inherit"
        className={classes.textPrimary}
        size="small"
        aria-label="edit"
        onClick={() => handleEditClick(id)}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        aria-label="delete"
        onClick={() => handleDelete(id)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

export default function List() {
  const classes = useStyles();

  const [pageSize, setPageSize] = React.useState(5);
  const { data, isLoading } = useGetEmployeesQuery();
  const { data: dsgnData, isSuccess, isError } = useGetDesignationsQuery();

  let employeeData = data;
  let designationData;

  if (isSuccess) {
    designationData = dsgnData.data;
  }

  if (isError) {
    designationData = [];
    toast.error("Data not Loaded successfully", {
      position: "top-center",
      autoClose: 1000,
    });
  }

  let designationName;
  function designation(dsgnId) {
    for (const dsgn of designationData) {
      if (dsgn.id === dsgnId) {
        designationName = dsgn.name;
      }
    }
    return designationName;
  }

  let rows =
    (data &&
      employeeData.data.map((item, index) => {
        return {
          ...item,
          keys: index + 1,
          id: item.id,
          date_of_birth: new Date(item.date_of_birth).toLocaleDateString(),
          join_date: new Date(item.join_date).toLocaleDateString(),
          designation_id: designation(item.designation_id),
        };
      })) ||
    [];

  const columns = [
    {
      field: "keys",
      headerAlign: "right",
      headerName: "Sl No",
      // flex: 1,
      width: 120,
      align: "right",
    },
    {
      field: "first_name",
      headerName: "First Name",
      // flex: 1,
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      // flex: 1,
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "join_date",
      headerName: "Join Date",
      // flex: 1,
      width: 150,
      type: "date",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "date_of_birth",
      headerName: "Date of Birth",
      // flex: 1,
      width: 180,
      type: "date",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "gender",
      headerName: "Gender",
      // flex: 1,
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "designation_id",
      headerName: "Designation",
      // flex: 1,
      width: 180,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "left",
      // flex: 1,
      width: 200,
      align: "left",
    },
    {
      field: "profile_picture",
      headerName: "Profile Picture",
      // flex: 1,
      width: 180,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "resume",
      headerName: "Resume",
      // flex: 1,
      width: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: RowMenuCell,
      sortable: false,
      // flex: 1,
      width: 100,
      align: "center",
      headerAlign: "center",
      filterable: false,
      disableColumnMenu: true,
      disableReorder: true,
    },
  ];

  const isDesktop = useMediaQuery("(min-width:640px)");

  return (
    <>
      <Paper
        className={
          isDesktop ? classes.main_container : classes.mobile_container
        }
      >
        <Grid
          container
          className={
            isDesktop ? classes.title_wrapper : classes.mobile_title_wrapper
          }
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item className={classes.grid_items_left}>
            <Typography variant="h6" component="h1">
              Employees
            </Typography>
          </Grid>
          <Grid item className={classes.grid_items_right}>
            {isDesktop ? (
              <NavLink
                to="/employees/create"
                className="link"
                style={{ color: "#000" }}
                activeClassName="active"
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  startIcon={<AddIcon />}
                >
                  Create Employee
                </Button>
              </NavLink>
            ) : (
              <NavLink
                to="/employees/create"
                className="link"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeClassName="active"
              >
                <Button
                  color="secondary"
                  variant="outlined"
                  className={classes.mobile_create_button}
                >
                  <PersonAddIcon />
                </Button>
              </NavLink>
            )}
          </Grid>
        </Grid>
        <div style={{ width: "100%" }}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            autoPageSize
            hideFooterSelectedRowCount
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            components={{
              LoadingOverlay: CustomLoadingOverlay,
            }}
            loading={isLoading}
          />
        </div>
      </Paper>
    </>
  );
}

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { GridToolbarContainer } from "@mui/x-data-grid-pro";

import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  Grid,
  LinearProgress,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { NavLink, useHistory } from "react-router-dom";
import { DataGrid, GridOverlay } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  useDeleteDesignationMutation,
  useGetDesignationsQuery,
} from "../../redux/usersApi";
import AddBoxIcon from "@material-ui/icons/AddBox";

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    main_container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      margin: theme.spacing(12, 0, 3),
      padding: theme.spacing(3, 4),
    },
    wrapper: {
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
      margin: theme.spacing(15, 0, 3),
      padding: theme.spacing(1),
    },
    mobile_title_wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: theme.spacing(1, 0, 2),
    },
  }),
  { defaultTheme }
);

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
  const history = useHistory();

  const { id } = props;
  const classes = useStyles();

  const [deleteDesignations] = useDeleteDesignationMutation();

  const handleEditClick = (id) => {
    history.push(`/designations/${id}/edit`);
  };

  const handleDelete = (id) => {
    deleteDesignations(id)
      .then((res) => {
        toast.success("Successfully deleted...", {
          position: "top-center",
          autoClose: 1000,
        });

        history.push(`/designations`);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 1000,
        });
      });
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

RowMenuCell.propTypes = {
  api: PropTypes.object.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default function Designations() {
  const classes = useStyles();
  const { data, isLoading } = useGetDesignationsQuery();
  const [pageSize, setPageSize] = useState(5);

  const designationData = data;

  const rows =
    (data &&
      designationData.data.map((item, index) => {
        return { keys: index + 1, id: item.id, name: item.name };
      })) ||
    [];

  const listDesignationMatches = useMediaQuery("(min-width:640px)");
  const columns = [
    {
      field: "keys",
      align: "center",
      headerAlign: "center",
      headerName: "Sl No",
      flex: listDesignationMatches ? 1 : 0.8,
    },
    {
      field: "name",
      headerName: "Designation name",
      flex: listDesignationMatches ? 4 : 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: RowMenuCell,
      sortable: false,
      flex: listDesignationMatches ? 1 : 0.7,
      headerAlign: "center",
      filterable: false,
      align: "center",
      disableColumnMenu: true,
      disableReorder: true,
    },
  ];

  return (
    <>
      {listDesignationMatches ? (
        <Paper className={classes.main_container}>
          <Grid
            container
            className={classes.wrapper}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item className={classes.grid_items_left}>
              <Typography variant="h6" component="h1">
                Designations List
              </Typography>
            </Grid>
            <Grid item className={classes.grid_items_right}>
              <GridToolbarContainer>
                <NavLink
                  to="/designations/create"
                  className="link"
                  style={{ color: "#000" }}
                  activeClassName="active"
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<AddIcon />}
                  >
                    Create Designation
                  </Button>
                </NavLink>
              </GridToolbarContainer>
            </Grid>
          </Grid>
          <div style={{ width: "100%" }}>
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
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
      ) : (
        <Paper className={classes.mobile_container}>
          <Grid container className={classes.mobile_title_wrapper}>
            <Grid item>
              <Typography variant="h6" component="h1">
                Designations List
              </Typography>
            </Grid>
            <Grid item>
              <GridToolbarContainer>
                <NavLink
                  to="/designations/create"
                  className="link"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  activeClassName="active"
                >
                  <Avatar className={classes.avatar}>
                    <AddBoxIcon />
                  </Avatar>
                </NavLink>
              </GridToolbarContainer>
            </Grid>
          </Grid>
          <div style={{ width: "100%" }}>
            <DataGrid
              autoHeight
              pagination
              rows={rows}
              columns={columns}
              autoPageSize
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
      )}
    </>
  );
}

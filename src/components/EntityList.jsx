import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {Button, Dialog, DialogTitle, Grid, Typography} from "@material-ui/core";
import {
  entityChangeSearch,
  entityListChangeFilterBy,
  setEntityfieldValue,
  setIsEntityFormDialogOpen,
  setIsEntityListDialogOpen,
} from "../actions/ownerPage";
import AcceptCaretakerConfirmation from "./AcceptCaretakerConfirmation";
import FilterSearch from "./FilterSearch";
import {fetchFailed} from "../constants";
import {showSnackBar} from "../actions/loginPage";
import SnackbarAlert from "./SnackbarAlert";
import noDataFoundImage from "../assets/no-data-found.png";
import {getEntities} from "../services/entityService";
import EntityCard from "./EntityCard";
import EntityForm from "./EntityForm";

const filterByOptions = ["Category"];

const styles = (theme) => ({
  header: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  content: {
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  gridContainer: {
    marginTop: theme.spacing(2),
  },
  noDataFound: {
    margin: "25px auto",
  },
  noDataFoundImageContainer: {
    textAlign: "center",
  },
  noDataFoundImage: {
    width: "250px",
  },
  noDataFoundTextContainer: {
    textAlign: "center",
  },
  noDataFoundText: {
    fontSize: "14pt",
  },
  buttonContainer: {
    textAlign: "right",
  },
  button: {
    width: "150px",
    marginRight: theme.spacing(2),
  },
});

function EntityList(props) {
  const {
    classes,
    history,
    selectedFilterBy,
    changeFilterBy,
    searchValue,
    changeSearch,
    isEntityListDialogOpen,
    setIsEntityListDialogOpen,
    setIsEntityFormDialogOpen,
    setEntityfieldValue,
    showSnackBar,
  } = props;
  const [entities, setEntities] = useState([]);
  useEffect(() => {
    if (isEntityListDialogOpen) {
      getEntities()
        .then((entities) => {
          setEntities(entities);
        })
        .catch((status) => {
          if (status === 401) {
            history.push("/");
            window.location.reload();
          }
          showSnackBar(true, fetchFailed, "error");
        });
    }
  }, [isEntityListDialogOpen, history, showSnackBar]);
  const filteredEntities = entities.filter((entity) => {
    const searchRegex = new RegExp(searchValue, "gi");
    if (searchValue === "") {
      return true;
    }
    if (selectedFilterBy === 1) {
      if (searchRegex.test(entity.category.toString())) {
        return true;
      }
    } else if (selectedFilterBy === -1) {
      return true;
    }
    return false;
  });
  function successCallback() {
    getEntities()
      .then((entities) => {
        setEntities(entities);
      })
      .catch((status) => {
        if (status === 401) {
          history.push("/");
          window.location.reload();
        }
        showSnackBar(true, fetchFailed, "error");
      });
  }
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isEntityListDialogOpen}
      onClose={() => setIsEntityListDialogOpen(false, "")}
    >
      <DialogTitle>Pet / Plant</DialogTitle>
      <Grid container className={classes.header}>
        <Grid item xs={12} sm={4} md={7} lg={7}></Grid>
        <Grid item xs={12} sm={8} md={5} lg={5}>
          <FilterSearch
            filterOptions={filterByOptions}
            changeFilterCallback={(value) => changeFilterBy(value)}
            changeSearchQueryCallback={(value) => changeSearch(value)}
          />
        </Grid>
      </Grid>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          className={classes.button}
          color="secondary"
          size="small"
          onClick={() => {
            setEntityfieldValue("category", "");
            setEntityfieldValue("name", "");
            setEntityfieldValue("breed", "");
            setEntityfieldValue("description", "");
            setIsEntityFormDialogOpen(true, true, "");
          }}
        >
          Add Pet/Plant
        </Button>
      </div>
      <div className={classes.content}>
        <Grid container className={classes.gridContainer} spacing={2}>
          {entities.length > 0 ? (
            filteredEntities.length > 0 ? (
              filteredEntities.map((entity, index) => (
                <Grid item xs={12} md={6} lg={6} key={index}>
                  <EntityCard
                    history={history}
                    entity={entity}
                    successCallback={successCallback}
                  />
                </Grid>
              ))
            ) : (
              <div key={"noDataFound"} className={classes.noDataFound}>
                <div className={classes.noDataFoundImageContainer}>
                  <img
                    className={classes.noDataFoundImage}
                    src={noDataFoundImage}
                    alt={"No Data Found"}
                  />
                </div>
                <div className={classes.noDataFoundTextContainer}>
                  <Typography className={classes.noDataFoundText}>
                    There is no offer based on your search.
                  </Typography>
                </div>
              </div>
            )
          ) : (
            <div key={"noDataFound"} className={classes.noDataFound}>
              <div className={classes.noDataFoundImageContainer}>
                <img
                  className={classes.noDataFoundImage}
                  src={noDataFoundImage}
                  alt={"No Data Found"}
                />
              </div>
              <div className={classes.noDataFoundTextContainer}>
                <Typography className={classes.noDataFoundText}>
                  You do not have any pet / plants.
                </Typography>
              </div>
            </div>
          )}
        </Grid>
      </div>
      <EntityForm history={history} successCallback={successCallback} />
      <AcceptCaretakerConfirmation />
      <SnackbarAlert />
    </Dialog>
  );
}

const mapStateToProps = ({
  ownerPage: {isEntityListDialogOpen, entitySelectedFilterBy, entitySearchValue},
}) => ({
  isEntityListDialogOpen,
  selectedFilterBy: entitySelectedFilterBy,
  searchValue: entitySearchValue,
});

const mapDispatchToProps = {
  changeFilterBy: entityListChangeFilterBy,
  changeSearch: entityChangeSearch,
  setIsEntityListDialogOpen: setIsEntityListDialogOpen,
  setIsEntityFormDialogOpen: setIsEntityFormDialogOpen,
  showSnackBar: showSnackBar,
  setEntityfieldValue: setEntityfieldValue,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(EntityList));

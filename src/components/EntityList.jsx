import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {Dialog, Grid, Typography} from "@material-ui/core";
import {
  entityChangeSearch,
  entityListChangeFilterBy,
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

const filterByOptions = ["Category"];

const styles = (theme) => ({
  header: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(2),
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
    showSnackBar,
  } = props;
  const [entities, setEntities] = useState([]);
  useEffect(() => {
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
  }, [history, showSnackBar]);
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isEntityListDialogOpen}
      onClose={() => setIsEntityListDialogOpen(false, "")}
    >
      <Grid container className={classes.header}>
        <Grid item xs={12} sm={4} md={7} lg={7} className={classes.offerNumber}></Grid>
        <Grid item xs={12} sm={8} md={5} lg={5}>
          <FilterSearch
            filterOptions={filterByOptions}
            changeFilterCallback={(value) => changeFilterBy(value)}
            changeSearchQueryCallback={(value) => changeSearch(value)}
          />
        </Grid>
      </Grid>
      <div className={classes.content}>
        <Grid container className={classes.gridContainer} spacing={2}>
          {entities.length > 0 ? (
            entities
              .filter((entity) => {
                const searchRegex = new RegExp(searchValue, "gi");
                if (searchValue === "") {
                  return true;
                }
                if (selectedFilterBy === 1) {
                  if (searchRegex.test(entity.category.toString())) {
                    return true;
                  }
                } else if (selectedFilterBy === "") {
                  return true;
                }
                return false;
              })
              .map((entity, index) => (
                <Grid item xs={12} md={6} lg={6} key={index}>
                  <EntityCard entity={entity} />
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
                  You do not have any pet / plants.
                </Typography>
              </div>
            </div>
          )}
        </Grid>
      </div>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(EntityList));

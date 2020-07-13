import React, {useEffect, useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  setIsEntityFormDialogOpen,
  setIsOfferDialogOpen,
  setOfferFieldValue,
} from "../actions/ownerPage";
import {showSnackBar} from "../actions/loginPage";
import {fetchFailed, requiredFieldsEmpty, saveFailed, saveSuccess} from "../constants";
import {insertOffer} from "../services/offerService";
import {getEntities} from "../services/entityService";
import NoData from "./NoData";
import EntityForm from "./EntityForm";

const styles = (theme) => ({
  textFields: {
    margin: theme.spacing(2),
  },
  content: {
    height: "100%",
    width: "400px",
    minWidth: "400px",
    margin: "0 auto",
  },
  interestedButton: {},
  photoButton: {
    borderRadius: "100%",
    width: "200px",
    height: "200px",
    size: "large",
  },
  categoryGridObject: {
    marginTop: theme.spacing(3),
  },
  titleText: {
    width: "100",
  },
  descriptionText: {
    width: "100",
  },
  iconPetandPlant: {
    width: "30",
    height: "30",
  },
  divTitle: {
    paddingBottom: "0px",
  },
  dialogContent: {
    paddingTop: "0px !important",
  },
  addPetPlantContainer: {
    width: "100%",
    textAlign: "center",
  },
  addPetPlant: {
    margin: `${theme.spacing(1)}px auto`,
  },
  noDataContainer: {
    paddingBottom: theme.spacing(4),
  },
  selectPetPlant: {
    width: "248px",
  },
  addPetPlantButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    padding: "4px 8px",
  },
});

function OfferForm(props) {
  const {
    classes,
    history,
    isOfferDialogOpen,
    setIsOfferDialogOpen,
    offerFields,
    showSnackBar,
    setOfferFieldValue,
    setIsEntityFormDialogOpen,
    successCallback,
  } = props;

  const [entities, setEntities] = useState([]);

  useEffect(() => {
    if (isOfferDialogOpen) {
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
  }, [isOfferDialogOpen, history, showSnackBar]);

  async function handleSave() {
    const emptyField = Object.keys(offerFields).find(
      (keyName) => offerFields[keyName] === ""
    );
    const now = new Date();
    if (emptyField) {
      showSnackBar(true, requiredFieldsEmpty + " " + emptyField, "error");
    } else if (offerFields["endDate"] <= offerFields["startDate"]) {
      showSnackBar(true, "Start time cannot be after End time.", "error");
    } else if (offerFields["description"].length > 15) {
      showSnackBar(true, "Description must be less than 15 characters.", "error");
    } else if (new Date(offerFields["startDate"]) < now) {
      showSnackBar(true, "Start time cannot be before now.", "error");
    } else {
      let offer = {
        entity: offerFields["entity"],
        description: offerFields["description"],
        startDate: offerFields["startDate"],
        endDate: offerFields["endDate"],
        createdDate: new Date(),
        title: offerFields["title"],
      };
      insertOffer(offer)
        .then(() => {
          showSnackBar(true, saveSuccess, "success");
          successCallback();
          setIsOfferDialogOpen(false);
        })
        .catch((status) => {
          if (status === 401) {
            history.push("/");
            window.location.reload();
          }
          showSnackBar(true, saveFailed, "error");
        });
    }
  }
  function handleAddPetPlant() {
    setIsEntityFormDialogOpen(true, true, "");
  }
  function entitySuccessCallback() {
    setIsEntityFormDialogOpen(false);
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
  function handleChangeEntity(event) {
    const value = event.target.value;
    setOfferFieldValue("entity", value);
  }
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isOfferDialogOpen}
      onClose={() => setIsOfferDialogOpen(false)}
    >
      <DialogTitle className={classes.divTitle} id="form-dialog-title">
        New Offer
      </DialogTitle>
      {entities.length > 0 ? (
        <div className={classes.divForm}>
          <form className={classes.form} noValidate>
            <DialogContent className={classes.dialogContent}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.categoryGridObject}
                >
                  <Grid item xs={12} md={3}>
                    <div>Pet/Plant: </div>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <FormControl>
                      <InputLabel id="filter-by-label">Select</InputLabel>
                      <Select
                        labelId="filter-by-label"
                        id="filter-by"
                        color="secondary"
                        value={offerFields["entity"]}
                        className={classes.selectPetPlant}
                        onChange={handleChangeEntity}
                      >
                        {entities.map((entity, index) => (
                          <MenuItem key={index} value={entity._id}>
                            {entity.name} - {entity.category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      onClick={handleAddPetPlant}
                      color="secondary"
                      variant="contained"
                      className={classes.addPetPlantButton}
                    >
                      Add Pet/Plant
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.categoryGridObject}
                >
                  <Grid item xs={12} md={3}>
                    <div>Start Date:</div>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      id="startDate"
                      type="datetime-local"
                      color="secondary"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) => {
                        setOfferFieldValue("startDate", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.categoryGridObject}
                >
                  <Grid item xs={12} md={3}>
                    <div>End Date:</div>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      id="endDate"
                      type="datetime-local"
                      color="secondary"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) => {
                        setOfferFieldValue("endDate", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.categoryGridObject}
                >
                  <Grid item xs={12} md={3}>
                    <div>Title:</div>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Input
                      className={classes.titleText}
                      id="title"
                      placeholder="Title"
                      color="secondary"
                      fullWidth
                      onChange={(event) => {
                        setOfferFieldValue("title", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.categoryGridObject}
                >
                  <Grid item xs={12} md={3}>
                    <div>Description:</div>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      className={classes.descriptionText}
                      id="description"
                      placeholder="Description"
                      color="secondary"
                      fullWidth
                      onChange={(event) => {
                        setOfferFieldValue("description", event.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                className={classes.button}
                onClick={() => setIsOfferDialogOpen(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                className={classes.button}
                onClick={handleSave}
                color="secondary"
                variant="contained"
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </div>
      ) : (
        <div className={classes.noDataContainer}>
          <NoData text={"You do not have any pet / plants to offer."} />
          <div className={classes.addPetPlantContainer}>
            <Button
              className={`${classes.button} ${classes.addPetPlant}`}
              onClick={handleAddPetPlant}
              color="secondary"
              variant="contained"
            >
              Add Pet/Plant
            </Button>
          </div>
        </div>
      )}
      <EntityForm history={history} successCallback={entitySuccessCallback} />
    </Dialog>
  );
}

const mapStateToProps = ({ownerPage: {isOfferDialogOpen, offerId, offerFields}}) => ({
  isOfferDialogOpen,
  offerId,
  offerFields,
});

const mapDispatchToProps = {
  setIsOfferDialogOpen: setIsOfferDialogOpen,
  setOfferFieldValue: setOfferFieldValue,
  showSnackBar: showSnackBar,
  setIsEntityFormDialogOpen: setIsEntityFormDialogOpen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(OfferForm));

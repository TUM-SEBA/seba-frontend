import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  Input,
} from "@material-ui/core";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {setOfferFieldValue, setIsOfferDialogOpen} from "../actions/ownerPage";
import {showSnackBar} from "../actions/loginPage";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import {requiredFieldsEmpty, saveFailed, saveSuccess} from "../constants";
import {insertOffer} from "../services/offerService";
import PetsIcon from "@material-ui/icons/Pets";
import NatureIcon from "@material-ui/icons/Nature";

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
  } = props;

  async function handleSave() {
    const emptyField = Object.keys(offerFields).find(
      (keyName) => offerFields[keyName] === ""
    );

    if (emptyField) {
      showSnackBar(true, requiredFieldsEmpty + " " + emptyField, "error");
    } else if (offerFields["endDate"] <= offerFields["startDate"]) {
      showSnackBar(true, "Start time cannot be after End time.", "error");
    } else {
      let offer = {
        owner: localStorage["id"],
        description: offerFields["description"],
        startDate: offerFields["startDate"],
        endDate: offerFields["endDate"],
        createdDate: new Date(),
        title: offerFields["title"],
      };
      insertOffer(offer)
        .then(() => {
          showSnackBar(true, saveSuccess, "success");
          setIsOfferDialogOpen(false);
          // successCallback();
          console.log("Offer is submitted");
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

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isOfferDialogOpen}
      onClose={() => setIsOfferDialogOpen(true)}
    >
      <DialogTitle className={classes.divTitle} id="form-dialog-title">
        New Offer
      </DialogTitle>
      <div className={classes.divForm}>
        <form className={classes.form} noValidate>
          <DialogContent className={classes.dialogContent}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={5}>
                <div align="center">Category</div>
                <div align="center" className={classes.categoryGridObject}>
                  <ToggleButtonGroup
                    value={offerFields["category"]}
                    exclusive
                    onChange={(event, value) => {
                      setOfferFieldValue("category", value);
                    }}
                    size="large"
                  >
                    <ToggleButton value="Pet">
                      <PetsIcon />
                    </ToggleButton>
                    <ToggleButton value="Plant">
                      <NatureIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div align="center" className={classes.categoryGridObject}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.photoButton}
                  >
                    <PhotoCameraIcon />
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12} md={7}>
                <Grid container direction="row" justify="center" alignItems="center">
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
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(event) => {
                          setOfferFieldValue("startDate", event.target.value);
                          console.log("StartDate Changed");
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
                        rows={8}
                        variant="filled"
                        fullWidth
                        multiline
                        onChange={(event) => {
                          setOfferFieldValue("description", event.target.value);
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
                      <div>Upload Files:</div>
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Button variant="contained" color="primary">
                        Browse
                      </Button>
                    </Grid>
                  </Grid>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(OfferForm));

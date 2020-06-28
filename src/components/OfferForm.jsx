import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  ButtonGroup,
  Grid,
  Input,
} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {setOfferFieldValue, setIsOfferDialogOpen} from "../actions/ownerPage";
import {showSnackBar} from "../actions/loginPage";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import {requiredFieldsEmpty, saveFailed, saveSuccess} from "../constants";
import {insertOffer} from "../services/offerService";

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
  button: {},
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
      showSnackBar(true, requiredFieldsEmpty, "error");
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
      <DialogTitle id="form-dialog-title">Offer</DialogTitle>
      <form className={classes.form} noValidate>
        <DialogContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <div>Select Category:</div>
              <div align="center" className={classes.categoryGridObject}>
                <ButtonGroup
                  color="secondary"
                  aria-label="outlined secondary button group"
                  id="category"
                  onChange={(event) => {
                    setOfferFieldValue("category", event.target.value);
                  }}
                >
                  <Button>Pets</Button>
                  <Button>Plants</Button>
                </ButtonGroup>
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

            <Grid item xs={12} md={6}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.categoryGridObject}
                >
                  <Grid item xs={12} md={6}>
                    <div>Start Date:</div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="startDate"
                      type="datetime-local"
                      defaultValue="2020-01-01T12:30"
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
                  <Grid item xs={12} md={6}>
                    <div>End Date:</div>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="endDate"
                      type="datetime-local"
                      defaultValue="2020-01-01T12:30"
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
                  <Grid item xs={12} md={6}>
                    <div>Title:</div>
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
                    <div>Description:</div>
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
                    <div>Upload Files:</div>
                  </Grid>
                  <Grid item xs={12} md={6}>
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

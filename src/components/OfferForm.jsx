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
} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {setOfferFieldValue, setIsOfferDialogOpen} from "../actions/ownerPage";
import {showSnackBar} from "../actions/loginPage";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";

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
  descriptionText: {
    width: "100",
  },
});

const FieldType = {
  TEXT_FIELD: 0,
  TEXT_AREA: 1,
};

// TODO
const keyMap = {};

// TODO has to be attached to the backend.
function OfferForm(props) {
  const {classes, isOfferDialogOpen, setIsOfferDialogOpen} = props;

  const [imageShow, setImageShow] = React.useState(0);

  // TODO: change this when backend is connected
  // TODO: handle submit button
  async function handleSave() {
    console.log("Offer is submitted");
  }

  function handleNavigateBefore() {
    if (imageShow > 0) {
      setImageShow(imageShow - 1);
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
                      id="startDateInputField"
                      type="datetime-local"
                      defaultValue="2020-01-01T12:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
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
                      id="endDateInputField"
                      type="datetime-local"
                      defaultValue="2020-01-01T12:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
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
                      id="filled-multiline-static"
                      rows={8}
                      variant="filled"
                      fullWidth
                      multiline
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

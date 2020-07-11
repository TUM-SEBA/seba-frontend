import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import {withStyles} from "@material-ui/styles";
import {setFeedbackFieldValue, setIsViewFeedbackDialogOpen} from "../actions/ownerPage";
import {requiredFieldsEmpty, saveFailed, saveSuccess} from "../constants";
import {showSnackBar} from "../actions/loginPage";
import {insertReview} from "../services/reviewService";
import {closeOffer} from "../services/offerService";

const styles = (theme) => ({
  textFields: {
    margin: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
  },
  navigationButton: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
  },
  imageSlider: {
    marginTop: "25px",
  },
  typographyRating: {
    paddingRight: "15px",
  },
  typographyDescription: {
    paddingTop: "16px",
  },
  rightGrid: {
    flex: 1,
    marginLeft: "32px",
  },
});

function FeedbackForm(props) {
  const {
    history,
    classes,
    offerId,
    isViewFeedbackDialogOpen,
    feedbackFields,
    setIsViewFeedbackDialogOpen,
    setFeedbackFieldValue,
    showSnackBar,
    feedbackCaretaker,
  } = props;

  function handleSubmitButton() {
    const emptyField = Object.keys(feedbackFields).find(
      (keyName) => feedbackFields[keyName] === ""
    );
    if (emptyField) {
      showSnackBar(true, requiredFieldsEmpty, "error");
    } else {
      let review = {
        offer: offerId,
        caretaker: feedbackCaretaker.id,
        text: feedbackFields["description"],
        rating: feedbackFields["rating"],
      };
      insertReview(review)
        .then(() => {
          showSnackBar(true, saveSuccess, "success");
          setIsViewFeedbackDialogOpen(false);
          closeOffer(offerId).then(window.location.reload());
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
      open={isViewFeedbackDialogOpen}
      onClose={() => setIsViewFeedbackDialogOpen(false)}
    >
      <DialogTitle id="view-badges" disableTypography={true}>
        <Typography variant="h5">Send Feedback</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <Typography className={classes.typographyRating}>Give Rating:</Typography>
          <Rating
            name="size-large"
            defaultValue={3}
            size="large"
            onClick={(event) => {
              if (event.target.value) {
                setFeedbackFieldValue("rating", event.target.value);
              }
            }}
          />
        </Grid>

        <Grid container direction="column" justify="flex-start" alignItems="flex-start">
          <Typography className={classes.typographyDescription}>Description:</Typography>
          <div className={classes.textFields}>
            <TextField
              fullWidth
              required={true}
              variant="outlined"
              multiline={true}
              rows={8}
              color="secondary"
              onChange={(event) => {
                setFeedbackFieldValue("description", event.target.value);
              }}
            />
          </div>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          onClick={() => {
            setIsViewFeedbackDialogOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button color="secondary" variant="contained" onClick={handleSubmitButton}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({
  ownerPage: {isViewFeedbackDialogOpen, offerId, feedbackFields, feedbackCaretaker},
}) => {
  return {
    isViewFeedbackDialogOpen,
    offerId,
    feedbackFields,
    feedbackCaretaker,
  };
};

const mapDispatchToProps = {
  setIsViewFeedbackDialogOpen: setIsViewFeedbackDialogOpen,
  setFeedbackFieldValue: setFeedbackFieldValue,
  showSnackBar: showSnackBar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(FeedbackForm));

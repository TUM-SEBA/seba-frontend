import React from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogActions,
  DialogContent,
  CardContent,
  IconButton,
  TextField,
  Button,
  Avatar,
  Paper,
} from "@material-ui/core";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import caretakerImage from "../assets/caretaker.png";
import {NavigateBefore, NavigateNext} from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import {withStyles} from "@material-ui/styles";
import {setFeedbackFieldValue, setIsViewFeedbackDialogOpen} from "../actions/ownerPage";
import {requiredFieldsEmpty, saveFailed, saveSuccess} from "../constants";
import {showSnackBar} from "../actions/loginPage";
import {insertReview} from "../services/reviewService";
import {closeOffer} from "../services/offerService";

const styles = (theme) => ({
  caretakerImage: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  petImageContainer: {
    position: "relative",
    width: "240px",
    height: theme.spacing(10),
    overflow: "hidden",
  },
  petImage: {
    position: "absolute",
    width: "60px",
    transition: "all 500ms",
  },
  textCaretaker: {
    width: theme.spacing(25),
    textAlign: "center",
    paddingTop: "16px",
  },
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

const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);

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

  // TODO: remove this when backend is connected
  const dummyOffer = {
    image:
      "https://start-cons.com/wp-content/uploads/2019/03/person-dummy-e1553259379744.jpg",
    length: 10,
  };

  function handleNavigateBefore() {
    if (imageShow > 0) {
      setImageShow(imageShow - 1);
    }
  }
  function handleNavigateNext() {
    if (imageShow < dummyOffer.length - 3) {
      setImageShow(imageShow + 1);
    }
  }

  const [imageShow, setImageShow] = React.useState(0);

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
        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
          <Grid>
            <Paper elevation={4}>
              <CardContent>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="center"
                >
                  <div>
                    <Avatar src={caretakerImage} className={classes.caretakerImage} />
                    <Typography className={classes.textCaretaker}>
                      {feedbackCaretaker.username}
                    </Typography>
                  </div>

                  <Grid className={classes.imageSlider} container direction="row">
                    <IconButton
                      onClick={() => handleNavigateBefore()}
                      className={classes.navigationButton}
                    >
                      <NavigateBefore />
                    </IconButton>

                    <div className={classes.petImageContainer}>
                      {Array.from(Array(dummyOffer.length).keys()).map((index) => (
                        <img
                          key={index}
                          className={classes.petImage}
                          src={dummyOffer.image}
                          alt={"Pet"}
                          style={{left: `${(index - imageShow) * 90}px`}}
                        />
                      ))}
                    </div>

                    <IconButton
                      onClick={() => handleNavigateNext()}
                      className={classes.navigationButton}
                    >
                      <NavigateNext />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Paper>
          </Grid>
          <Grid className={classes.rightGrid}>
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

            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Typography className={classes.typographyDescription}>
                Description:
              </Typography>
              <div className={classes.textFields}>
                <CustomTextField
                  fullWidth
                  required={true}
                  variant="outlined"
                  multiline={true}
                  rows={8}
                  onChange={(event) => {
                    setFeedbackFieldValue("description", event.target.value);
                  }}
                />
              </div>
            </Grid>
          </Grid>
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

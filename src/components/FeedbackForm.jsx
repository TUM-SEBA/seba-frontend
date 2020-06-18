import React from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogActions,
  DialogContent,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
  Avatar,
  Paper,
} from "@material-ui/core";
import {setIsViewFeedbackDialogOpen} from "../actions/welcomePage";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import caretakerImage from "../assets/caretaker.png";
import {NavigateBefore, NavigateNext} from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import {withStyles} from "@material-ui/styles";

function FeedbackForm(props) {
  const {isViewFeedbackDialogOpen, setIsViewFeedbackDialogOpen} = props;

  const useStyles = makeStyles((theme) => ({
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
    },
    navigationButton: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      margin: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    },
    imageSlider: {
      marginTop: "25px",
    },
  }));

  const classes = useStyles();

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
        <Grid container direction="row" justify="center" spacing={5} alignItems="center">
          <Grid item>
            <Paper elevation={4}>
              <CardContent>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <div>
                    <Avatar src={caretakerImage} className={classes.caretakerImage} />
                    <Typography className={classes.textCaretaker}>
                      Dummy Caretaker Name
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
          <Grid item>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Typography>Give Rating:</Typography>
              <Rating name="size-large" defaultValue={2} size="large" />
            </Grid>

            <Grid container direction="row" justify="space-between" alignItems="center">
              <Typography>Description:</Typography>
              <div className={classes.textFields}>
                <CustomTextField
                  fullWidth
                  required={true}
                  variant="outlined"
                  multiline={true}
                  rows={10}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="secondary">Cancel</Button>
        <Button color="secondary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({welcomePage: {isViewFeedbackDialogOpen}}) => ({
  isViewFeedbackDialogOpen,
});

const mapDispatchToProps = {
  setIsViewFeedbackDialogOpen: setIsViewFeedbackDialogOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm);

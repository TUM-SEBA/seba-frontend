import React, {useEffect, useState} from "react";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {setIsReviewDialogOpen} from "../actions/welcomePage";
import {
  getReviewsByMyCaretakerId,
  getReviewsByCaretakerId,
} from "../services/reviewService";
import {fetchFailed} from "../constants";
import {isAuthenticated} from "../services/loginService";
import {showSnackBar} from "../actions/loginPage";
import Rating from "@material-ui/lab/Rating";

const styles = (theme) => ({
  displayUs: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: theme.spacing(1),
  },
  gridContainerPerson: {},
  gridContainerDialog: {},
  nameText: {},
  photo: {
    height: "250px",
    width: "200px",
  },
  reviewCardId: {},
  reviewCardContent: {},
  reviewCardDiv: {
    padding: "5px",
  },
  reviewCardText: {
    width: "500px",
  },
});

/**
 * Shows the reviews of the user
 * @param props
 * @returns {*}
 * @constructor
 */
function Review(props) {
  const {
    classes,
    history,
    isReviewDialogOpen,
    setIsReviewDialogOpen,
    userIdReview,
  } = props;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    function getReviews() {
      getReviewsByMyCaretakerId()
        .then((response) => {
          setReviews(response);
        })
        .catch((_) => {
          showSnackBar(true, fetchFailed, "error loading reviews");
        });
    }

    function getReviewsFromId(userId) {
      getReviewsByCaretakerId(userId)
        .then((response) => {
          setReviews(response);
        })
        .catch((_) => {
          showSnackBar(true, fetchFailed, "error loading reviews");
        });
    }

    if (!isAuthenticated()) {
      history.push("/");
      window.location.reload();
    }
    if (userIdReview != null && userIdReview !== "") {
      getReviewsFromId(userIdReview);
    } else {
      getReviews();
    }
  }, [history, userIdReview]);

  function getGridReviewItem(index, review) {
    return (
      <div className={classes.reviewCardDiv} key={index}>
        <Card variant="outlined">
          <CardContent className={classes.reviewCardContent}>
            <div className={classes.reviewCardId}>{review.offer.owner.username}</div>
            <div className={classes.reviewCardRating}>
              <Rating name="read-only" value={parseInt(review.rating, 10)} readOnly />
            </div>
            <div className={classes.reviewCardText}>{review.text}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Dialog open={isReviewDialogOpen} onClose={() => setIsReviewDialogOpen(false, "")}>
      <DialogTitle id="show-reviews" disableTypography={true}>
        <Typography variant="h5">Reviews</Typography>
      </DialogTitle>
      <DialogContent>
        <div className={classes.displayUs}>
          {reviews.length === 0 ? (
            <div className={classes.gridContainerDialog}>
              <Typography variant="h6">No reviews found for the user.</Typography>
            </div>
          ) : (
            <div className={classes.gridContainerDialog}>
              {reviews
                .filter((review) => {
                  return true;
                })
                .map((review, index) => getGridReviewItem(index, review))}
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsReviewDialogOpen(false, "")} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({welcomePage: {isReviewDialogOpen, userIdReview}}) => ({
  isReviewDialogOpen,
  userIdReview,
});

const mapDispatchToProps = {
  setIsReviewDialogOpen: setIsReviewDialogOpen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(Review));

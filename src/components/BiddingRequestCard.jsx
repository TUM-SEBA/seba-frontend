/**
 * BiddingRequestCard: Card which displays information about specific bidding request.
 */

import React from "react";
import {withStyles} from "@material-ui/styles";
import {Button, Card, CardActions, Grid} from "@material-ui/core";
import {setIsReviewDialogOpen} from "../actions/welcomePage";
import {connect} from "react-redux";
import Rating from "@material-ui/lab/Rating/Rating";

const styles = (theme) => {
  return {
    gridItem: {
      padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    line: {
      margin: `${theme.spacing(1)}px 0`,
    },
    username: {
      margin: `${theme.spacing(1)}px 0`,
      overflowWrap: "break-word",
    },
    biddingRequestImage: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      borderRadius: "100%",
    },
    button: {
      width: "100%",
    },
    reviewButton: {
      width: "100%",
      backgroundColor: "darkgrey",
    },
    buttonContainer: {
      margin: `${theme.spacing(1)}px 0`,
    },
  };
};

function calculateAvg(biddingRequest) {
  if (biddingRequest.caretaker.feedbacksGiven > 0) {
    return (
      biddingRequest.caretaker.starsRecieved / biddingRequest.caretaker.feedbacksGiven
    );
  } else {
    return 0;
  }
}

function BiddingRequestCard(props) {
  const {
    classes,
    biddingRequest,
    offer,
    acceptCallback,
    rejectCallback,
    setIsReviewDialogOpen,
  } = props;
  return (
    <Card variant="outlined" className={classes.gridItem}>
      <div className={classes.line}>Caretaker: @{biddingRequest.caretaker.name}</div>
      <div className={classes.line}>Bidding Price: {biddingRequest.price}</div>
      <div className={classes.line}>Remarks: {biddingRequest.remarks}</div>
      <div className={classes.line}>
        <Rating name="read-only" value={calculateAvg(biddingRequest)} readOnly />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          onClick={() => setIsReviewDialogOpen(true, biddingRequest.caretaker._id)}
          className={classes.reviewButton}
        >
          Reviews
        </Button>
      </div>
      {offer.status === "Not Assigned" && (
        <CardActions>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={4} md={5} lg={6}>
              <Button
                variant="contained"
                className={classes.button}
                color="secondary"
                size="small"
                onClick={() => acceptCallback()}
              >
                Accept
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={5} lg={6}>
              <Button
                variant="contained"
                className={classes.button}
                color="secondary"
                size="small"
                onClick={() => rejectCallback()}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      )}
    </Card>
  );
}

const mapStateToProps = ({welcomePage: {setIsReviewDialogOpen}}) => ({
  setIsReviewDialogOpen,
});

const mapDispatchToProps = {
  setIsReviewDialogOpen: setIsReviewDialogOpen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(BiddingRequestCard));

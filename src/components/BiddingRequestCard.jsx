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
    buttonContainer: {
      margin: `${theme.spacing(1)}px 0`,
    },
    rowFlexRating: {
      margin: `${theme.spacing(1)}px 0`,
      display: "flex",
      alignItems: "center",
    },
    ratingTextLink: {
      textDecoration: "underline",
      color: "blue",
      cursor: "pointer",
      paddingLeft: "10px",
    },
    remarkDiv: {
      overflow: "auto",
      height: "68px",
      wordBreak: "break-all",
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
      <div className={classes.rowFlexRating}>
        <Rating name="read-only" value={calculateAvg(biddingRequest)} readOnly />
        <span
          className={classes.ratingTextLink}
          onClick={() => setIsReviewDialogOpen(true, biddingRequest.caretaker._id)}
        >
          Total Stars: {biddingRequest.caretaker.starsRecieved}
        </span>
      </div>
      <div className={classes.line}>Bidding Price: {biddingRequest.price} €</div>
      <div className={classes.remarkDiv}>Remarks: {biddingRequest.remarks}</div>
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

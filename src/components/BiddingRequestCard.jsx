import React from "react";
import {withStyles} from "@material-ui/styles";
import {Button, Card, CardActions, Grid} from "@material-ui/core";

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
  };
};

function BiddingRequestCard(props) {
  const {classes, biddingRequest, offer, acceptCallback, rejectCallback} = props;
  return (
    <Card variant="outlined" className={classes.gridItem}>
      <div className={classes.line}>Caretaker: @{biddingRequest.caretaker.username}</div>
      <div className={classes.line}>Bidding Price: {biddingRequest.price}</div>
      <div className={classes.line}>Remarks: {biddingRequest.remarks}</div>
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

export default withStyles(styles, {withTheme: true})(BiddingRequestCard);

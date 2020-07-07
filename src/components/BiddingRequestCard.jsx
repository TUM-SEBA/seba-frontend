import React from "react";
import {withStyles} from "@material-ui/styles";
import {Button, Card, CardActions, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const dummyBiddingRequest = {
  image:
    "https://start-cons.com/wp-content/uploads/2019/03/person-dummy-e1553259379744.jpg",
};

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
    remarks: {
      margin: `${theme.spacing(1)}px 0`,
      height: theme.spacing(20),
      overflowY: "scroll",
      textAlign: "justify",
    },
    biddingRequestImage: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      borderRadius: "100%",
    },
    acceptButton: {
      width: "100%",
    },
  };
};

function BiddingRequestCard(props) {
  const {classes, biddingRequest, acceptCallback} = props;

  return (
    <Card variant="outlined" className={classes.gridItem}>
      <Grid container>
        <Grid item xs={5}>
          <div>
            <img
              className={classes.biddingRequestImage}
              src={dummyBiddingRequest.image}
              alt={"Caretaker"}
            />
          </div>
          <Typography
            className={classes.username}
            gutterBottom
            variant="body1"
            component="p"
          >
            @{biddingRequest.caretaker.username}
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <div className={classes.line}>Bidding Price: {biddingRequest.price}</div>
          <div className={classes.line}>Remarks:</div>
          <div className={classes.remarks}>{biddingRequest.remarks}</div>
          <CardActions>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4} md={5} lg={6}>
                <Button
                  variant="contained"
                  className={classes.acceptButton}
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
                  className={classes.acceptButton}
                  color="secondary"
                  size="small"
                >
                  Reject
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}

export default withStyles(styles, {withTheme: true})(BiddingRequestCard);

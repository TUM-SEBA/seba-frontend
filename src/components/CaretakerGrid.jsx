import React from "react";
import {withStyles} from "@material-ui/styles";
import {Button, Card, CardActions, CardContent, Grid} from "@material-ui/core";

const styles = (theme) => ({
  offerImage: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: "100%",
  },
  offerCardId: {
    textAlign: "right",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px 0 0`,
    color: "rgba(0, 0, 0, 0.4)",
    fontSize: "10pt",
  },
  offerCardContent: {
    height: theme.spacing(12),
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(3),
  },
  offerCardDescription: {
    marginLeft: theme.spacing(3),
    textAlign: "justify",
    fontSize: "10pt",
    overflow: "scroll",
  },
  offerCardActions: {
    justifyContent: "flex-end",
  },
  button: {
    width: "100%",
  },
});

function CaretakerGrid(props) {
  const {classes, offer, interestedCallback} = props;

  return (
    <Grid item xs={12} md={6} lg={4} key={offer._id}>
      <Card variant="outlined">
        <div className={classes.offerCardId}>{offer._id}</div>
        <CardContent className={classes.offerCardContent}>
          <div>
            <img className={classes.offerImage} src={offer.image} alt={"Pet"} />
          </div>
          <div className={classes.offerCardDescription}>{offer.description}</div>
        </CardContent>
        <CardActions className={classes.offerCardActions}>
          <Grid container spacing={1}>
            <Grid item xs={"auto"} sm={5} md={3} lg={2} />
            <Grid item xs={12} sm={3} md={4} lg={4}>
              <Button
                variant="contained"
                className={classes.button}
                color="secondary"
                size="small"
                onClick={() => interestedCallback()}
              >
                Interested
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={5} lg={6}>
              <Button
                variant="contained"
                className={classes.button}
                color="secondary"
                size="small"
              >
                Not Interested
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default withStyles(styles, {withTheme: true})(CaretakerGrid);

import React from "react";
import {withStyles} from "@material-ui/styles";
import {Button, Card, CardActions, CardContent, CardMedia, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {publicURL} from "../constants";

const styles = (theme) => {
  return {
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
      padding: 0,
    },
    offerCardTitle: {
      margin: `${theme.spacing(1)}px 0`,
    },
    offerCardDescription: {
      height: theme.spacing(10),
      overflow: "scroll",
      margin: `${theme.spacing(1)}px 0`,
      textAlign: "justify",
    },
    offerCardActions: {
      justifyContent: "flex-end",
    },
    primaryButton: {
      width: "100%",
      fontSize: "9pt",
      fontWeight: "bold",
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      "&:hover": {
        background: theme.palette.secondary.main,
      },
    },
    secondaryButton: {
      width: "100%",
      fontSize: "9pt",
      fontWeight: "bold",
      background: theme.palette.secondary.contrastText,
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      "&:hover": {
        background: theme.palette.secondary.contrastText,
      },
    },
    username: {
      marginTop: theme.spacing(1),
    },
    status: {
      marginTop: theme.spacing(1),
    },
    media: {
      height: theme.spacing(20),
      objectFit: "cover",
    },
    offerCardTextContent: {
      padding: `0 ${theme.spacing(2)}px`,
    },
  };
};

function CaretakerCard(props) {
  const {classes, offer, interestedCallback, notInterestedCallback, tab} = props;
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }
  let status = "";
  if (offer.status === "Not Assigned") {
    status = "Not assigned yet";
  } else if (offer.status === "Assigned") {
    if (offer.owner.username === localStorage["username"]) {
      status = "The offer has been assigned to you.";
    } else {
      status = "The offer has been assigned to other caretaker.";
    }
  }
  const endDate = new Date(offer.endDate);
  const today = new Date();
  const shown = today > endDate;
  return (
    <Card variant="outlined">
      {/*<div className={classes.offerCardId}>{offer._id}</div>*/}
      <CardContent className={classes.offerCardContent}>
        <CardMedia
          className={classes.media}
          image={`${publicURL}/${offer.entity.images[0]}`}
          title="Contemplative Reptile"
        />
        <div className={classes.offerCardTextContent}>
          <Typography
            className={classes.offerCardTitle}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {offer.title}
          </Typography>
          <Typography
            className={classes.username}
            gutterBottom
            variant="body1"
            component="p"
          >
            by @{offer.owner.username}
          </Typography>
          <Typography
            className={classes.offerDurationDates}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            Dates: {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
          </Typography>
          <Typography
            className={classes.status}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            Status: {status}
          </Typography>
          <Typography
            className={classes.offerCardDescription}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {offer.description}
          </Typography>
        </div>
      </CardContent>
      {tab === 0 && (
        <CardActions className={classes.offerCardActions}>
          <Grid container spacing={1}>
            <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} />
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Button
                variant="contained"
                className={classes.primaryButton}
                size="small"
                onClick={() => interestedCallback()}
              >
                Interested
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7}>
              <Button
                variant="contained"
                className={classes.secondaryButton}
                size="small"
                onClick={() => notInterestedCallback()}
              >
                Not Interested
              </Button>
            </Grid>
            <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} />
          </Grid>
        </CardActions>
      )}

      {tab === 1 && shown && (
        <CardActions className={classes.offerCardActions}>
          <Grid container spacing={1}>
            <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} />
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Button variant="contained" className={classes.primaryButton} size="small">
                Complete
              </Button>
            </Grid>
            <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} />
          </Grid>
        </CardActions>
      )}
    </Card>
  );
}

export default withStyles(styles, {withTheme: true})(CaretakerCard);

import React from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {Button, Card, CardActions, CardContent, CardMedia, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {publicURL} from "../constants";
import {caretakingCompleted} from "../services/offerService";
import {showSnackBar} from "../actions/loginPage";

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
      overflow: "auto",
      margin: `${theme.spacing(1)}px 0`,
      textAlign: "justify",
      wordBreak: "break-all",
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
  const {classes, offer, interestedCallback, notInterestedCallback, tab, history} = props;

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
  } else if (offer.status === "Payment Pending") {
    status = "Payment by owner is pending";
  } else if (offer.status === "Completed") {
    status = "Feedback by owner is pending";
  } else {
    status = offer.status;
  }

  let showCompletedButton = false;
  const endDate = new Date(offer.endDate);
  const today = new Date();
  if (today >= endDate && offer.status === "Assigned") showCompletedButton = true;

  return (
    <Card variant="outlined">
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

      {tab === 2 && showCompletedButton && (
        <CardActions className={classes.offerCardActions}>
          <Grid container spacing={1}>
            <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} />
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Button
                variant="contained"
                className={classes.primaryButton}
                size="small"
                onClick={() => {
                  caretakingCompleted(offer._id)
                    .then(() => {
                      showSnackBar(true, "Caretaker Task Completed", "success");
                      showCompletedButton = false;
                      window.location.reload();
                    })
                    .catch((status) => {
                      if (status === 401) {
                        history.push("/");
                        window.location.reload();
                      }
                      showSnackBar(true, "Save Failed", "error");
                    });
                }}
              >
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

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  showSnackBar: showSnackBar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(CaretakerCard));

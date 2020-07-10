import React from "react";
import {
  Card,
  CardContent,
  Button,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  setIsViewFeedbackDialogOpen,
  setCaretakerForFeedback,
  setIsBiddingRequestDialogOpen,
} from "../actions/ownerPage";
import {withStyles} from "@material-ui/styles";
import {connect} from "react-redux";
import {publicURL} from "../constants";
import {showSnackBar} from "../actions/loginPage";
import PaypalButton from "./PaypalButton";
import {postPaymentCompleted} from "../services/offerService";
import {getCaretakerFromBiddingRequest} from "../services/biddingRequestService";

const styles = (theme) => ({
  root: {
    maxWidth: 400,
    minHeight: 262,
  },
  divActionArea: {
    minHeight: 262,
  },
  media: {
    height: theme.spacing(20),
    objectFit: "cover",
  },
  divCardContentText: {
    minHeight: "90px",
  },
  offerCardDescription: {
    overflowY: "auto",
  },
  offerDurationDates: {
    color: "black",
  },
  interestedButton: {
    width: "100%",
  },
});

function OwnerItemCard(props) {
  const {
    index,
    offer,
    classes,
    history,
    setIsViewFeedbackDialogOpen,
    setCaretakerForFeedback,
    setIsBiddingRequestDialogOpen,
  } = props;
  const paymentDetails = {
    price: offer.approvedPrice * 0.8,
    description: offer.description,
    currency: "EUR",
  };

  function handleCardClick(offerId) {
    setIsBiddingRequestDialogOpen(true, offerId);
  }

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }

  function handlePostPaymentCompleted() {
    postPaymentCompleted(offer._id)
      .then(async () => {
        showSnackBar(true, "Payment Successful", "success");
        await getCaretakerFromBiddingRequest(offer.approveBiddingRequestId).then(
          (caretaker) => {
            setCaretakerForFeedback(caretaker);
          }
        );
        setIsViewFeedbackDialogOpen(true, offer._id);
      })
      .catch((status) => {
        if (status === 401) {
          history.push("/");
          window.location.reload();
        }
        showSnackBar(true, "Internal Server error", "error");
      });
  }

  return (
    <Grid item xs={12} md={6} lg={3} key={index}>
      <Card className={classes.root} variant="outlined">
        <CardActionArea
          className={classes.divActionArea}
          onClick={() => handleCardClick(offer._id)}
        >
          <CardMedia
            className={classes.media}
            image={`${publicURL}/${offer.entity.images[0]}`}
            title="Contemplative Reptile"
          />

          <CardContent className={classes.divCardContentText}>
            <Typography
              className={classes.offerCardTitle}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {offer.title}
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
              className={classes.offerCardDescription}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {offer.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        {offer.status === "Payment Pending" && (
          <CardActions>
            <PaypalButton
              paymentDetails={paymentDetails}
              handlePaymentCompleted={handlePostPaymentCompleted}
            />
          </CardActions>
        )}
        {offer.status === "Completed" && (
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              className={classes.interestedButton}
              onClick={async () => {
                await getCaretakerFromBiddingRequest(offer.approveBiddingRequestId).then(
                  (caretaker) => {
                    setCaretakerForFeedback(caretaker);
                  }
                );
                setIsViewFeedbackDialogOpen(true, offer._id);
              }}
            >
              Give Feedback
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}

const mapStateToProps = ({ownerPage: {selectedFilterBy, searchValue}}) => ({
  selectedFilterBy,
  searchValue,
});

const mapDispatchToProps = {
  showSnackBar: showSnackBar,
  setIsViewFeedbackDialogOpen: setIsViewFeedbackDialogOpen,
  setCaretakerForFeedback: setCaretakerForFeedback,
  setIsBiddingRequestDialogOpen: setIsBiddingRequestDialogOpen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(OwnerItemCard));

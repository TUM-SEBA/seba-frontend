/**
 * AcceptCaretakerConfirmation: Confirmation dialog when accepting bidding request.
 */

import React, {useState} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  setIsAcceptCaretakerConfirmationDialogOpen,
  setIsBiddingRequestDialogOpen,
} from "../actions/ownerPage";
import {Button, Checkbox, Dialog, FormControlLabel, Grid} from "@material-ui/core";
import {saveFailed, saveSuccess} from "../constants";
import {showSnackBar} from "../actions/loginPage";
import {acceptOffer} from "../services/offerService";
import PaypalButton from "./PaypalButton";

const styles = (theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  question: {
    fontWeight: "bold",
    marginBottom: theme.spacing(2),
  },
  line: {
    margin: `${theme.spacing(1)}px 0`,
  },
  insurance: {
    margin: `${theme.spacing(2)}px 0`,
  },
  button: {
    width: "100%",
  },
  buttonContainer: {
    padding: "0 !important",
    marginLeft: theme.spacing(1),
  },
});

function AcceptCaretakerConfirmation(props) {
  const {
    classes,
    history,
    biddingRequest,
    isAcceptCaretakerConfirmationDialogOpen,
    setIsBiddingRequestDialogOpen,
    setIsAcceptCaretakerConfirmationDialogOpen,
    showSnackBar,
  } = props;
  const [isInsuranceChecked, setIsInsuranceChecked] = useState(false);
  function handlePrePaymentCompleted() {
    acceptOffer(
      biddingRequest.offer._id,
      biddingRequest._id,
      biddingRequest.price,
      isInsuranceChecked
    )
      .then(() => {
        showSnackBar(true, saveSuccess, "success");
        setIsAcceptCaretakerConfirmationDialogOpen(false, biddingRequest);
        setIsBiddingRequestDialogOpen(false, "");
      })
      .catch((status) => {
        if (status === 401) {
          history.push("/");
          window.location.reload();
        }
        showSnackBar(true, saveFailed, "error");
      });
  }

  const paymentDetails = {
    price: biddingRequest.price * 0.2,
    description: biddingRequest.remarks,
    currency: "EUR",
  };
  return (
    <Dialog
      maxWidth="sm"
      open={isAcceptCaretakerConfirmationDialogOpen}
      onClose={() => setIsAcceptCaretakerConfirmationDialogOpen(false, biddingRequest)}
    >
      {biddingRequest._id !== "" && (
        <div className={classes.container}>
          <div className={classes.question}>Initiate pre payment</div>
          <div className={classes.line}>
            Pre Payment Amount: {biddingRequest.price * 0.2} €
          </div>
          <div className={classes.line}>
            Post Payment Amount: {biddingRequest.price * 0.8} €
          </div>
          <div className={classes.line}>Total Price: {biddingRequest.price} €</div>
          <div className={classes.line}>Start Date: {biddingRequest.offer.startDate}</div>
          <div className={classes.line}>End Date: {biddingRequest.offer.endDate}</div>
          <div className={classes.insurance}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isInsuranceChecked}
                  onChange={() => setIsInsuranceChecked(!isInsuranceChecked)}
                  color="secondary"
                />
              }
              label="Insurance"
            />
          </div>
          <Grid container spacing={1}>
            <PaypalButton
              paymentDetails={paymentDetails}
              handlePaymentCompleted={handlePrePaymentCompleted}
            />
            <Grid item xs={12} sm={3} className={classes.buttonContainer}>
              <Button
                variant="contained"
                className={classes.button}
                color="secondary"
                size="small"
                onClick={() =>
                  setIsAcceptCaretakerConfirmationDialogOpen(false, biddingRequest)
                }
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </Dialog>
  );
}

const mapStateToProps = ({
  ownerPage: {isAcceptCaretakerConfirmationDialogOpen, biddingRequest},
}) => ({
  isAcceptCaretakerConfirmationDialogOpen,
  biddingRequest,
});

const mapDispatchToProps = {
  setIsAcceptCaretakerConfirmationDialogOpen: setIsAcceptCaretakerConfirmationDialogOpen,
  setIsBiddingRequestDialogOpen: setIsBiddingRequestDialogOpen,
  showSnackBar: showSnackBar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(AcceptCaretakerConfirmation));

import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  setIsAcceptCaretakerConfirmationDialogOpen,
  setIsBiddingRequestDialogOpen,
} from "../actions/ownerPage";
import {Button, Checkbox, Dialog, FormControlLabel, Grid} from "@material-ui/core";
import {fetchFailed, saveFailed, saveSuccess} from "../constants";
import {showSnackBar} from "../actions/loginPage";
import {getBiddingRequest} from "../services/biddingRequestService";
import {acceptOffer} from "../services/offerService";

const dummyBiddingRequest = {
  image:
    "https://start-cons.com/wp-content/uploads/2019/03/person-dummy-e1553259379744.jpg",
};

const initialCustomer = {
  _id: "",
  username: "",
  password: "",
  name: "",
  phoneNumber: "",
  address: "",
  feedbacksGiven: 0,
  starsRecieved: 0,
  badgesEarned: {
    _id: "",
    name: "",
    description: "",
    image: "",
  },
  type: "",
  interestedOffers: [],
};

const initialBiddingRequest = {
  _id: "",
  offer: {},
  caretaker: initialCustomer,
  createdDate: "",
  price: 0,
  remarks: "",
};

const styles = (theme) => ({
  container: {
    padding: theme.spacing(2),
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
  biddingRequestImage: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: "100%",
  },
  interestedButton: {
    width: "100%",
  },
});

function AcceptCaretakerConfirmation(props) {
  const {
    classes,
    history,
    biddingRequestId,
    isAcceptCaretakerConfirmationDialogOpen,
    setIsBiddingRequestDialogOpen,
    setIsAcceptCaretakerConfirmationDialogOpen,
    showSnackBar,
  } = props;
  const [biddingRequest, setBiddingRequest] = useState(initialBiddingRequest);
  const [isInsuranceChecked, setIsInsuranceChecked] = useState(false);
  useEffect(() => {
    if (biddingRequestId !== "") {
      getBiddingRequest(biddingRequestId)
        .then((biddingRequest) => {
          setBiddingRequest(biddingRequest);
        })
        .catch((status) => {
          if (status === 401) {
            history.push("/");
            window.location.reload();
          }
          showSnackBar(true, fetchFailed, "error");
        });
    }
  }, [biddingRequestId, history, showSnackBar]);
  function handleAccept() {
    acceptOffer(biddingRequest.offer._id, biddingRequest._id, isInsuranceChecked)
      .then(() => {
        showSnackBar(true, saveSuccess, "success");
        setIsAcceptCaretakerConfirmationDialogOpen(false, "");
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
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isAcceptCaretakerConfirmationDialogOpen}
      onClose={() => setIsAcceptCaretakerConfirmationDialogOpen(false, "")}
    >
      <Grid container className={classes.container}>
        <Grid item xs={4}>
          <div>
            <img
              className={classes.biddingRequestImage}
              src={dummyBiddingRequest.image}
              alt={"Caretaker"}
            />
          </div>
          <div>{biddingRequest.caretaker.username}</div>
        </Grid>
        <Grid item xs={8}>
          <div className={classes.question}>
            Are you sure you want to accept this caretaker?
          </div>
          <div className={classes.line}>Price per hr: {biddingRequest.price} euro</div>
          <div className={classes.line}>Total Price: {biddingRequest.price} euro</div>
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
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                className={classes.interestedButton}
                color="secondary"
                size="small"
                onClick={() => handleAccept()}
              >
                Accept
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                className={classes.interestedButton}
                color="secondary"
                size="small"
                onClick={() => setIsAcceptCaretakerConfirmationDialogOpen(false, "")}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

const mapStateToProps = ({
  ownerPage: {isAcceptCaretakerConfirmationDialogOpen, biddingRequestId},
}) => ({
  isAcceptCaretakerConfirmationDialogOpen,
  biddingRequestId,
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

import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {setIsAcceptCaretakerConfirmationDialogOpen} from "../actions/ownerPage";
import {Dialog, Grid, FormControlLabel, Checkbox, Button} from "@material-ui/core";

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
  button: {
    width: "100%",
  },
});

function AcceptCaretakerConfirmation(props) {
  const {
    classes,
    biddingRequestId,
    isAcceptCaretakerConfirmationDialogOpen,
    setIsAcceptCaretakerConfirmationDialogOpen,
  } = props;
  const [biddingRequest, setBiddingRequest] = useState(initialBiddingRequest);
  const [isInsuranceChecked, setIsInsuranceChecked] = useState(false);
  useEffect(() => {
    // TODO: modify this when backend is connected
    function getBiddingRequest(biddingRequestId) {
      const biddingRequest = {
        _id: "",
        offer: {
          startDate: "2020-01-01",
          endDate: "2020-02-01",
        },
        caretaker: {
          username: "Username",
        },
        createdDate: "",
        price: 100,
        remarks: "",
      };
      setBiddingRequest(biddingRequest);
    }
    getBiddingRequest(biddingRequestId);
  }, [biddingRequestId]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isAcceptCaretakerConfirmationDialogOpen}
      onClose={() => setIsAcceptCaretakerConfirmationDialogOpen(false)}
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
                className={classes.button}
                color="secondary"
                size="small"
              >
                Accept
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                className={classes.button}
                color="secondary"
                size="small"
                onClick={() => setIsAcceptCaretakerConfirmationDialogOpen(false)}
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(AcceptCaretakerConfirmation));

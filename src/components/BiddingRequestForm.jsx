import React, {useEffect} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  CardContent,
  Card,
  IconButton,
  Grid,
} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  setBiddingRequestFieldValue,
  setIsBiddingRequestDialogOpen,
} from "../actions/caretakerPage";
import {
  fetchFailed,
  publicURL,
  requiredFieldsEmpty,
  saveFailed,
  saveSuccess,
} from "../constants";
import {showSnackBar} from "../actions/loginPage";
import {NavigateBefore, NavigateNext} from "@material-ui/icons";
import {insertBiddingRequest} from "../services/biddingRequestService";
import {getOffer} from "../services/offerService";

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

const initialOffer = {
  _id: "",
  owner: "",
  approveBiddingRequest: {
    _id: "",
    offer: {},
    caretaker: initialCustomer,
    createdDate: "",
    price: 0,
    remarks: "",
  },
  entity: {
    _id: "",
    owner: initialCustomer,
    description: "",
    images: [],
    breed: "",
  },
  review: {
    _id: "",
    offer: {},
    owner: initialCustomer,
    caretaker: initialCustomer,
    text: "",
    rating: 0,
  },
  status: "",
  description: "",
  createdDate: "",
  startDate: "",
  endDate: "",
  insurance: false,
};

const styles = (theme) => ({
  textFields: {
    margin: theme.spacing(2),
  },
  offerId: {
    textAlign: "right",
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px 0 0`,
    color: "rgba(0, 0, 0, 0.4)",
    fontSize: "10pt",
  },
  ownerImage: {
    width: "30%",
    borderRadius: "100%",
  },
  petImageContent: {
    display: "flex",
    flexDirection: "row",
  },
  ownerName: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
  },
  petImageContainer: {
    position: "relative",
    width: "240px",
    height: "150px",
    overflow: "hidden",
  },
  petImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: "all 500ms",
  },
  navigationButton: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: `${theme.spacing(6)}px ${theme.spacing(1)}px`,
  },
  content: {
    height: "95%",
    width: "400px",
    minWidth: "400px",
    margin: "0 auto",
  },
  name: {
    textAlign: "justify",
    marginTop: theme.spacing(4),
  },
  line: {
    marginTop: theme.spacing(1),
  },
});

const FieldType = {
  TEXT_FIELD: 0,
  TEXT_FIELD_NUMBER: 1,
  TEXT_AREA: 2,
};

const keyMap = {
  biddingAmount: {
    label: "Bidding Amount",
    type: FieldType.TEXT_FIELD_NUMBER,
  },
  remarks: {
    label: "Remarks",
    type: FieldType.TEXT_FIELD,
  },
};

function BiddingRequestForm(props) {
  const {
    history,
    sock,
    classes,
    successCallback,
    biddingRequestFields,
    offerId,
    isBiddingRequestDialogOpen,
    setIsBiddingRequestDialogOpen,
    setBiddingRequestFieldValue,
    showSnackBar,
  } = props;

  const [imageShow, setImageShow] = React.useState(0);
  const [offer, setOffer] = React.useState(initialOffer);

  useEffect(() => {
    if (offerId) {
      getOffer(offerId)
        .then((offer) => {
          setOffer(offer);
        })
        .catch((status) => {
          if (status === 401) {
            history.push("/");
            window.location.reload();
          }
          showSnackBar(true, fetchFailed, "error");
        });
    }
  }, [offerId, history, showSnackBar]);

  function handleSave() {
    const emptyField = Object.keys(biddingRequestFields).find(
      (keyName) => biddingRequestFields[keyName] === ""
    );
    if (emptyField) {
      showSnackBar(true, requiredFieldsEmpty, "error");
    } else if (biddingRequestFields["remarks"].length > 15) {
      showSnackBar(true, "Remarks must be less than 15 characters.", "error");
    } else {
      sock.send(offer._id);
      let biddingRequest = {
        offer: offerId,
        caretaker: localStorage["username"],
        price: biddingRequestFields["biddingAmount"],
        remarks: biddingRequestFields["remarks"],
      };
      insertBiddingRequest(biddingRequest)
        .then(() => {
          showSnackBar(true, saveSuccess, "success");
          setIsBiddingRequestDialogOpen(false);
          successCallback();
        })
        .catch((status) => {
          if (status === 401) {
            history.push("/");
            window.location.reload();
          }
          showSnackBar(true, saveFailed, "error");
        });
    }
  }

  function handleNavigateBefore() {
    if (imageShow > 0) {
      setImageShow(imageShow - 1);
    }
  }
  function handleNavigateNext() {
    if (imageShow < offer.entity.images.length - 1) {
      setImageShow(imageShow + 1);
    }
  }
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isBiddingRequestDialogOpen}
      onClose={() => setIsBiddingRequestDialogOpen(true)}
    >
      <DialogTitle id="form-dialog-title">Bidding Request</DialogTitle>
      <form className={classes.form} noValidate>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" className={classes.content}>
                <CardContent className={classes.offerCardContent}>
                  <div className={classes.petImageContent}>
                    <IconButton
                      onClick={() => handleNavigateBefore()}
                      className={classes.navigationButton}
                    >
                      <NavigateBefore />
                    </IconButton>
                    <div className={classes.petImageContainer}>
                      {Array.from(Array(offer.entity.images.length).keys()).map(
                        (index) => (
                          <img
                            key={index}
                            className={classes.petImage}
                            src={`${publicURL}/${offer.entity.images[index]}`}
                            alt={"Entity"}
                            style={{left: `${(index - imageShow) * 240}px`}}
                          />
                        )
                      )}
                    </div>
                    <IconButton
                      onClick={() => handleNavigateNext()}
                      className={classes.navigationButton}
                    >
                      <NavigateNext />
                    </IconButton>
                  </div>
                  <div className={classes.name}>
                    <div className={classes.line}>{offer.entity.name}</div>
                    <div className={classes.line}>{offer.entity.description}</div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.content}>
                <DialogContentText>
                  Please fill in this form to create a bidding request
                </DialogContentText>
                {Object.keys(biddingRequestFields).map((keyName, i) => {
                  return (
                    <div key={i} className={classes.textFields}>
                      <TextField
                        id={keyName}
                        fullWidth
                        type={
                          keyMap[keyName].type === FieldType.TEXT_FIELD
                            ? "text"
                            : "number"
                        }
                        label={keyMap[keyName].label}
                        required={true}
                        variant={
                          keyMap[keyName].type === FieldType.TEXT_AREA
                            ? "outlined"
                            : "standard"
                        }
                        color="secondary"
                        multiline={keyMap[keyName].type === FieldType.TEXT_AREA}
                        rows={keyMap[keyName].type === FieldType.TEXT_AREA ? 10 : 1}
                        onChange={(event) => {
                          setBiddingRequestFieldValue(keyName, event.target.value);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsBiddingRequestDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="secondary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapStateToProps = ({
  caretakerPage: {isBiddingRequestDialogOpen, offerId, biddingRequestFields},
}) => ({
  isBiddingRequestDialogOpen,
  offerId,
  biddingRequestFields,
});

const mapDispatchToProps = {
  setIsBiddingRequestDialogOpen: setIsBiddingRequestDialogOpen,
  setBiddingRequestFieldValue: setBiddingRequestFieldValue,
  showSnackBar: showSnackBar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(BiddingRequestForm));

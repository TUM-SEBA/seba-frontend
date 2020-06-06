import React from "react";
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
} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  setBiddingRequestFieldValue,
  setIsBiddingRequestDialogOpen,
} from "../actions/caretakerPage";
import {requiredFieldsEmpty} from "../constants";
import {showSnackBar} from "../actions/loginPage";
import {NavigateBefore, NavigateNext} from "@material-ui/icons";

const styles = (theme) => ({
  textFields: {
    margin: theme.spacing(2),
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
  },
  contentCard: {
    height: "100%",
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
  contentLeft: {
    width: "45%",
  },
  contentRight: {
    width: "45%",
  },
  offerCardPetImage: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(6),
  },
  petImage: {
    width: "20%",
    margin: `0 ${theme.spacing(1)}px`,
  },
  ownerName: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(4),
  },
});

const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);

const FieldType = {
  TEXT_FIELD: 0,
  TEXT_AREA: 1,
};

const keyMap = {
  biddingAmount: {
    label: "Bidding Amount",
    type: FieldType.TEXT_FIELD,
  },
  remarks: {
    label: "Remarks",
    type: FieldType.TEXT_AREA,
  },
};

// TODO: remove this when backend is connected
const dummyOffer = {
  image:
    "https://start-cons.com/wp-content/uploads/2019/03/person-dummy-e1553259379744.jpg",
  length: 10,
};

function BiddingRequestForm(props) {
  const {
    classes,
    biddingRequestFields,
    offerId,
    isBiddingRequestDialogOpen,
    setIsBiddingRequestDialogOpen,
    setBiddingRequestFieldValue,
    showSnackBar,
  } = props;

  const [imageShow, setImageShow] = React.useState(0);

  // TODO: change this when backend is connected
  async function handleSave() {
    const emptyField = Object.keys(biddingRequestFields).find(
      (keyName) => biddingRequestFields[keyName] === ""
    );
    emptyField
      ? showSnackBar(true, requiredFieldsEmpty, "error")
      : console.log("Bidding Request is submitted");
  }
  function handleNavigateBefore() {
    if (imageShow > 0) {
      setImageShow(imageShow - 1);
    }
  }
  function handleNavigateNext() {
    if (imageShow < dummyOffer.length - 3) {
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
          <div className={classes.content}>
            <div className={classes.contentLeft}>
              <Card variant="outlined" className={classes.contentCard}>
                <div className={classes.offerId}>{offerId}</div>
                <CardContent className={classes.offerCardContent}>
                  <div>
                    <img
                      className={classes.ownerImage}
                      src={dummyOffer.image}
                      alt={"Owner"}
                    />
                  </div>
                  <div className={classes.ownerName}>Owner</div>
                  <div className={classes.offerCardPetImage}>
                    <IconButton onClick={() => handleNavigateBefore()}>
                      <NavigateBefore />
                    </IconButton>
                    {Array.from(Array(dummyOffer.length).keys())
                      .filter((index) => {
                        return index >= imageShow && index <= imageShow + 2;
                      })
                      .map((index) => (
                        <img
                          key={index}
                          className={classes.petImage}
                          src={dummyOffer.image}
                          alt={"Pet"}
                        />
                      ))}
                    <IconButton onClick={() => handleNavigateNext()}>
                      <NavigateNext />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className={classes.contentRight}>
              <DialogContentText>
                Please fill in this form to create a bidding request
              </DialogContentText>
              {Object.keys(biddingRequestFields).map((keyName, i) => {
                return (
                  <div key={i} className={classes.textFields}>
                    <CustomTextField
                      id={keyName}
                      fullWidth
                      type={"number"}
                      label={keyMap[keyName].label}
                      required={true}
                      variant="outlined"
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
          </div>
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

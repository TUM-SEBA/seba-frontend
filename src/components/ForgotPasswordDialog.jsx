import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {setForgotPasswordDialogOpen, showSnackBar} from "../actions/loginPage";
import {forgotPassword} from "../services/loginService";
import {
  forgotPasswordText,
  forgotPasswordConfirmationText,
  resendMailText,
} from "../constants";

const styles = (theme) => ({
  textFields: {
    margin: theme.spacing(2),
  },
  emailFormatText: {
    color: "#FF0000",
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

//Component that is displayed when the user forgets his password.
//A mail is sent to his registered email id
function ForgotPasswordDialog(props) {
  const {
    classes,
    isForgotPasswordDialogOpen,
    setForgotPasswordDialogOpen,
    showSnackBar,
    forgotPassword,
  } = props;

  const [email, setEmail] = React.useState("");
  const [showResendText, setShowResendText] = React.useState(false);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  async function handleSave() {
    if (validateEmail(email)) {
      await forgotPassword(email).then((success) =>
        success ? setShowResendText(true) : null
      );
    } else {
      showSnackBar(true, "Not a Valid Email format", "error");
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isForgotPasswordDialogOpen}
      onClose={() => {
        setShowResendText(false);
        setForgotPasswordDialogOpen(false);
      }}
    >
      <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
      <form className={classes.form} noValidate>
        <DialogContent>
          {showResendText ? (
            <div>
              <DialogContentText>{forgotPasswordConfirmationText}</DialogContentText>
              <DialogContentText>
                {resendMailText + " "}
                <Button
                  color="secondary"
                  style={{
                    backgroundColor: "transparent",
                    textTransform: "none",
                    padding: "0px",
                    justifyContent: "unset",
                  }}
                  onClick={() => handleSave()}
                >
                  resend
                </Button>
              </DialogContentText>
            </div>
          ) : (
            <div>
              <DialogContentText>{forgotPasswordText}</DialogContentText>
              <CustomTextField
                fullWidth
                label="Email"
                required={true}
                variant="outlined"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowResendText(false);
              setForgotPasswordDialogOpen(false);
            }}
            color="secondary"
          >
            Cancel
          </Button>
          {!showResendText && (
            <Button onClick={handleSave} color="secondary" variant="contained">
              Send
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapStateToProps = ({loginPage: {isForgotPasswordDialogOpen}}) => ({
  isForgotPasswordDialogOpen,
});

const mapDispatchToProps = {
  setForgotPasswordDialogOpen: setForgotPasswordDialogOpen,
  showSnackBar: showSnackBar,
  forgotPassword: forgotPassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(ForgotPasswordDialog));

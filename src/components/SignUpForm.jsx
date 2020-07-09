import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  setIsSignUpDialogOpen,
  setSignUpfieldValue,
  showSnackBar,
} from "../actions/loginPage";
import {signUpCustomer} from "../services/loginService";
import {
  userSignUpSuccessMsg,
  passwordMismatch,
  requiredFieldsEmpty,
  passwordStringCheckAlert,
} from "../constants";

const styles = (theme) => ({
  textFields: {
    margin: theme.spacing(2),
  },
  confirmPasswordText: {
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

const keyNameMap = {
  name: "Name",
  username: "Username",
  phoneNumber: "Phone Number",
  email: "Email Address",
  address: "Address",
  password: "Password",
  confirmPassword: "Confirm Password",
};

function SignUpForm(props) {
  const {
    classes,
    isSignUpDialogOpen,
    setIsSignUpDialogOpen,
    signUpFields,
    setSignUpfieldValue,
    showSnackBar,
  } = props;

  const [passwordsMatch, setPasswordsMatch] = React.useState(true);

  function checkPassword(value) {
    value === signUpFields.password ? setPasswordsMatch(true) : setPasswordsMatch(false);
  }

  function handleSuccessfulSignUp() {
    setIsSignUpDialogOpen(false);
    showSnackBar(true, userSignUpSuccessMsg, "success");
  }

  function passwordStringCheck() {
    var passCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
    if (signUpFields["password"].match(passCheck)) return true;
    else return false;
  }

  function validEmailCheck() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(signUpFields["email"]);
  }

  async function handleSave() {
    const emptyField = Object.keys(signUpFields).find(
      (keyName) => signUpFields[keyName] === ""
    );

    passwordsMatch
      ? passwordStringCheck()
        ? validEmailCheck()
          ? emptyField
            ? showSnackBar(true, requiredFieldsEmpty, "error")
            : await signUpCustomer(signUpFields).then((signUpSuccessful) =>
                signUpSuccessful
                  ? handleSuccessfulSignUp()
                  : showSnackBar(true, "Username exists", "error")
              )
          : showSnackBar(true, "Not a Valid Email format", "error")
        : showSnackBar(true, passwordStringCheckAlert, "error")
      : showSnackBar(true, passwordMismatch, "error");
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isSignUpDialogOpen}
      onClose={() => setIsSignUpDialogOpen(false)}
    >
      <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
      <form className={classes.form} noValidate>
        <DialogContent>
          <DialogContentText>
            Please fill in this form to create an account
          </DialogContentText>
          {Object.keys(signUpFields).map((keyName, i) => {
            return (
              <div key={i} className={classes.textFields}>
                <CustomTextField
                  id={keyName}
                  fullWidth
                  type={
                    keyName === "password" || keyName === "confirmPassword"
                      ? "password"
                      : "text"
                  }
                  label={keyNameMap[keyName]}
                  required={true}
                  variant="outlined"
                  onChange={(event) => {
                    keyName === "confirmPassword" && checkPassword(event.target.value);
                    setSignUpfieldValue(keyName, event.target.value);
                  }}
                />
                {keyName === "confirmPassword" && !passwordsMatch && (
                  <Typography variant="body2" className={classes.confirmPasswordText}>
                    The passwords do not match
                  </Typography>
                )}
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSignUpDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="secondary" variant="contained">
            Sign Up
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapStateToProps = ({loginPage: {isSignUpDialogOpen, signUpFields}}) => ({
  isSignUpDialogOpen,
  signUpFields,
});

const mapDispatchToProps = {
  setIsSignUpDialogOpen: setIsSignUpDialogOpen,
  setSignUpfieldValue: setSignUpfieldValue,
  showSnackBar: showSnackBar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(SignUpForm));

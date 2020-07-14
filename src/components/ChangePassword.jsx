import React from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContentText,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import {setIsChangePasswordDialogOpen} from "../actions/welcomePage";
import {showSnackBar} from "../actions/loginPage";
import {changePassword} from "../services/customerService";
import {passwordStringCheckAlert} from "../constants";

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

//Component that handles change password task
function ChangePassword(props) {
  const {
    classes,
    isChangePasswordDialogOpen,
    setIsChangePasswordDialogOpen,
    showSnackBar,
    changePassword,
  } = props;
  const [currentPass, setCurrentPass] = React.useState("");
  const [newPass, setnewPass] = React.useState("");
  const [confirmNewPass, setconfirmNewPass] = React.useState("");

  function handleSubmit() {
    var passCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
    newPass !== confirmNewPass
      ? showSnackBar(true, "The passwords do not match", "error")
      : newPass.match(passCheck)
      ? changePassword(currentPass, newPass)
      : showSnackBar(true, passwordStringCheckAlert, "error");
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isChangePasswordDialogOpen}
      onClose={() => setIsChangePasswordDialogOpen(false)}
    >
      <DialogTitle id="view-badges" disableTypography={true}>
        <Typography variant="h5">Change Password</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Enter your current and new password below:</DialogContentText>
        <div>
          <div className={classes.textFields}>
            <CustomTextField
              id="Current Password"
              fullWidth
              type="password"
              label="Current Password"
              required={true}
              variant="outlined"
              onChange={(event) => {
                setCurrentPass(event.target.value);
              }}
            />
          </div>
          <div className={classes.textFields}>
            <CustomTextField
              id="New Password"
              fullWidth
              type="password"
              label="New Password"
              required={true}
              variant="outlined"
              onChange={(event) => {
                setnewPass(event.target.value);
              }}
            />
          </div>
          <div className={classes.textFields}>
            <CustomTextField
              id="Confirm New Password"
              fullWidth
              type="password"
              label="Confirm New Password"
              required={true}
              variant="outlined"
              onChange={(event) => {
                setconfirmNewPass(event.target.value);
              }}
            />
            {confirmNewPass !== newPass && (
              <Typography variant="body2" className={classes.confirmPasswordText}>
                The passwords do not match
              </Typography>
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsChangePasswordDialogOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="secondary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({welcomePage: {isChangePasswordDialogOpen}}) => ({
  isChangePasswordDialogOpen,
});

const mapDispatchToProps = {
  setIsChangePasswordDialogOpen: setIsChangePasswordDialogOpen,
  showSnackBar: showSnackBar,
  changePassword: changePassword,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(ChangePassword));

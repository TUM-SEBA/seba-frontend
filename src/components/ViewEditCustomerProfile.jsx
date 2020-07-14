import React from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@material-ui/core";
import {setUserProfileDialogOpen, setProfilefieldValue} from "../actions/welcomePage";
import {updateUserProfile} from "../services/customerService";

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

//The Component to view and edit customer profile information
function ViewEditCustomerProfile(props) {
  const {
    classes,
    userProfileDialogOpen,
    setUserProfileDialogOpen,
    profileFields,
    setProfilefieldValue,
    updateUserProfile,
  } = props;

  const [editState, setEditState] = React.useState(false);

  function handleClose() {
    setEditState(false);
    setUserProfileDialogOpen(false);
  }

  function handleEditOrUpdate() {
    if (editState) {
      updateUserProfile(profileFields);
      setEditState(false);
    } else setEditState(true);
  }

  return (
    <Dialog fullWidth maxWidth="md" open={userProfileDialogOpen} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">My Profile</DialogTitle>
      <form className={classes.form} noValidate>
        <DialogContent>
          <DialogContentText>Your profile details are as below:</DialogContentText>
          {Object.keys(profileFields).map((keyName, i) => {
            return (
              <div key={i} className={classes.textFields}>
                <CustomTextField
                  id={keyName}
                  fullWidth
                  label={keyName}
                  defaultValue={profileFields[keyName]}
                  required={true}
                  variant="outlined"
                  disabled={editState ? false : true}
                  onChange={(event) => {
                    setProfilefieldValue(keyName, event.target.value);
                  }}
                />
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditOrUpdate} color="secondary" variant="contained">
            {editState ? "Update Profile" : "Edit Profile"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapStateToProps = ({welcomePage: {userProfileDialogOpen, profileFields}}) => ({
  userProfileDialogOpen,
  profileFields,
});

const mapDispatchToProps = {
  setUserProfileDialogOpen: setUserProfileDialogOpen,
  setProfilefieldValue: setProfilefieldValue,
  updateUserProfile: updateUserProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(ViewEditCustomerProfile));

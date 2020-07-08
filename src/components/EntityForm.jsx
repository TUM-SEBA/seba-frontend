import React from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import PetsIcon from "@material-ui/icons/Pets";
import NatureIcon from "@material-ui/icons/Nature";
import {setEntityfieldValue, setIsEntityFormDialogOpen} from "../actions/ownerPage";
import {insertEntity, updateEntity} from "../services/entityService";
import {saveFailed, saveSuccess} from "../constants";
import {showSnackBar} from "../actions/loginPage";

const styles = (theme) => ({
  textFields: {
    margin: theme.spacing(2),
  },
  confirmPasswordText: {
    color: "#FF0000",
  },
  categoryContainer: {
    margin: theme.spacing(2),
  },
  categoryLabel: {
    display: "inline-block",
    width: "100px",
  },
  categoryGridObject: {
    display: "inline-block",
  },
  header: {
    margin: theme.spacing(2),
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

function EntityForm(props) {
  const {
    history,
    classes,
    entityId,
    isInsert,
    isEntityFormDialogOpen,
    setIsEntityFormDialogOpen,
    entityFields,
    setEntityfieldValue,
    showSnackBar,
  } = props;

  function handleClose() {
    setIsEntityFormDialogOpen(false, false, "");
  }

  function handleInsertOrUpdate() {
    if (isInsert) {
      insertEntity(entityFields)
        .then(() => {
          showSnackBar(true, saveSuccess, "success");
          setIsEntityFormDialogOpen(false, false, "");
        })
        .catch((status) => {
          if (status === 401) {
            history.push("/");
            window.location.reload();
          }
          showSnackBar(true, saveFailed, "error");
        });
    } else {
      updateEntity(entityFields, entityId)
        .then(() => {
          showSnackBar(true, saveSuccess, "success");
          setIsEntityFormDialogOpen(false, false, "");
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

  return (
    <Dialog fullWidth maxWidth="md" open={isEntityFormDialogOpen} onClose={handleClose}>
      <DialogTitle id="form-dialog-title">Pet / Plant</DialogTitle>
      <form className={classes.form} noValidate>
        <DialogContent>
          <DialogContentText className={classes.header}>
            {isInsert ? "Add" : "Update"} your pet below:
          </DialogContentText>
          <div key={"category"} className={classes.categoryContainer}>
            <div className={classes.categoryLabel}>Category:</div>
            <div className={classes.categoryGridObject}>
              <ToggleButtonGroup
                value={entityFields["category"]}
                exclusive
                onChange={(event, value) => {
                  setEntityfieldValue("category", value);
                }}
                size="large"
              >
                <ToggleButton value="Pet">
                  <PetsIcon />
                </ToggleButton>
                <ToggleButton value="Plant">
                  <NatureIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <div key={"breed"} className={classes.textFields}>
            <CustomTextField
              id={"breed"}
              fullWidth
              label={"Breed"}
              defaultValue={entityFields["breed"]}
              required={true}
              variant="outlined"
              onChange={(event) => {
                setEntityfieldValue("breed", event.target.value);
              }}
            />
          </div>
          <div key={"description"} className={classes.textFields}>
            <CustomTextField
              id={"description"}
              fullWidth
              label={"Description"}
              defaultValue={entityFields["description"]}
              required={true}
              variant="outlined"
              rows={8}
              multiline
              onChange={(event) => {
                setEntityfieldValue("description", event.target.value);
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleInsertOrUpdate} color="secondary" variant="contained">
            {isInsert ? "Save" : "Upddate"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const mapStateToProps = ({
  ownerPage: {isEntityFormDialogOpen, entityFields, entityId, isInsert},
}) => ({
  entityId,
  isEntityFormDialogOpen,
  entityFields,
  isInsert,
});

const mapDispatchToProps = {
  setIsEntityFormDialogOpen: setIsEntityFormDialogOpen,
  setEntityfieldValue: setEntityfieldValue,
  showSnackBar: showSnackBar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(EntityForm));

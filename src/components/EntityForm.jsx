import React, {useRef, useState} from "react";
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
import {requiredFieldsEmpty, saveFailed, saveSuccess} from "../constants";
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
  noOfImages: {
    marginLeft: theme.spacing(3),
  },
  browseImageContainer: {
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
    successCallback,
  } = props;

  const inputFileRef = useRef(null);
  const [images, setImages] = useState([]);

  function handleClose() {
    setIsEntityFormDialogOpen(false, false, "");
  }

  function handleInsertOrUpdate() {
    const emptyField = Object.keys(entityFields).find(
      (keyName) => entityFields[keyName] === ""
    );
    if (emptyField) {
      showSnackBar(true, requiredFieldsEmpty + " " + emptyField, "error");
    } else if (images.length === 0) {
      showSnackBar(true, requiredFieldsEmpty + " Images", "error");
    } else {
      if (isInsert) {
        insertEntity(entityFields, images)
          .then(() => {
            showSnackBar(true, saveSuccess, "success");
            setIsEntityFormDialogOpen(false, false, "");
            setImages([]);
            successCallback();
          })
          .catch((status) => {
            if (status === 401) {
              history.push("/");
              window.location.reload();
            }
            showSnackBar(true, saveFailed, "error");
          });
      } else {
        const entity = entityFields;
        entity._id = entityId;
        updateEntity(entity, images)
          .then(() => {
            showSnackBar(true, saveSuccess, "success");
            setIsEntityFormDialogOpen(false, false, "");
            setImages([]);
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
  }
  function handleBrowseClick() {
    inputFileRef.current.click();
  }
  function handleFileChange(event) {
    setImages(event.target.files);
  }
  return (
    <Dialog fullWidth maxWidth="md" open={isEntityFormDialogOpen} onClose={handleClose}>
      <DialogTitle>New Pet / Plant</DialogTitle>
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
          <div key={"name"} className={classes.textFields}>
            <CustomTextField
              id={"name"}
              fullWidth
              label={"Name"}
              defaultValue={entityFields["name"]}
              required={true}
              variant="outlined"
              onChange={(event) => {
                setEntityfieldValue("name", event.target.value);
              }}
            />
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
          <div key={"browse"} className={classes.browseImageContainer}>
            <input
              type="file"
              name="file"
              multiple={true}
              style={{display: "none"}}
              ref={inputFileRef}
              onChange={handleFileChange}
            />
            <Button variant="contained" color="primary" onClick={handleBrowseClick}>
              Browse
            </Button>
            <span className={classes.noOfImages}>{images.length} Images</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleInsertOrUpdate} color="secondary" variant="contained">
            {isInsert ? "Save" : "Update"}
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

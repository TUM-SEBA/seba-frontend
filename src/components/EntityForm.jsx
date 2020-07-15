/**
 * EntityForm: Form dialog which is used to insert / update an entity.
 */

import React, {useRef} from "react";
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
  Tooltip,
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
    color: "rgba(0, 0, 0, 0.54)",
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

  function handleClose() {
    setIsEntityFormDialogOpen(false, false, "");
  }

  function handleInsertOrUpdate() {
    const emptyField = Object.keys(entityFields).find(
      (keyName) => entityFields[keyName] === "" || entityFields[keyName] === null
    );
    const images = entityFields["images"];
    if (emptyField) {
      showSnackBar(true, requiredFieldsEmpty + " " + emptyField, "error");
    } else if (entityFields["category"] === "null") {
      showSnackBar(true, requiredFieldsEmpty + " category", "error");
    } else if (images.length === 0) {
      showSnackBar(true, requiredFieldsEmpty + " images", "error");
    } else {
      if (isInsert) {
        insertEntity(entityFields, images)
          .then(() => {
            showSnackBar(true, saveSuccess, "success");
            setEntityfieldValue("category", null);
            setEntityfieldValue("name", "");
            setEntityfieldValue("breed", "");
            setEntityfieldValue("description", "");
            setEntityfieldValue("images", []);
            setIsEntityFormDialogOpen(false, false, "");
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
            setEntityfieldValue("category", null);
            setEntityfieldValue("name", "");
            setEntityfieldValue("breed", "");
            setEntityfieldValue("description", "");
            setEntityfieldValue("images", []);
            setIsEntityFormDialogOpen(false, false, "");
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
    const images = event.target.files;
    setEntityfieldValue("images", images);
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
                  <Tooltip title="Pet" aria-label="pet">
                    <PetsIcon />
                  </Tooltip>
                </ToggleButton>
                <ToggleButton value="Plant">
                  <Tooltip title="Plant" aria-label="plant">
                    <NatureIcon />
                  </Tooltip>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <div key={"name"} className={classes.textFields}>
            <TextField
              id={"name"}
              fullWidth
              label={"Name"}
              defaultValue={entityFields["name"]}
              required={true}
              color="secondary"
              onChange={(event) => {
                setEntityfieldValue("name", event.target.value);
              }}
            />
          </div>
          <div key={"breed"} className={classes.textFields}>
            <TextField
              id={"breed"}
              fullWidth
              label={"Breed"}
              defaultValue={entityFields["breed"]}
              required={true}
              color="secondary"
              onChange={(event) => {
                setEntityfieldValue("breed", event.target.value);
              }}
            />
          </div>
          <div key={"description"} className={classes.textFields}>
            <TextField
              id={"description"}
              fullWidth
              label={"Description"}
              defaultValue={entityFields["description"]}
              required={true}
              variant="outlined"
              color="secondary"
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
            <Button variant="contained" color="secondary" onClick={handleBrowseClick}>
              Browse Images
            </Button>
            <span className={classes.noOfImages}>
              {entityFields["images"].length} Images
            </span>
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

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {setIsViewBadgesDialogOpen} from "../actions/welcomePage";
import DisplayBadge from "./DisplayBadge";

const styles = (theme) => ({
  displayBadges: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: theme.spacing(1),
  },
});

//The list of badges displayed when the customer wants to view his badges
function ViewBadges(props) {
  const {classes, isViewBadgesDialogOpen, setIsViewBadgesDialogOpen, myBadges} = props;

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isViewBadgesDialogOpen}
      onClose={() => setIsViewBadgesDialogOpen(false)}
    >
      <DialogTitle id="view-badges" disableTypography={true}>
        <Typography variant="h5">Badges Earned</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>You've earned the following badges:</DialogContentText>
        <div className={classes.displayBadges}>
          {Object.keys(myBadges).map((index) => {
            return (
              <div key={index}>
                <DisplayBadge mybadge={myBadges[index]} />
              </div>
            );
          })}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsViewBadgesDialogOpen(false)} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({welcomePage: {isViewBadgesDialogOpen, myBadges}}) => ({
  isViewBadgesDialogOpen,
  myBadges,
});

const mapDispatchToProps = {
  setIsViewBadgesDialogOpen: setIsViewBadgesDialogOpen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(ViewBadges));

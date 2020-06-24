import React from "react";
import {connect} from "react-redux";
import {Dialog, Button, CardMedia, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {setNewBadgeAvailable, setIsViewBadgesDialogOpen} from "../actions/welcomePage";
import {getMyBadges} from "../services/customerService";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textFields: {
    margin: theme.spacing(2),
  },
  infoText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
  },
  emailFormatText: {
    color: "#FF0000",
  },
  cardImage: {
    objectFit: "scale-down",
    width: "auto",
  },
  padding: {
    padding: theme.spacing(2),
  },
  badgeName: {
    transform: "translate(0px, -25px)",
    textAlign: "center",
  },
});

function BadgeNotification(props) {
  const {
    classes,
    badge,
    newBadgeDialog,
    setNewBadgeAvailable,
    setIsViewBadgesDialogOpen,
    getMyBadges,
  } = props;

  function handleClose() {
    setNewBadgeAvailable(null, false);
  }

  function seeAllBadges() {
    setNewBadgeAvailable(null, false);
    getMyBadges();
    setIsViewBadgesDialogOpen(true);
  }

  return (
    <div>
      <Dialog fullWidth open={newBadgeDialog} onClose={handleClose}>
        <div className={classes.root}>
          <div className={classes.infoText}>
            <div className={classes.padding}>
              <Typography variant="h4">Congratulations</Typography>
              <Typography variant="body1">You've earned a badge!!</Typography>
            </div>
            <div className={classes.padding}>
              <Button variant="contained" color="secondary" onClick={seeAllBadges}>
                See All Badges
              </Button>
            </div>
          </div>
          {badge && (
            <div>
              <CardMedia
                component="img"
                height="250"
                className={classes.cardImage}
                image={`data:image/png;base64, ${badge.image}`}
                title={badge.name}
              />
              <div className={classes.badgeName}>
                <Typography variant="h6">{badge.name}</Typography>
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = ({welcomePage: {newBadgeDialog}}) => ({newBadgeDialog});

const mapDispatchToProps = {
  setNewBadgeAvailable: setNewBadgeAvailable,
  setIsViewBadgesDialogOpen: setIsViewBadgesDialogOpen,
  getMyBadges: getMyBadges,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(BadgeNotification));

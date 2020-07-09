import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {setIsAboutUsDialogOpen} from "../actions/welcomePage";
import ErayImage from "../assets/team/eray.png";
import RaymondImage from "../assets/team/raymond.png";
import RizkyImage from "../assets/team/rizky.png";
import SwornimImage from "../assets/team/swornim.jpg";

const styles = (theme) => ({
  displayUs: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: theme.spacing(1),
  },
  gridContainerPerson: {},
  gridContainerDialog: {},
  nameText: {},
  photo: {
    height: "250px",
    width: "200px",
  },
});

function AboutUs(props) {
  const {classes, isAboutUsDialogOpen, setIsAboutUsDialogOpen} = props;

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isAboutUsDialogOpen}
      onClose={() => setIsAboutUsDialogOpen(false)}
    >
      <DialogTitle id="about-us" disableTypography={true}>
        <Typography variant="h5">Seba Team 55</Typography>
      </DialogTitle>
      <DialogContent>
        <div className={classes.displayUs}>
          <Grid
            container
            direction="row"
            spacing={1}
            justify="center"
            alignItems="center"
            className={classes.gridContainerDialog}
          >
            <Grid item xs={3}>
              <Grid
                container
                direction="column"
                spacing={1}
                justify="center"
                alignItems="center"
                className={classes.gridContainerPerson}
              >
                <Grid item>
                  <img className={classes.photo} src={ErayImage} alt={"No Data Found"} />
                </Grid>
                <Grid item>
                  <Typography className={classes.nameText}>Eray Tufan</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid
                container
                direction="column"
                spacing={1}
                justify="center"
                alignItems="center"
                className={classes.gridContainerPerson}
              >
                <Grid item>
                  <img
                    className={classes.photo}
                    src={RaymondImage}
                    alt={"No Data Found"}
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.nameText}>Raymond Pinto</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid
                container
                direction="column"
                spacing={1}
                justify="center"
                alignItems="center"
                className={classes.gridContainerPerson}
              >
                <Grid item>
                  <img className={classes.photo} src={RizkyImage} alt={"No Data Found"} />
                </Grid>
                <Grid item>
                  <Typography className={classes.nameText}>Rizky Riyaldhi</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid
                container
                direction="column"
                spacing={1}
                justify="center"
                alignItems="center"
                className={classes.gridContainerPerson}
              >
                <Grid item>
                  <img
                    className={classes.photo}
                    src={SwornimImage}
                    alt={"No Data Found"}
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.nameText}>Swornim Shrestha</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsAboutUsDialogOpen(false)} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = ({welcomePage: {isAboutUsDialogOpen}}) => ({
  isAboutUsDialogOpen,
});

const mapDispatchToProps = {
  setIsAboutUsDialogOpen: setIsAboutUsDialogOpen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(AboutUs));

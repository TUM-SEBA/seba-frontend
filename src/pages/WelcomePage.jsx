import React from "react";
import {connect} from "react-redux";
import {Avatar, Grid, Typography} from "@material-ui/core";
import Header from "../components/Header";
import Footer from "../components/Footer";
import caretakerImage from "../assets/caretaker.png";
import ownerImage from "../assets/owner.png";
import {withStyles} from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import BadgeNotification from "../components/BadgeNotification";
import {setIsChangePasswordDialogOpen} from "../actions/welcomePage";
import {checkNewBadge} from "../services/customerService";
import MenuDialog from "../components/MenuDialog";

const styles = (theme) => ({
  large: {
    width: theme.spacing(50),
    height: theme.spacing(50),
  },

  headerColor: {
    background: "#DCEFDE",
  },

  centerText: {
    textAlign: "center",
    fontSize: "25px",
  },
  welcomeContainer: {
    marginTop: "20px;",
  },
  navStyle: {
    color: "#000000",
    textDecoration: "none",
    cursor: "pointer",
  },
  footer: {
    position: "absolute",
    left: "0",
    bottom: "0",
    right: "0",
  },
});

function WelcomePage(props) {
  const {classes, setIsChangePasswordDialogOpen, checkNewBadge, newBadge} = props;

  React.useEffect(() => {
    if (localStorage.getItem("shouldChangePassword")) setIsChangePasswordDialogOpen(true);
    checkNewBadge();
  }, [checkNewBadge, setIsChangePasswordDialogOpen]);

  const {history} = props;

  function gotoOwnerPage() {
    history.push("/owner");
    window.location.reload();
  }

  function gotoCaretakerPage() {
    history.push("/caretaker");
    window.location.reload();
  }

  return (
    <div>
      <Grid container direction="column" justify="flex-start" alignItems="stretch">
        <Grid item>
          <Header history={history} />
        </Grid>
      </Grid>

      <Grid className={classes.welcomeContainer} item>
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
          <Typography
            style={{
              margin: "auto",
              fontSize: "25px",
              width: "170px",
              textAlign: "center",
            }}
          >
            Hello User, {localStorage["username"]} Countinue as
          </Typography>

          <Grid container direction="row" justify="space-around" alignItems="center">
            <div className={classes.navStyle} onClick={gotoCaretakerPage}>
              <Button>
                <Avatar src={caretakerImage} className={classes.large} />
              </Button>
              <Typography className={classes.centerText}>Caretaker</Typography>
            </div>

            <div onClick={gotoOwnerPage} className={classes.navStyle}>
              <Button>
                <Avatar src={ownerImage} className={classes.large} />
              </Button>
              <Typography className={classes.centerText}>Owner</Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <MenuDialog />
      <BadgeNotification badge={newBadge} />
      <Grid item className={classes.footer}>
        <Footer history={history} />
      </Grid>
    </div>
  );
}

const mapStateToProps = ({welcomePage: {newBadge}}) => ({newBadge});

const mapDispatchToProps = {
  setIsChangePasswordDialogOpen: setIsChangePasswordDialogOpen,
  checkNewBadge: checkNewBadge,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(WelcomePage));

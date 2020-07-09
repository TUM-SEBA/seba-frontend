import React from "react";
import {AppBar, Toolbar, Typography, Grid, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import {setIsAboutUsDialogOpen} from "../actions/welcomePage";
import AboutUs from "./AboutUs";

const useStyles = makeStyles((theme) => ({
  footer: {
    background: "darkgray",
  },
  footerText: {
    margin: "auto",
    width: "170px",
    fontSize: "12px",
  },
  footerToolbar: {
    height: "15px",
  },
  gridContainer: {
    alignItems: "center",
  },
  socialMediaButton: {
    backgroundColor: "transparent",
  },
}));

const Footer = (props) => {
  const {history, setIsAboutUsDialogOpen} = props;

  const classes = useStyles();

  function openFacebook() {
    window.open("https://www.facebook.com/TU.Muenchen");
  }
  function openInstagram() {
    window.open("https://www.instagram.com/tu.muenchen/");
  }
  function openTwitter() {
    window.open("https://twitter.com/TU_Muenchen");
  }

  return (
    <div className={classes.footer}>
      <AppBar className={classes.footer} position="static">
        <Toolbar className={classes.footerToolbar}>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={4}>
              <Typography className={classes.footerText}>
                Copyright @2020 Technical University of Munich
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Grid container className={classes.gridContainer}>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    className={classes.socialMediaButton}
                    onClick={openFacebook}
                  >
                    <FacebookIcon fontSize="large" />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    className={classes.socialMediaButton}
                    onClick={openTwitter}
                  >
                    <TwitterIcon fontSize="large" />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    className={classes.socialMediaButton}
                    onClick={openInstagram}
                  >
                    <InstagramIcon fontSize="large" />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                className={classes.socialMediaButton}
                onClick={() => setIsAboutUsDialogOpen(true)}
              >
                About Us
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AboutUs history={history} />
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setIsAboutUsDialogOpen: setIsAboutUsDialogOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

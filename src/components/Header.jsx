import React from "react";
import {AppBar, Toolbar, Typography, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar} from "@material-ui/core";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import logo from "../logoSEBA.png";
import Button from "@material-ui/core/Button";
import {logout} from "../services/loginService";
import AccountMenu from "./AccountMenu";
import {connect} from "react-redux";
import LoopIcon from "@material-ui/icons/Loop";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  medium: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  logo: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    cursor: "pointer",
  },
  switchDiv: {
    textAlign: "right",
  },

  headerColor: {
    background: "#DCEFDE",
  },

  sentenceCase: {
    textTransform: "none",
    fontSize: "13px",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const {logout, history} = props;

  const currentUrl = window.location.pathname;

  function switchUser() {
    if (currentUrl === "/owner") {
      history.push("/caretaker");
      window.location.reload();
    } else if (currentUrl === "/caretaker") {
      history.push("/owner");
      window.location.reload();
    }
  }

  function gotoHome() {
    history.push("/");
    window.location.reload();
  }

  return (
    <div className={classes.headerColor}>
      <AppBar className={classes.headerColor} position="static">
        <Toolbar>
          <Grid container direction="row" justify="space-around" alignItems="center">
            <Grid item xs={6} sm={6} md={6} lg={9}>
              <Avatar onClick={gotoHome} alt="Home" src={logo} className={classes.logo} />
            </Grid>
            <Grid item xs={6} sm={2} md={2} lg={1}>
              <AccountMenu />
            </Grid>
            {currentUrl !== "/" && (
              <Grid item className={classes.switchDiv} xs={6} sm={2} md={2} lg={1}>
                <Button onClick={switchUser}>
                  <Typography className={classes.sentenceCase}>Switch</Typography>
                  <LoopIcon />
                </Button>
              </Grid>
            )}

            <Grid item xs={6} sm={2} md={2} lg={1}>
              <Button onClick={() => logout(history)}>
                <Typography className={classes.sentenceCase}>Sign Out</Typography>
                <ExitToAppOutlinedIcon />
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  logout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

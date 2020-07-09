import React from "react";
import {AppBar, Toolbar, Typography, div} from "@material-ui/core";
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
  rowFlex: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  logoDiv: {
    minWidth: "70%",
    flexGrow: "1",
  },
  menuDiv: {
    minWidth: "9%",
  },
  switchDiv: {
    minWidth: "13%",
  },
  logoutDiv: {
    minWidth: "7%",
  },
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
          <div className={classes.rowFlex}>
            <div className={classes.logoDiv}>
              <Avatar onClick={gotoHome} alt="Home" src={logo} className={classes.logo} />
            </div>
            <div className={classes.menuDiv}>
              <AccountMenu />
            </div>
            {currentUrl !== "/" && (
              <div className={classes.switchDiv}>
                <Button onClick={switchUser}>
                  <Typography className={classes.sentenceCase}>
                    Switch to {currentUrl === "/caretaker" ? "Owner" : "Caretaker"}
                  </Typography>
                  <LoopIcon />
                </Button>
              </div>
            )}

            <div className={classes.logoutDiv}>
              <Button onClick={() => logout(history)}>
                <Typography className={classes.sentenceCase}>Sign Out</Typography>
                <ExitToAppOutlinedIcon />
              </Button>
            </div>
          </div>
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

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
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },

  headerColor: {
    background: "#DCEFDE",
  },

  sentenceCase: {
    textTransform: "none",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const {logout} = props;

  return (
    <div className={classes.headerColor}>
      <AppBar className={classes.headerColor} position="static">
        <Toolbar>
          <Grid container direction="row" justify="space-around" alignItems="center">
            <Grid item xs={3} md={8} sm={8} lg={9}>
              <Avatar alt="Home" src={logo} className={classes.large} />
            </Grid>
            <Grid item xs={3} md={2} sm={2} lg={1}>
              <Button>
                <Typography className={classes.sentenceCase}>Switch User</Typography>
                <LoopIcon />
              </Button>
            </Grid>
            <Grid item xs={3} md={2} sm={2} lg={1}>
              <AccountMenu />
            </Grid>
            <Grid item xs={3} md={2} sm={2} lg={1}>
              <Button onClick={logout}>
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

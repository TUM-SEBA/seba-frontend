import React from "react";
import {AppBar, Toolbar, Typography, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar} from "@material-ui/core";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import logo from "../logoSEBA.png";
import Button from "@material-ui/core/Button";
import {logout} from "../services/loginService";
import AccountMenu from "./AccountMenu";

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
}));

const Header = () => {
  const classes = useStyles();

  async function signout() {
    await logout().then((status) =>
      status ? window.location.reload() : console.log("Handle Invalid token")
    );
  }

  return (
    <div className={classes.headerColor}>
      <AppBar className={classes.headerColor} position="static">
        <Toolbar>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Grid item xs={8}>
              <Avatar alt="Home" src={logo} className={classes.large} />
            </Grid>
            <AccountMenu />
            <Button onClick={signout}>
              <Typography>Sign Out</Typography>
              <ExitToAppOutlinedIcon />
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

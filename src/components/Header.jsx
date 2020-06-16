import React from "react";
import {AppBar, Toolbar, Typography, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import logo from "../logoSEBA.png";
import Button from "@material-ui/core/Button";
import {logout} from "../services/loginService";
import {red} from "@material-ui/core/colors";

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
          <Grid container direction="row" justify="space-around" alignItems="center">
            <Grid item xs={4} md={8} sm={8} lg={10}>
              <Avatar alt="Home" src={logo} className={classes.large} />
            </Grid>

            <Grid item xs={4} md={2} sm={2} lg={1}>
              <Button>
                <AccountCircleIcon />
                <Typography className={classes.sentenceCase}>Account Name</Typography>
              </Button>
            </Grid>

            <Grid item xs={4} md={2} sm={2} lg={1}>
              <Button onClick={signout}>
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

export default Header;

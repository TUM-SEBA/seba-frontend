import React from "react";
import {Grid, Typography} from "@material-ui/core";
import Header from "../components/Header";
import {Avatar} from "@material-ui/core";
import logo1 from "../logoSEBA.png";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
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
}));

export default function WelcomePage(props) {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="flex-start" alignItems="stretch">
      <Grid item>
        <Header />
      </Grid>

      <Grid item>
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
          <Typography
            style={{
              margin: "auto",
              fontSize: "25px",
              width: "170px",
              textAlign: "center",
            }}
          >
            Hello User, XYZ Countinue as
          </Typography>

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item direction="column" justify="center" alignItems="center">
              <Button>
                <Avatar src={logo1} className={classes.large} />
              </Button>
              <Typography className={classes.centerText}>Caretaker</Typography>
            </Grid>

            <Grid item direction="column" justify="center" alignItems="center">
              <Button>
                <Avatar src={logo1} className={classes.large} />
              </Button>
              <Typography className={classes.centerText}>Owner</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

import React from "react";
import {Grid, Typography} from "@material-ui/core";
import Header from "../components/Header";
import {Avatar} from "@material-ui/core";
import logo1 from "../logoSEBA.png";
import caretakerImage from "../assets/caretaker.png";
import ownerImage from "../assets/owner.png";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

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
  welcomeContainer: {
    marginTop: "20px;",
  },
  navStyle: {
    color: "#000000",
    textDecoration: "none",
  },
}));

export default function WelcomePage(props) {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="flex-start" alignItems="stretch">
      <Grid item>
        <Header />
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
            Hello User, XYZ Countinue as
          </Typography>

          <Grid container direction="row" justify="space-around" alignItems="center">
            <Link className={classes.navStyle} to="/caretaker">
              <Button>
                <Avatar src={caretakerImage} className={classes.large} />
              </Button>
              <Typography className={classes.centerText}>Caretaker</Typography>
            </Link>

            <Link className={classes.navStyle} to="/owner">
              <Button>
                <Avatar src={ownerImage} className={classes.large} />
              </Button>
              <Typography className={classes.centerText}>Owner</Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

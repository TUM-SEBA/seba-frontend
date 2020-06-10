import React from "react";
import {Grid, Typography} from "@material-ui/core";
import Header from "../components/shared-component/Header";

export default function WelcomePage(props) {
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

          <Grid container direction="row" justify="center" alignItems="center"></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

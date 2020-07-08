import React from "react";
import {withStyles} from "@material-ui/styles";
import {Button, Card, CardActions, Grid} from "@material-ui/core";
import {publicURL} from "../constants";

const styles = (theme) => {
  return {
    gridItem: {
      padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
    },
    line: {
      margin: `${theme.spacing(1)}px 0`,
    },
    description: {
      margin: `${theme.spacing(1)}px 0`,
      height: theme.spacing(10),
      overflowY: "scroll",
      textAlign: "justify",
    },
    entityImage: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      borderRadius: "100%",
    },
    button: {
      width: "100%",
    },
  };
};

function Entity(props) {
  const {classes, entity} = props;

  return (
    <Card variant="outlined" className={classes.gridItem}>
      <Grid container>
        <Grid item xs={4}>
          <div>
            <img
              className={classes.entityImage}
              src={`${publicURL}/${entity.images[0]}`}
              alt={"Pet"}
            />
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className={classes.line}>Category: {entity.category}</div>
          <div className={classes.line}>Breed: {entity.breed}</div>
          <div className={classes.line}>Description:</div>
          <div className={classes.description}>{entity.description}</div>
          <CardActions>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4} md={5} lg={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="secondary"
                  size="small"
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={4} md={5} lg={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="secondary"
                  size="small"
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}

export default withStyles(styles, {withTheme: true})(Entity);

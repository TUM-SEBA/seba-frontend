import React from "react";
import {withStyles} from "@material-ui/styles";
import {Button, Card, CardActions, CardContent, Grid} from "@material-ui/core";

const styles = (theme) => {
  return {
    offerImage: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      borderRadius: "100%",
    },
    offerCardId: {
      textAlign: "right",
      padding: `${theme.spacing(1)}px ${theme.spacing(2)}px 0 0`,
      color: "rgba(0, 0, 0, 0.4)",
      fontSize: "10pt",
    },
    offerCardContent: {
      padding: 0,
    },
    offerCardImageContainer: {
      textAlign: "center",
      padding: `${theme.spacing(8)}px 0 ${theme.spacing(2)}px 0`,
      background: "#009688",
    },
    offerCardDescription: {
      height: theme.spacing(20),
      textAlign: "justify",
      fontSize: "10pt",
      overflow: "scroll",
      padding: `0 ${theme.spacing(1)}px`,
      marginTop: theme.spacing(2),
    },
    offerCardActions: {
      justifyContent: "flex-end",
    },
    interestedButton: {
      width: "100%",
      fontSize: "9pt",
      fontWeight: "bold",
      background: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      "&:hover": {
        background: theme.palette.secondary.main,
      },
    },
    failedButton: {
      width: "100%",
      fontSize: "9pt",
      fontWeight: "bold",
      background: theme.palette.secondary.contrastText,
      color: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
      "&:hover": {
        background: theme.palette.secondary.contrastText,
      },
    },
    username: {
      color: "#FFFFFF",
      marginTop: theme.spacing(1),
      fontWeight: "600",
    },
  };
};

function CaretakerGrid(props) {
  const {classes, offer, showAction, interestedCallback, notInterestedCallback} = props;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={offer._id}>
      <Card variant="outlined">
        {/*<div className={classes.offerCardId}>{offer._id}</div>*/}
        <CardContent className={classes.offerCardContent}>
          <div className={classes.offerCardImageContainer}>
            <img className={classes.offerImage} src={offer.image} alt={"Pet"} />
            <div className={classes.username}>@{offer.owner.username}</div>
          </div>
          <div className={classes.offerCardDescription}>{offer.description}</div>
        </CardContent>
        {showAction && (
          <CardActions className={classes.offerCardActions}>
            <Grid container spacing={1}>
              <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} />
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Button
                  variant="contained"
                  className={classes.interestedButton}
                  size="small"
                  onClick={() => interestedCallback()}
                >
                  Interested
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={7} lg={7}>
                <Button
                  variant="contained"
                  className={classes.failedButton}
                  size="small"
                  onClick={() => notInterestedCallback()}
                >
                  Not Interested
                </Button>
              </Grid>
              <Grid item xs={"auto"} sm={"auto"} md={"auto"} lg={"auto"} />
            </Grid>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}

export default withStyles(styles, {withTheme: true})(CaretakerGrid);

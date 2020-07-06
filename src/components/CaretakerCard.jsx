import React from "react";
import {withStyles} from "@material-ui/styles";
import {Button, Card, CardActions, CardContent, CardMedia, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {publicURL} from "../constants";

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
    offerCardTitle: {
      margin: `${theme.spacing(1)}px 0`,
    },
    offerCardDescription: {
      height: theme.spacing(20),
      overflow: "scroll",
      margin: `${theme.spacing(1)}px 0`,
      textAlign: "justify",
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
      marginTop: theme.spacing(1),
    },
    media: {
      height: 140,
      objectFit: "cover",
    },
    offerCardTextContent: {
      padding: `0 ${theme.spacing(2)}px`,
    },
  };
};

function CaretakerCard(props) {
  const {classes, offer, showAction, interestedCallback, notInterestedCallback} = props;

  return (
    <Card variant="outlined">
      {/*<div className={classes.offerCardId}>{offer._id}</div>*/}
      <CardContent className={classes.offerCardContent}>
        <CardMedia
          className={classes.media}
          image={`${publicURL}/${offer.entity.images[0]}`}
          title="Contemplative Reptile"
        />
        <div className={classes.offerCardTextContent}>
          <div>
            <Typography
              className={classes.offerCardTitle}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {offer.title}
            </Typography>
          </div>
          <div>
            <Typography
              className={classes.username}
              gutterBottom
              variant="body1"
              component="p"
            >
              by @{offer.owner.username}
            </Typography>
          </div>
          <div>
            <Typography
              className={classes.offerCardDescription}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {offer.description}
            </Typography>
          </div>
        </div>
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
  );
}

export default withStyles(styles, {withTheme: true})(CaretakerCard);

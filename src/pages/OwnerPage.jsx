import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  Card,
  CardContent,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
} from "@material-ui/core";
import {
  changeFilterBy,
  changeSearch,
  setIsBiddingRequestDialogOpen,
  setIsOfferDialogOpen,
} from "../actions/ownerPage";
import OfferForm from "../components/OfferForm";
import {getOffersByOwnerId} from "../services/offerService";
import {isAuthenticated} from "../services/loginService";
import {showSnackBar} from "../actions/loginPage";
import {fetchFailed} from "../constants";
import Header from "../components/Header";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import FilterSearch from "../components/FilterSearch";
import BiddingRequestList from "../components/BiddingRequestList";
import MenuDialog from "../components/MenuDialog";

const filterByOptions = ["Title", "Description"];

const styles = (theme) => ({
  ownerPage: {
    height: "100vh",
    overflow: "hidden",
  },
  root: {
    maxWidth: 400,
    minHeight: 262,
  },
  divActionArea: {
    minHeight: 262,
  },
  media: {
    height: 140,
    objectFit: "cover",
  },
  ownerHeader: {},
  container: {
    margin: "40px auto",
    width: "80%",
  },
  filter: {
    width: "100%",
  },
  search: {
    width: "100%",
  },
  body: {
    marginTop: theme.spacing(5),
    height: "calc(100vh - 208px)",
    overflowY: "auto",
  },
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
  divCardContentText: {
    minHeight: "90px",
  },
  // offerCardTitle: {
  //   marginLeft: theme.spacing(3),
  //   height: theme.spacing(3),
  //   textAlign: "justify",
  //   fontSize: "13pt",
  //   fontWeight: "fontWeightBold",
  // },
  offerCardContent: {
    height: theme.spacing(12),
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(3),
  },
  createOfferContent: {
    height: theme.spacing(22),
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(3),
  },
  offerCreatedDate: {
    // marginLeft: theme.spacing(3),
    // marginTop: theme.spacing(2),
    // textAlign: "justify",
    // fontSize: "10pt",
  },
  offerCardDescription: {
    // marginLeft: theme.spacing(3),
    // height: theme.spacing(4),
    // textAlign: "justify",
    // fontSize: "10pt",
    overflowY: "auto",
  },
  offerDurationDates: {
    color: "black",
  },
  interestedButton: {
    width: "100%",
  },
  createOfferButton: {
    borderRadius: "100%",
    width: "176px",
    height: "176px",
    fontSize: "5rem",
    size: "large",
  },
  createOfferText: {
    borderRadius: "100%",
    width: "100%",
    height: "100%",
    marginBottom: "10pt",
    textAlign: "center",
  },
});
function OfferPage(props) {
  const {
    history,
    classes,
    selectedFilterBy,
    searchValue,
    changeFilterBy,
    changeSearch,
    setIsOfferDialogOpen,
    setIsBiddingRequestDialogOpen,
    showSnackBar,
  } = props;

  const [offers, setOffers] = useState([]);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  }

  useEffect(() => {
    function getOffers() {
      getOffersByOwnerId(localStorage["id"])
        .then((response) => {
          setOffers(response);
        })
        .catch((_) => {
          showSnackBar(true, fetchFailed, "error");
        });
    }
    if (!isAuthenticated()) {
      history.push("/");
      window.location.reload();
    }
    getOffers();
  }, [history, showSnackBar]);
  function getCreateOffer() {
    return (
      <Grid item xs={12} md={6} lg={4} key={0}>
        <Card className={classes.root} variant="outlined">
          <CardContent className={classes.createOfferContent}>
            <Button
              variant="contained"
              color="primary"
              className={classes.createOfferButton}
              onClick={() => setIsOfferDialogOpen(true)}
            >
              <AddIcon fontSize="large" />
            </Button>
          </CardContent>
          <div className={classes.createOfferText}>Create New Offer</div>
        </Card>
      </Grid>
    );
  }

  function handleCardClick(offerId) {
    setIsBiddingRequestDialogOpen(true, offerId);
  }

  function getGridItem(index, offer) {
    return (
      <Grid item xs={12} md={6} lg={4} key={index}>
        <Card className={classes.root} variant="outlined">
          <CardActionArea
            className={classes.divActionArea}
            onClick={() => handleCardClick(offer._id)}
          >
            <CardMedia
              className={classes.media}
              image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
              title="Contemplative Reptile"
            />

            <CardContent className={classes.divCardContentText}>
              <Typography
                className={classes.offerCardTitle}
                gutterBottom
                variant="h5"
                component="h2"
              >
                {offer.title}
              </Typography>
              <Typography
                className={classes.offerDurationDates}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Dates: {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
              </Typography>

              <Typography
                className={classes.offerCardDescription}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {offer.description}
              </Typography>
            </CardContent>

            {/*
          <div className={classes.offerCardId}>
            Created on: {formatDate(offer.createdDate)}
          </div>
          <CardContent className={classes.offerCardContent}>
            <img className={classes.offerImage} src={dummyImage} alt={"Pet"} />
          </CardContent>
          <div className={classes.offerCardTitle}>{offer.title}</div>
          <div className={classes.offerCardDescription}>{offer.description}</div>
          <div className={classes.offerCreatedDate}>
            Dates: {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
          </div> */}
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
  if (isAuthenticated()) {
    return (
      <div className={classes.ownerPage}>
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
          <Grid item>
            <Header history={history} />
          </Grid>
        </Grid>

        <div className={classes.container}>
          <div className={classes.ownerHeader}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                Hello, Owner {localStorage["username"]}
              </Grid>
              <Grid item xs={"auto"} md={2} lg={4} />
              <Grid item xs={12} md={7} lg={5}>
                <FilterSearch
                  filterOptions={filterByOptions}
                  changeFilterCallback={(value) => changeFilterBy(value)}
                  changeSearchQueryCallback={(value) => changeSearch(value)}
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.body}>
            <Grid container spacing={2}>
              {getCreateOffer()}
              {offers
                .filter((offer) => {
                  var searchRegex = new RegExp(searchValue, "gi");
                  // todo only show user's own offers
                  if (searchValue === "") {
                    return true;
                  }
                  if (selectedFilterBy === 1) {
                    if (searchRegex.test(offer.title)) {
                      return true;
                    }
                  } else if (selectedFilterBy === 2) {
                    if (searchRegex.test(offer.description)) {
                      return true;
                    }
                  } else if (selectedFilterBy === "") {
                    return true;
                  }
                  return false;
                })
                .map((offer, index) => getGridItem(index, offer))}
            </Grid>
          </div>
          <OfferForm history={history} />
          <BiddingRequestList history={history} />
          <MenuDialog />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const mapStateToProps = ({ownerPage: {selectedFilterBy, searchValue}}) => ({
  selectedFilterBy,
  searchValue,
});

const mapDispatchToProps = {
  changeFilterBy: changeFilterBy,
  changeSearch: changeSearch,
  setIsOfferDialogOpen: setIsOfferDialogOpen,
  setIsBiddingRequestDialogOpen: setIsBiddingRequestDialogOpen,
  showSnackBar: showSnackBar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(OfferPage));

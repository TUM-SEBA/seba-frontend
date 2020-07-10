import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {Button, Card, CardContent, Grid, Tab, Tabs} from "@material-ui/core";
import {changeFilterBy, changeSearch, setIsOfferDialogOpen} from "../actions/ownerPage";
import OfferForm from "../components/OfferForm";
import {getOffersByOwnerId} from "../services/offerService";
import {isAuthenticated} from "../services/loginService";
import {showSnackBar} from "../actions/loginPage";
import {fetchFailed} from "../constants";
import Header from "../components/Header";
import AddIcon from "@material-ui/icons/Add";
import FilterSearch from "../components/FilterSearch";
import BiddingRequestList from "../components/BiddingRequestList";
import MenuDialog from "../components/MenuDialog";
import FeedbackForm from "../components/FeedbackForm";
import OwnerItemCard from "../components/OwnerItemCard";
import EntityList from "../components/EntityList";
import NoData from "../components/NoData";

const filterByOptions = ["Title", "Description"];

const styles = (theme) => ({
  ownerPage: {
    height: "100vh",
  },
  tabroot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(5),
  },
  root: {
    minHeight: 282,
  },
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
    height: "calc(100vh - 350px)",
    overflowY: "auto",
    overflowX: "hidden",
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
  tabOption: {
    marginTop: theme.spacing(4),
    borderBottom: `1px solid rgba(0, 0, 0, 0.3)`,
  },
  tabActive: {
    color: theme.palette.secondary.contrastText,
    background: theme.palette.secondary.main,
    opacity: 1,
  },
  noDataFoundImageContainer: {
    textAlign: "center",
    //width: "100%",
  },
  noDataFoundText: {
    textAlign: "center",
  },
  noDataFound: {
    width: "100%",
  },
  firstOfferButton: {
    width: "200px",
    height: "50px",
  },
  noDataContainer: {
    width: "100%",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
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
    showSnackBar,
  } = props;

  const [offers, setOffers] = useState([]);
  const [activeTab, setActiveTab] = React.useState(0);
  const tabs = ["Offers", "Pending Payments", "Pending Feedbacks"];
  const [disableTab, setDisableTab] = React.useState(false);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  function pendingPaymentCheck(offers) {
    if (offers.some((offer) => offer.status === "Payment Pending")) {
      setDisableTab(true);
      setActiveTab(1);
    }
    if (offers.some((offer) => offer.status === "Completed")) {
      setDisableTab(true);
      setActiveTab(2);
    }
  }

  useEffect(() => {
    function getOffers() {
      getOffersByOwnerId()
        .then((response) => {
          pendingPaymentCheck(response);
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

  const filteredOffers = offers
    .filter((offer) => {
      if (activeTab === 1) {
        if (offer.status === "Payment Pending") return true;
        else return false;
      }
      if (activeTab === 2) {
        if (offer.status === "Completed") return true;
        else return false;
      }
      var searchRegex = new RegExp(searchValue, "gi");
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
    .map((offer, index) => <OwnerItemCard index={index} offer={offer} key={index} />);

  function getCreateOffer() {
    return (
      <Grid item xs={12} md={6} lg={3} key={0}>
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
  function successCallback() {
    getOffersByOwnerId()
      .then((response) => {
        pendingPaymentCheck(response);
        setOffers(response);
      })
      .catch((_) => {
        showSnackBar(true, fetchFailed, "error");
      });
  }
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
        <div className={classes.tabroot}>
          <div className={classes.tabOption}>
            <Tabs value={activeTab}>
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  value={index}
                  disabled={index === 0 && disableTab}
                  className={activeTab === index ? classes.tabActive : ""}
                  label={tab}
                  onClick={() => handleTabClick(index)}
                />
              ))}
            </Tabs>
          </div>
        </div>
        <div className={classes.body}>
          <Grid container spacing={2}>
            {activeTab === 0 && offers.length > 0 && getCreateOffer()}
            {offers.length > 0 ? (
              filteredOffers.length > 0 ? (
                filteredOffers
              ) : (
                <NoData text={"There is no offer based on your search."} />
              )
            ) : (
              <div className={classes.noDataContainer}>
                <NoData text={"You have not previously created an offer."} />
                <div className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.firstOfferButton}
                    onClick={() => setIsOfferDialogOpen(true)}
                  >
                    Create an Offer
                  </Button>
                </div>
              </div>
            )}
          </Grid>
        </div>
        <OfferForm history={history} successCallback={successCallback} />
        <BiddingRequestList history={history} />
        <FeedbackForm history={history} />
        <MenuDialog />
        <EntityList history={history} />
      </div>
    </div>
  );
}

const mapStateToProps = ({ownerPage: {selectedFilterBy, searchValue}}) => ({
  selectedFilterBy,
  searchValue,
});

const mapDispatchToProps = {
  changeFilterBy: changeFilterBy,
  changeSearch: changeSearch,
  setIsOfferDialogOpen: setIsOfferDialogOpen,
  showSnackBar: showSnackBar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(OfferPage));

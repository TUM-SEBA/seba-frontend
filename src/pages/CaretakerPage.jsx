import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {Grid, Typography, Tabs, Tab} from "@material-ui/core";
import {
  changeFilterBy,
  changeSearch,
  setIsBiddingRequestDialogOpen,
} from "../actions/caretakerPage";
import SnackbarAlert from "../components/SnackbarAlert";
import BiddingRequestForm from "../components/BiddingRequestForm";
import {isAuthenticated} from "../services/loginService";
import {showSnackBar} from "../actions/loginPage";
import {fetchFailed, saveFailed, saveSuccess} from "../constants";
import FilterSearch from "../components/FilterSearch";
import CaretakerGrid from "../components/CaretakerGrid";
import Header from "../components/Header";
import noDataFoundImage from "../assets/no-data-found.png";
import dummyDogImage from "../assets/dummy-dog.jpeg";
import {
  getAvailableOffers,
  getInterestedOffers,
  getNotInterestedOffers,
  updateNotInterested,
} from "../services/offerService";

const tabs = ["Available", "Interested", "Not Intereted"];
const getOfferServices = [
  getAvailableOffers,
  getInterestedOffers,
  getNotInterestedOffers,
];
const noOfferMessages = [
  "No offer is available for now. Please check again later.",
  "You do not have any interesting offers yet.",
  "There is no offers that is not interested for you.",
];
const filterByOptions = ["Owner", "Description"];
const styles = (theme) => ({
  container: {
    margin: `${theme.spacing(10)}px auto 0 auto`,
    width: "80%",
  },
  body: {
    marginTop: theme.spacing(5),
  },
  noDataFound: {
    margin: "25px auto",
  },
  noDataFoundImageContainer: {
    textAlign: "center",
  },
  noDataFoundImage: {
    width: "250px",
  },
  noDataFoundTextContainer: {
    textAlign: "center",
  },
  noDataFoundText: {
    fontSize: "14pt",
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
});

function CaretakerPage(props) {
  const {
    history,
    classes,
    selectedFilterBy,
    searchValue,
    changeFilterBy,
    changeSearch,
    setIsBiddingRequestDialogOpen,
    showSnackBar,
  } = props;

  const [offers, setOffers] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  if (!isAuthenticated()) {
    history.push("/");
    window.location.reload();
  }

  function getOffers(index) {
    getOfferServices[index]()
      .then((offers) => {
        setOffers(offers);
      })
      .catch((status) => {
        if (status === 401) {
          history.push("/");
          window.location.reload();
        } else {
          setOffers([]);
        }
        showSnackBar(true, fetchFailed, "error");
      });
  }

  function saveSuccessCallback() {
    getAvailableOffers()
      .then((offers) => {
        setOffers(offers);
      })
      .catch((status) => {
        if (status === 401) {
          history.push("/");
          window.location.reload();
        } else {
          setOffers([]);
        }
        showSnackBar(true, saveFailed, "error");
      });
  }

  useEffect(() => {
    getOfferServices[0]()
      .then((offers) => {
        setOffers(offers);
      })
      .catch((status) => {
        if (status === 401) {
          history.push("/");
          window.location.reload();
        }
        showSnackBar(true, fetchFailed, "error");
      });
  }, [history, showSnackBar]);

  function handleTabClick(index) {
    setActiveTab(index);
    getOffers(index);
  }

  function handleNotInterestedCallback(offerId) {
    updateNotInterested(offerId)
      .then(() => {
        showSnackBar(true, saveSuccess, "success");
        saveSuccessCallback();
      })
      .catch((status) => {
        if (status === 401) {
          history.push("/");
          window.location.reload();
        }
        showSnackBar(true, saveFailed, "error");
      });
  }
  const filteredOffers = offers.filter((offer) => {
    var searchRegex = new RegExp(searchValue, "gi");
    if (searchValue === "") {
      return true;
    }
    if (selectedFilterBy === 1) {
      if (searchRegex.test(offer.owner.username.toString())) {
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
  });
  return (
    <div>
      <div>
        <Header history={history} />
      </div>
      <div className={classes.container}>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              {/*<Typography>Hello, Caretaker</Typography>*/}
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
        <div className={classes.tabOption}>
          <Tabs value={activeTab}>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                value={index}
                className={activeTab === index ? classes.tabActive : ""}
                label={tab}
                onClick={() => handleTabClick(index)}
              />
            ))}
          </Tabs>
        </div>
        <div className={classes.body}>
          <Grid container spacing={2}>
            {offers.length > 0 ? (
              filteredOffers.length > 0 ? (
                filteredOffers.map((offer, index) => {
                  // TODO: remove this when image has been implemented on the backend
                  offer.image = dummyDogImage;
                  return (
                    <CaretakerGrid
                      key={index}
                      offer={offer}
                      showAction={activeTab === 0}
                      interestedCallback={() =>
                        setIsBiddingRequestDialogOpen(true, offer._id)
                      }
                      notInterestedCallback={() => handleNotInterestedCallback(offer._id)}
                    />
                  );
                })
              ) : (
                <div key={"noDataFound"} className={classes.noDataFound}>
                  <div className={classes.noDataFoundImageContainer}>
                    <img
                      className={classes.noDataFoundImage}
                      src={noDataFoundImage}
                      alt={"No Data Found"}
                    />
                  </div>
                  <div className={classes.noDataFoundTextContainer}>
                    <Typography className={classes.noDataFoundText}>
                      There is no offer based on your search.
                    </Typography>
                  </div>
                </div>
              )
            ) : (
              <div key={"noDataFound"} className={classes.noDataFound}>
                <div className={classes.noDataFoundImageContainer}>
                  <img
                    className={classes.noDataFoundImage}
                    src={noDataFoundImage}
                    alt={"No Data Found"}
                  />
                </div>
                <div className={classes.noDataFoundTextContainer}>
                  <Typography className={classes.noDataFoundText}>
                    {noOfferMessages[activeTab]}
                  </Typography>
                </div>
              </div>
            )}
          </Grid>
        </div>
        <BiddingRequestForm history={history} successCallback={saveSuccessCallback} />
        <SnackbarAlert />
      </div>
    </div>
  );
}

const mapStateToProps = ({caretakerPage: {selectedFilterBy, searchValue}}) => ({
  selectedFilterBy,
  searchValue,
});

const mapDispatchToProps = {
  changeFilterBy: changeFilterBy,
  changeSearch: changeSearch,
  setIsBiddingRequestDialogOpen: setIsBiddingRequestDialogOpen,
  showSnackBar: showSnackBar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(CaretakerPage));

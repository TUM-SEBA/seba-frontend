import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {Grid} from "@material-ui/core";
import {
  changeFilterBy,
  changeSearch,
  setIsBiddingRequestDialogOpen,
} from "../actions/caretakerPage";
import SnackbarAlert from "../components/SnackbarAlert";
import BiddingRequestForm from "../components/BiddingRequestForm";
import {getOffersByUsername} from "../services/offerService";
import {isAuthenticated} from "../services/loginService";
import {showSnackBar} from "../actions/loginPage";
import {fetchFailed} from "../constants";
import FilterSearch from "../components/FilterSearch";
import CaretakerGrid from "../components/CaretakerGrid";

const filterByOptions = ["ID", "Description"];
const dummyOffer = {
  image:
    "https://start-cons.com/wp-content/uploads/2019/03/person-dummy-e1553259379744.jpg",
};
const styles = (theme) => ({
  container: {
    margin: `${theme.spacing(10)}px auto 0 auto`,
    width: "80%",
  },
  body: {
    marginTop: theme.spacing(5),
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
  if (!isAuthenticated()) {
    history.push("/");
    window.location.reload();
  }

  function biddingRequestSaveSuccessCallback() {
    getOffersByUsername()
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
  }

  useEffect(() => {
    getOffersByUsername()
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
  if (isAuthenticated()) {
    return (
      <div className={classes.container}>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              Hello, Caretaker
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
            {offers
              .filter((offer) => {
                var searchRegex = new RegExp(searchValue, "gi");
                if (searchValue === "") {
                  return true;
                }
                if (selectedFilterBy === "0") {
                  if (searchRegex.test(offer._id.toString())) {
                    return true;
                  }
                } else if (selectedFilterBy === "1") {
                  if (searchRegex.test(offer.description)) {
                    return true;
                  }
                } else if (selectedFilterBy === "-1") {
                  return true;
                }
                return false;
              })
              .map((offer) => {
                // TODO: remove this when image has been implemented on the backend
                offer.image = dummyOffer.image;
                return (
                  <CaretakerGrid
                    offer={offer}
                    interestedCallback={() =>
                      setIsBiddingRequestDialogOpen(true, offer._id)
                    }
                  />
                );
              })}
          </Grid>
        </div>
        <BiddingRequestForm
          history={history}
          successCallback={biddingRequestSaveSuccessCallback}
        />
        <SnackbarAlert />
      </div>
    );
  } else {
    return <div />;
  }
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

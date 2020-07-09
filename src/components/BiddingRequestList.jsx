import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {Dialog, Grid} from "@material-ui/core";
import {
  biddingRequestChangeSearch,
  biddingRequestListChangeFilterBy,
  setIsAcceptCaretakerConfirmationDialogOpen,
  setIsBiddingRequestDialogOpen,
} from "../actions/ownerPage";
import AcceptCaretakerConfirmation from "./AcceptCaretakerConfirmation";
import FilterSearch from "./FilterSearch";
import {fetchFailed} from "../constants";
import {getBiddingRequestByOffer} from "../services/biddingRequestService";
import {showSnackBar} from "../actions/loginPage";
import {getOffer} from "../services/offerService";
import SnackbarAlert from "./SnackbarAlert";
import BiddingRequestCard from "./BiddingRequestCard";
import NoData from "./NoData";

const filterByOptions = ["ID", "Description"];

const styles = (theme) => ({
  header: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  offerNumber: {
    marginBottom: theme.spacing(3),
  },
  gridContainer: {
    marginTop: theme.spacing(2),
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
});

const initialCustomer = {
  _id: "",
  username: "",
  password: "",
  name: "",
  phoneNumber: "",
  address: "",
  feedbacksGiven: 0,
  starsRecieved: 0,
  badgesEarned: {
    _id: "",
    name: "",
    description: "",
    image: "",
  },
  type: "",
  interestedOffers: [],
};

const initialOffer = {
  _id: "",
  owner: "",
  approveBiddingRequest: {
    _id: "",
    offer: {},
    caretaker: initialCustomer,
    createdDate: "",
    price: 0,
    remarks: "",
  },
  entity: {
    _id: "",
    owner: initialCustomer,
    description: "",
    images: [],
    breed: "",
  },
  review: {
    _id: "",
    offer: {},
    owner: initialCustomer,
    caretaker: initialCustomer,
    text: "",
    rating: 0,
  },
  status: "",
  description: "",
  createdDate: "",
  startDate: "",
  endDate: "",
  insurance: false,
};

function BiddingRequestList(props) {
  const {
    classes,
    history,
    offerId,
    selectedFilterBy,
    changeFilterBy,
    searchValue,
    changeSearch,
    isBiddingRequestDialogOpen,
    setIsBiddingRequestDialogOpen,
    setIsAcceptCaretakerConfirmationDialogOpen,
    showSnackBar,
  } = props;
  const [biddingRequests, setBiddingRequests] = useState([]);
  const [offer, setOffer] = useState(initialOffer);
  useEffect(() => {
    if (offerId) {
      getOffer(offerId)
        .then((offer) => {
          const assignedOffer = Object.assign(initialOffer, offer);
          setOffer(assignedOffer);
          getBiddingRequestByOffer(offerId)
            .then((biddingRequests) => {
              setBiddingRequests(biddingRequests);
            })
            .catch((status) => {
              if (status === 401) {
                history.push("/");
                window.location.reload();
              }
              showSnackBar(true, fetchFailed, "error");
            });
        })
        .catch((status) => {
          if (status === 401) {
            history.push("/");
            window.location.reload();
          }
          showSnackBar(true, fetchFailed, "error");
        });
    }
  }, [offerId, history, showSnackBar]);
  const createdDate = new Date(offer.createdDate);
  const filteredBiddingRequestList = biddingRequests
    .filter((biddingRequest) => {
      const searchRegex = new RegExp(searchValue, "gi");
      if (searchValue === "") {
        return true;
      }
      if (selectedFilterBy === 1) {
        if (searchRegex.test(biddingRequest._id.toString())) {
          return true;
        }
      } else if (selectedFilterBy === 2) {
        if (searchRegex.test(biddingRequest.description)) {
          return true;
        }
      } else if (selectedFilterBy === "") {
        return true;
      }
      return false;
    })
    .map((biddingRequest, index) => (
      <Grid item xs={12} md={6} lg={6} key={index}>
        <BiddingRequestCard
          biddingRequest={biddingRequest}
          acceptCallback={() => {
            setIsAcceptCaretakerConfirmationDialogOpen(true, biddingRequest._id);
          }}
        />
      </Grid>
    ));
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isBiddingRequestDialogOpen}
      onClose={() => setIsBiddingRequestDialogOpen(false, "")}
    >
      <Grid container className={classes.header}>
        <Grid item xs={12} sm={4} md={3} lg={3} className={classes.offerNumber}>
          Offer Title: {offer.title}
        </Grid>
        <Grid item xs={"auto"} sm={"auto"} md={4} lg={4} />
        <Grid item xs={12} sm={8} md={5} lg={5}>
          <FilterSearch
            filterOptions={filterByOptions}
            changeFilterCallback={(value) => changeFilterBy(value)}
            changeSearchQueryCallback={(value) => changeSearch(value)}
          />
        </Grid>
      </Grid>
      <div className={classes.content}>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <div className={classes.line}>{offer.entity.description}</div>
            <div className={classes.line}>
              Created on: {createdDate.toLocaleString("default")}
            </div>
          </Grid>
          <Grid item xs={"auto"} sm={5} md={6} lg={6} />
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <div>Status: {offer.status}</div>
          </Grid>
        </Grid>
        <Grid container className={classes.gridContainer} spacing={2}>
          {biddingRequests.length > 0 ? (
            filteredBiddingRequestList.length > 0 ? (
              filteredBiddingRequestList
            ) : (
              <NoData text={"There is no offer based on your search."} />
            )
          ) : (
            <NoData
              text={"No bidding request is available for now. Please check again later."}
            />
          )}
        </Grid>
      </div>
      <AcceptCaretakerConfirmation history={history} />
      <SnackbarAlert />
    </Dialog>
  );
}

const mapStateToProps = ({
  ownerPage: {
    isBiddingRequestDialogOpen,
    biddingRequestSelectedFilterBy,
    biddingRequestSearchValue,
    offerId,
  },
}) => ({
  isBiddingRequestDialogOpen,
  offerId,
  selectedFilterBy: biddingRequestSelectedFilterBy,
  searchValue: biddingRequestSearchValue,
});

const mapDispatchToProps = {
  changeFilterBy: biddingRequestListChangeFilterBy,
  changeSearch: biddingRequestChangeSearch,
  setIsBiddingRequestDialogOpen: setIsBiddingRequestDialogOpen,
  setIsAcceptCaretakerConfirmationDialogOpen: setIsAcceptCaretakerConfirmationDialogOpen,
  showSnackBar: showSnackBar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(BiddingRequestList));

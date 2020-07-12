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
import {fetchFailed, publicURL, saveFailed, saveSuccess} from "../constants";
import {getBiddingRequestByOffer} from "../services/biddingRequestService";
import {showSnackBar} from "../actions/loginPage";
import {getOffer, rejectOffer} from "../services/offerService";
import SnackbarAlert from "./SnackbarAlert";
import BiddingRequestCard from "./BiddingRequestCard";
import NoData from "./NoData";

const filterByOptions = ["Description"];

const styles = (theme) => ({
  dialog: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  header: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  offerDescriptionContainer: {
    marginBottom: theme.spacing(3),
    display: "flex",
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
  title: {
    textAlign: "justify",
  },
  status: {
    textAlign: "left",
  },
  line: {
    marginTop: theme.spacing(1),
  },
  offerTitle: {
    marginTop: theme.spacing(1),
    fontWeight: "bold",
  },
  entityImage: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: "100%",
    marginTop: theme.spacing(1),
  },
  entityImageContainer: {
    flex: "1 0 25%",
  },
  offerDescription: {
    flex: "1 0 75%",
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
    rejected: false,
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
              const displayedBiddingRequests = biddingRequests.filter(
                (biddingRequest) => {
                  if (assignedOffer.status === "Not Assigned") {
                    if (biddingRequest.rejected) return false;
                    return true;
                  } else {
                    if (biddingRequest._id === assignedOffer.approvedBiddingRequest) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                }
              );
              setBiddingRequests(displayedBiddingRequests);
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
        if (searchRegex.test(biddingRequest.remarks)) {
          return true;
        }
      } else if (selectedFilterBy === -1) {
        return true;
      }
      return false;
    })
    .map((biddingRequest, index) => (
      <Grid item xs={12} md={6} lg={4} key={index}>
        <BiddingRequestCard
          biddingRequest={biddingRequest}
          offer={offer}
          acceptCallback={() => {
            setIsAcceptCaretakerConfirmationDialogOpen(true, biddingRequest);
          }}
          rejectCallback={() => {
            rejectOffer(
              biddingRequest.offer._id,
              biddingRequest._id,
              biddingRequest.caretaker._id
            )
              .then(() => {
                getBiddingRequestByOffer(offerId)
                  .then((biddingRequests) => {
                    const displayedBiddingRequests = biddingRequests.filter(
                      (biddingRequest) => {
                        if (offer.status === "Not Assigned") {
                          if (biddingRequest.rejected) return false;
                          return true;
                        } else {
                          if (biddingRequest._id === offer.approvedBiddingRequest) {
                            return true;
                          } else {
                            return false;
                          }
                        }
                      }
                    );
                    setBiddingRequests(displayedBiddingRequests);
                    showSnackBar(true, saveSuccess, "success");
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
                showSnackBar(true, saveFailed, "error");
              });
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
      <div className={classes.dialog}>
        <Grid container spacing={2} className={classes.header}>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            className={classes.offerDescriptionContainer}
          >
            <div className={classes.entityImageContainer}>
              {offer.entity.images.length > 0 && (
                <img
                  className={classes.entityImage}
                  src={`${publicURL}/${offer.entity.images[0]}`}
                  alt={"Pet"}
                />
              )}
            </div>
            <div className={classes.offerDescription}>
              <div className={classes.offerTitle}>{offer.title}</div>
              <div className={classes.line}>Status: {offer.status}</div>
              <div className={classes.line}>
                Created on: {createdDate.toLocaleString("default")}
              </div>
            </div>
          </Grid>
          <Grid item xs={"auto"} sm={"auto"} md={2} lg={2} />
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <FilterSearch
              filterOptions={filterByOptions}
              changeFilterCallback={(value) => changeFilterBy(value)}
              changeSearchQueryCallback={(value) => changeSearch(value)}
            />
          </Grid>
        </Grid>
        <div className={classes.content}>
          <Grid container className={classes.gridContainer} spacing={2}>
            {biddingRequests.length > 0 ? (
              filteredBiddingRequestList.length > 0 ? (
                filteredBiddingRequestList
              ) : (
                <NoData text={"There is no offer based on your search."} />
              )
            ) : (
              <NoData
                text={
                  "No bidding request is available for now. " +
                  "Please check again later."
                }
              />
            )}
          </Grid>
        </div>
        <AcceptCaretakerConfirmation history={history} />
        <SnackbarAlert />
      </div>
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

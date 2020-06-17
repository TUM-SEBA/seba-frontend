import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  Button,
  Card,
  CardActions,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import {
  biddingRequestChangeSearch,
  biddingRequestListChangeFilterBy,
  setIsAcceptCaretakerConfirmationDialogOpen,
} from "../actions/ownerPage";
import {setIsBiddingRequestDialogOpen} from "../actions/ownerPage";
import AcceptCaretakerConfirmation from "./AcceptCaretakerConfirmation";

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
  filter: {
    width: "100%",
  },
  search: {
    width: "100%",
  },
  biddingRequestImage: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: "100%",
  },
  button: {
    width: "100%",
  },
  gridContainer: {
    marginTop: theme.spacing(2),
  },
  gridItem: {
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
  },
  line: {
    margin: `${theme.spacing(1)}px 0`,
  },
});

const dummyBiddingRequest = {
  image:
    "https://start-cons.com/wp-content/uploads/2019/03/person-dummy-e1553259379744.jpg",
};

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
    offerId,
    selectedFilterBy,
    changeFilterBy,
    searchValue,
    changeSearch,
    isBiddingRequestDialogOpen,
    setIsBiddingRequestDialogOpen,
    setIsAcceptCaretakerConfirmationDialogOpen,
  } = props;
  const [biddingRequests, setBiddingRequests] = useState([]);
  const [offer, setOffer] = useState(initialOffer);
  useEffect(() => {
    // TODO: modify this when backend is connected
    function getBiddingRequestList(offerId) {
      const biddingRequests = [];
      for (let i = 0; i < 5; i++) {
        biddingRequests.push({
          _id: "1",
          offer: {},
          caretaker: {
            _id: "1",
            username: "Username",
            password: "Password",
            name: "Name",
            phoneNumber: "Phone Number",
            address: "Address",
            feedbacksGiven: 0,
            starsRecieved: 0,
            badgesEarned: {
              name: "Badge",
              description: "Desscription",
              image: "Image",
            },
            type: "Type",
            interestedOffers: [],
          },
          createdDate: "",
          price: (i + 1) * 100,
          remarks: "Remarks " + (i + 1),
        });
      }
      setBiddingRequests(biddingRequests);
    }
    // TODO: modify this when backend is connected
    function getOffer(offerId) {
      const offer = {
        _id: "1",
        owner: "Owner",
        approveBiddingRequest: {
          _id: "1",
          offer: {},
          caretaker: initialCustomer,
          createdDate: "2020-01-01",
          price: 0,
          remarks: "Remarks",
        },
        entity: {
          _id: "1",
          owner: initialCustomer,
          description: "Description",
          images: [],
          breed: "Breed",
        },
        review: {
          _id: "1",
          offer: {},
          owner: initialCustomer,
          caretaker: initialCustomer,
          text: "Text",
          rating: 0,
        },
        status: "Status",
        description: "Description",
        createdDate: "2020-01-01",
        startDate: "Start Date",
        endDate: "End Date",
        insurance: false,
      };
      setOffer(offer);
    }
    getBiddingRequestList(offerId);
    getOffer(offerId);
  }, [offerId]);
  function getGridItem(index, biddingRequest) {
    return (
      <Grid item xs={12} md={6} lg={4} key={index}>
        <Card variant="outlined" className={classes.gridItem}>
          <Grid container>
            <Grid item xs={5}>
              <div>
                <img
                  className={classes.biddingRequestImage}
                  src={dummyBiddingRequest.image}
                  alt={"Caretaker"}
                />
              </div>
              <div>{biddingRequest.caretaker.username}</div>
            </Grid>
            <Grid item xs={7}>
              <div className={classes.line}>Price per hr: {biddingRequest.price}</div>
              <div className={classes.line}>Total price: {biddingRequest.price}</div>
              <CardActions>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={4} md={5} lg={6}>
                    <Button
                      variant="contained"
                      className={classes.button}
                      color="secondary"
                      size="small"
                      onClick={() => {
                        setIsAcceptCaretakerConfirmationDialogOpen(
                          true,
                          biddingRequest._id
                        );
                      }}
                    >
                      Accept
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4} md={5} lg={6}>
                    <Button
                      variant="contained"
                      className={classes.button}
                      color="secondary"
                      size="small"
                    >
                      Reject
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isBiddingRequestDialogOpen}
      onClose={() => setIsBiddingRequestDialogOpen(false)}
    >
      <Grid container className={classes.header}>
        <Grid item xs={12} sm={4} md={3} lg={3} className={classes.offerNumber}>
          Offer Number: {offer.offerId}
        </Grid>
        <Grid item xs={"auto"} sm={2} md={6} lg={5} />
        <Grid container item xs={12} sm={6} md={3} lg={4} spacing={2}>
          <Grid item xs={12} sm={4} md={5}>
            <FormControl className={classes.filter}>
              <InputLabel htmlFor="filter-by">Filter by</InputLabel>
              <Select
                native
                value={selectedFilterBy}
                onChange={(event) => {
                  changeFilterBy(event.target.value);
                }}
                inputProps={{
                  id: "filter-by",
                }}
                color="secondary"
              >
                <option key="-1" aria-label="None" value="-1" />
                {filterByOptions.map((value, index) => (
                  <option key={index} value={index}>
                    {value}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <TextField
              className={classes.search}
              value={searchValue}
              onChange={(event) => {
                changeSearch(event.target.value);
              }}
              color="secondary"
              label="Search"
            />
          </Grid>
          <Grid item xs={"auto"} sm={2} md={"auto"} />
        </Grid>
      </Grid>
      <div className={classes.content}>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <div className={classes.line}>{offer.entity._id}</div>
            <div className={classes.line}>{offer.entity.description}</div>
            <div className={classes.line}>Created on: {offer.createdDate}</div>
          </Grid>
          <Grid item xs={"auto"} sm={5} md={6} lg={6} />
          <Grid item xs={12} sm={3} md={2} lg={2}>
            <div>Status: {offer.status}</div>
          </Grid>
        </Grid>
        <Grid container className={classes.gridContainer} spacing={2}>
          {biddingRequests
            .filter((biddingRequest) => {
              var searchRegex = new RegExp(searchValue, "gi");
              if (searchValue === "") {
                return true;
              }
              if (selectedFilterBy === "0") {
                if (searchRegex.test(biddingRequest._id.toString())) {
                  return true;
                }
              } else if (selectedFilterBy === "1") {
                if (searchRegex.test(biddingRequest.description)) {
                  return true;
                }
              } else if (selectedFilterBy === "-1") {
                return true;
              }
              return false;
            })
            .map((biddingRequest, index) => getGridItem(index, biddingRequest))}
        </Grid>
      </div>
      <AcceptCaretakerConfirmation />
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(BiddingRequestList));

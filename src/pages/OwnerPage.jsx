import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  Card,
  CardContent,
  Button,
  Grid,
} from "@material-ui/core";
import {changeFilterBy, changeSearch, setIsOfferDialogOpen} from "../actions/ownerPage";
import SnackbarAlert from "../components/SnackbarAlert";
import OfferForm from "../components/OfferForm";
import {getOffersByOwnerId} from "../services/offerService";
import {isAuthenticated} from "../services/loginService";
import {showSnackBar} from "../actions/loginPage";
import {fetchFailed} from "../constants";
import Header from "../components/Header";
import AddIcon from "@material-ui/icons/Add";

const filterByOptions = ["ID", "Description"];
const dummyImage =
  "https://start-cons.com/wp-content/uploads/2019/03/person-dummy-e1553259379744.jpg";

const styles = (theme) => ({
  container: {
    margin: `${theme.spacing(10)}px auto 0 auto`,
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
  offerCardTitle: {
    marginLeft: theme.spacing(3),
    height: theme.spacing(3),
    textAlign: "justify",
    fontSize: "13pt",
    fontWeight: "fontWeightBold",
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
  offerCreatedDate: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
    textAlign: "justify",
    fontSize: "10pt",
  },
  offerCardDescription: {
    marginLeft: theme.spacing(3),
    height: theme.spacing(4),
    textAlign: "justify",
    fontSize: "10pt",
    overflowY: "scroll",
  },
  interestedButton: {
    width: "100%",
  },
  createOfferButton: {
    borderRadius: "100%",
    width: "50%",
    height: "100%",
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
        <Card variant="outlined">
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
  function getGridItem(index, offer) {
    return (
      <Grid item xs={12} md={6} lg={4} key={index}>
        <Card variant="outlined">
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
          </div>
        </Card>
      </Grid>
    );
  }
  if (isAuthenticated()) {
    return (
      <div>
        <Grid container direction="column" justify="flex-start" alignItems="stretch">
          <Grid item>
            <Header history={history} />
          </Grid>
        </Grid>

        <div className={classes.container}>
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                Hello, Owner {localStorage["username"]}
              </Grid>
              <Grid item xs={"auto"} md={2} lg={4} />
              <Grid container item xs={12} md={7} lg={5} spacing={2}>
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
                .map((offer, index) => getGridItem(index, offer))}
            </Grid>
          </div>
          <OfferForm history={history} />
          <SnackbarAlert />
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
  showSnackBar: showSnackBar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(OfferPage));

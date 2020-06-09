import React from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";
import {
  changeFilterBy,
  changeSearch,
  setIsBiddingRequestDialogOpen,
} from "../actions/caretakerPage";
import SnackbarAlert from "../components/SnackbarAlert";
import BiddingRequestForm from "../components/BiddingRequestForm";

const filterByOptions = ["ID", "Description"];

// TODO: remove this when backend is connected
const dummyOffer = {
  image:
    "https://start-cons.com/wp-content/uploads/2019/03/person-dummy-e1553259379744.jpg",
  description:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
  length: 10,
};

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
  offerCardContent: {
    height: theme.spacing(12),
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(3),
  },
  offerCardDescription: {
    marginLeft: theme.spacing(3),
    textAlign: "justify",
    fontSize: "10pt",
    overflow: "scroll",
  },
  offerCardActions: {
    justifyContent: "flex-end",
  },
  button: {
    width: "100%",
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
  } = props;
  function getGridItem(index) {
    return (
      <Grid item xs={12} md={6} lg={4} key={index}>
        <Card variant="outlined">
          <div className={classes.offerCardId}>{index}</div>
          <CardContent className={classes.offerCardContent}>
            <div>
              <img className={classes.offerImage} src={dummyOffer.image} alt={"Pet"} />
            </div>
            <div className={classes.offerCardDescription}>{dummyOffer.description}</div>
          </CardContent>
          <CardActions className={classes.offerCardActions}>
            <Grid container spacing={1}>
              <Grid item xs={"auto"} sm={5} md={3} lg={2} />
              <Grid item xs={12} sm={3} md={4} lg={4}>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="secondary"
                  size="small"
                  onClick={() => setIsBiddingRequestDialogOpen(true, index)}
                >
                  Interested
                </Button>
              </Grid>
              <Grid item xs={12} sm={4} md={5} lg={6}>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="secondary"
                  size="small"
                >
                  Not Interested
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    );
  }
  return (
    <div className={classes.container}>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            Hello, Caretaker
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
          {Array.from(Array(dummyOffer.length).keys())
            .filter((index) => {
              if (searchValue === "") {
                return true;
              }
              if (selectedFilterBy === "0") {
                if (index.toString() === searchValue) {
                  return true;
                }
              } else if (selectedFilterBy === "1") {
                var searchRegex = new RegExp(searchValue, "gi");
                if (searchRegex.test(dummyOffer.description)) {
                  return true;
                }
              } else if (selectedFilterBy === "-1") {
                return true;
              }
              return false;
            })
            .map((index) => getGridItem(index))}
        </Grid>
      </div>
      <BiddingRequestForm history={history} />
      <SnackbarAlert />
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(CaretakerPage));

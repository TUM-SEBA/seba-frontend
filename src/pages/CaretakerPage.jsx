import React from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  GridList,
  GridListTile,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import {changeFilterBy, changeSearch} from "../actions/caretakerPage";

const filterByOptions = ["ID", "Description"];

// TODO: remove this when backend is connected
const dummyOffer = {
  image:
    "https://start-cons.com/wp-content/uploads/2019/03/person-dummy-e1553259379744.jpg",
  description:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
};

const styles = (theme) => ({
  container: {
    margin: `${theme.spacing(10)}px auto 0 auto`,
    width: "80%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  filter: {
    width: theme.spacing(20),
  },
  search: {
    width: theme.spacing(30),
    marginLeft: theme.spacing(3),
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
  },
  offerCardActions: {
    justifyContent: "flex-end",
  },
});

function CaretakerPage(props) {
  const {classes, selectedFilterBy, searchValue, changeFilterBy, changeSearch} = props;
  function getGridListTile(index) {
    return (
      <GridListTile key={index}>
        <Card variant="outlined">
          <div className={classes.offerCardId}>{index}</div>
          <CardContent className={classes.offerCardContent}>
            <div>
              <img className={classes.offerImage} src={dummyOffer.image} alt={"Pet"} />
            </div>
            <div className={classes.offerCardDescription}>{dummyOffer.description}</div>
          </CardContent>
          <CardActions className={classes.offerCardActions}>
            <Button variant="contained" color="secondary" size="small">
              Interested
            </Button>
            <Button variant="contained" color="secondary" size="small">
              Not Interested
            </Button>
          </CardActions>
        </Card>
      </GridListTile>
    );
  }
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>Hello, Caretaker</div>
        <div>
          <form>
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
            <TextField
              className={classes.search}
              value={searchValue}
              onChange={(event) => {
                changeSearch(event.target.value);
              }}
              color="secondary"
              label="Search"
            />
          </form>
        </div>
      </div>
      <div className={classes.body}>
        <GridList cellHeight={210} cols={3} spacing={25}>
          {Array.from(Array(10).keys())
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
            .map((index) => getGridListTile(index))}
        </GridList>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(CaretakerPage));

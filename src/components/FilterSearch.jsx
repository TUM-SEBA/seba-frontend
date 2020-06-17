import React, {useState} from "react";
import {withStyles} from "@material-ui/styles";
import {FormControl, Grid, InputLabel, Select, TextField} from "@material-ui/core";

const styles = (theme) => ({
  filter: {
    width: "100%",
  },
  search: {
    width: "100%",
  },
});

function FilterSearch(props) {
  const {classes, filterOptions, changeFilterCallback, changeSearchQueryCallback} = props;
  const [filterValue, setFilterValue] = useState("");
  const [searchQueryValue, setSearchQueryValue] = useState("");
  function handleChangeFilter(event) {
    const value = event.target.value;
    setFilterValue(value);
    if (changeFilterCallback) changeFilterCallback(event.target.value);
  }
  function handleSearchQuery(event) {
    const value = event.target.value;
    setSearchQueryValue(value);
    if (changeFilterCallback) changeSearchQueryCallback(event.target.value);
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} md={5}>
        <FormControl className={classes.filter}>
          <InputLabel htmlFor="filter-by">Filter by</InputLabel>
          <Select
            native
            value={filterValue}
            onChange={handleChangeFilter}
            inputProps={{
              id: "filter-by",
            }}
            color="secondary"
          >
            <option key="-1" aria-label="None" value="-1" />
            {filterOptions.map((value, index) => (
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
          value={searchQueryValue}
          onChange={handleSearchQuery}
          color="secondary"
          label="Search"
        />
      </Grid>
      <Grid item xs={"auto"} sm={2} md={"auto"} />
    </Grid>
  );
}

export default withStyles(styles, {withTheme: true})(FilterSearch);

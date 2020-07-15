/**
 * NoData: Component that will be displayed when there is no data to be displayed.
 */

import React from "react";
import {withStyles} from "@material-ui/styles";
import {Typography} from "@material-ui/core";
import noDataFoundImage from "../assets/no-data-found.png";

const styles = (theme) => ({
  noDataFound: {
    margin: "15px auto",
    width: "100%",
    textAlign: "center",
  },
  noDataFoundImage: {
    width: "250px",
  },
  noDataFoundText: {
    fontSize: "14pt",
  },
});

function NoData(props) {
  const {classes, text} = props;
  return (
    <div key={"noDataFound"} className={classes.noDataFound}>
      <div>
        <img
          className={classes.noDataFoundImage}
          src={noDataFoundImage}
          alt={"No Data Found"}
        />
      </div>
      <div>
        <Typography className={classes.noDataFoundText}>{text}</Typography>
      </div>
    </div>
  );
}

export default withStyles(styles, {withTheme: true})(NoData);

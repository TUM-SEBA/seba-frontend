import React from "react";
import {withStyles} from "@material-ui/styles";
import {Typography} from "@material-ui/core";
import noDataFoundImage from "../assets/no-data-found.png";

const styles = (theme) => ({
  noDataFound: {
    margin: "25px auto",
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

function EntityList(props) {
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

export default withStyles(styles, {withTheme: true})(EntityList);

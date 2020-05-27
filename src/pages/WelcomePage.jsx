import React from "react";
import {withStyles} from "@material-ui/styles";

function WelcomePage(props) {
  return (
    <div>
      <p>Welcome</p>
    </div>
  );
}

export default withStyles({withTheme: true})(WelcomePage);

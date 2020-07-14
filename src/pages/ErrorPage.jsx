import React from "react";
import {withStyles} from "@material-ui/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

//The error page redirection in case of a major error
function ErrorPage(props) {
  const {history} = props;
  return (
    <div>
      <Dialog open={true}>
        <DialogTitle>{"Error 404: Page not found"}</DialogTitle>
        <DialogContent>
          <DialogContentText>The requested page does not exist.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              history.push("/");
              window.location.reload();
            }}
            color="secondary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles({withTheme: true})(ErrorPage);

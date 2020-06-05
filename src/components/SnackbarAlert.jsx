import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {showSnackBar} from "../actions/loginPage";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackbarAlert(props) {
  const {snackBarData, showSnackBar} = props;
  return (
    <Snackbar
      open={snackBarData.openSnackBar}
      autoHideDuration={4000}
      onClose={() => showSnackBar(false, snackBarData.message, snackBarData.severity)}
    >
      <Alert
        onClose={() => showSnackBar(false, snackBarData.message, snackBarData.severity)}
        severity={snackBarData.severity}
      >
        {snackBarData.message}
      </Alert>
    </Snackbar>
  );
}
const mapStateToProps = ({loginPage: {snackBarData}}) => ({
  snackBarData,
});

const mapDispatchToProps = {
  showSnackBar: showSnackBar,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles({withTheme: true})(SnackbarAlert));

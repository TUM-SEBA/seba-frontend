import React from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  Button,
  TextField,
  Avatar,
  Typography,
  Container,
  Collapse,
  Paper,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {
  changeUserId,
  changePassword,
  setLoginAlert,
  setIsSignUpDialogOpen,
  setForgotPasswordDialogOpen,
  showSnackBar,
} from "../actions/loginPage";
import {loginCustomer} from "../services/loginService";
import SignUpForm from "../components/SignUpForm";
import SnackbarAlert from "../components/SnackbarAlert";
import ForgotPasswordDialog from "../components/ForgotPasswordDialog";
import {loginSuccess} from "../constants";
import logo from "../logoSEBA.png";
import displayImage from "../assets/loginPageImage.jpg";

const styles = (theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(5),
  },
  rowFlex: {
    marginTop: theme.spacing(18),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
  alert: {
    margin: theme.spacing(1),
  },
  signUp: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
  forgotPass: {
    display: "flex",
    justifyContent: "flex-end",
  },
  loginImage: {
    maxWidth: "50%",
    maxheight: "100%",
  },
});

const CustomTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "grey",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "grey",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "grey",
      },
    },
  },
})(TextField);

function LoginPage(props) {
  const {
    classes,
    selectedUserId,
    selectedPassword,
    showAlert,
    loginAlertText,
    changeUserId,
    changePassword,
    setLoginAlert,
    setIsSignUpDialogOpen,
    setForgotPasswordDialogOpen,
    showSnackBar,
    loginCustomer,
  } = props;

  function handleLoginSuccess() {
    showSnackBar(true, loginSuccess, "success");
    window.location.reload();
  }

  async function attemptLoginHandler(username, password) {
    setLoginAlert(false);
    await loginCustomer(username, password).then((status) =>
      status ? handleLoginSuccess() : setLoginAlert(true)
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper>
        <div className={classes.rowFlex}>
          <img alt="display" src={displayImage} className={classes.loginImage} />

          <div className={classes.paper}>
            <Avatar className={classes.avatar} src={logo}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <CustomTextField
                fullWidth
                autoFocus
                required
                margin="dense"
                id="userId"
                label="Username"
                type="text"
                variant="outlined"
                value={selectedUserId}
                onChange={(event) => {
                  changeUserId(event.target.value);
                }}
              />
              <CustomTextField
                fullWidth
                required
                margin="dense"
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={selectedPassword}
                onChange={(event) => {
                  changePassword(event.target.value);
                }}
              />
              <div className={classes.forgotPass}>
                <Button
                  color="secondary"
                  style={{backgroundColor: "transparent", textTransform: "none"}}
                  onClick={() => setForgotPasswordDialogOpen(true)}
                >
                  <Typography variant="body2">Forgot Password?</Typography>
                </Button>
              </div>
              <Collapse in={showAlert}>
                <Alert
                  severity="error"
                  className={classes.alert}
                  onClose={() => setLoginAlert(false)}
                >
                  {loginAlertText}
                </Alert>
              </Collapse>
              <Button
                fullWidth
                className={classes.submit}
                variant="contained"
                color="secondary"
                onClick={() => attemptLoginHandler(selectedUserId, selectedPassword)}
              >
                LogIn
              </Button>
            </form>
            <div className={classes.signUp}>
              <Typography variant="body1">Don't have an account?</Typography>
              <Button
                color="secondary"
                style={{backgroundColor: "transparent"}}
                onClick={() => setIsSignUpDialogOpen(true)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </Paper>
      <SignUpForm />
      <ForgotPasswordDialog />
      <SnackbarAlert />
    </Container>
  );
}

const mapStateToProps = ({
  loginPage: {selectedUserId, selectedPassword, showAlert, loginAlertText},
}) => ({
  selectedUserId,
  selectedPassword,
  showAlert,
  loginAlertText,
});

const mapDispatchToProps = {
  changeUserId: changeUserId,
  changePassword: changePassword,
  setLoginAlert: setLoginAlert,
  setIsSignUpDialogOpen: setIsSignUpDialogOpen,
  showSnackBar: showSnackBar,
  loginCustomer: loginCustomer,
  setForgotPasswordDialogOpen: setForgotPasswordDialogOpen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(LoginPage));

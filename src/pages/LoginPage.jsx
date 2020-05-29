import React from "react";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  Button,
  TextField,
  CssBaseline,
  Avatar,
  Typography,
  Container,
  Collapse,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import {changeUserId, changePassword, setLoginAlert} from "../actions/loginPage";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  alert: {
    margin: theme.spacing(1),
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
    changeUserId,
    changePassword,
    setLoginAlert,
  } = props;

  function attemptLoginHandler(username, password) {
    setLoginAlert(false);
    if (username === "user" && password === "pass") alert("Login Successful");
    else setLoginAlert(true);
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
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
            <Collapse in={showAlert}>
              <Alert
                severity="error"
                className={classes.alert}
                onClose={() => setLoginAlert(false)}
              >
                Invalid username or password
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
        </div>
      </Container>
    </div>
  );
}

const mapStateToProps = ({loginPage: {selectedUserId, selectedPassword, showAlert}}) => ({
  selectedUserId,
  selectedPassword,
  showAlert,
});

const mapDispatchToProps = {
  changeUserId: changeUserId,
  changePassword: changePassword,
  setLoginAlert: setLoginAlert,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(LoginPage));

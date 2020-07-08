import {authURL} from "../constants";
import {setLoginAlertText, showSnackBar} from "../actions/loginPage";

export let invalidRequest = async (response) => {
  let error = new Error();
  const res = await response.json();
  error.message = res.message;
  return error;
};

export function isAuthenticated() {
  return localStorage["token"] ? true : false;
}

export function signUpCustomer(signUpFields) {
  const body = {
    username: signUpFields.username,
    password: signUpFields.password,
    name: signUpFields.name,
    phoneNumber: signUpFields.phoneNumber,
    address: signUpFields.address,
    email: signUpFields.email,
  };
  return fetch(authURL + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      else throw invalidRequest(response);
    })
    .then(() => {
      return true;
    })
    .catch((err) => {
      return false;
    });
}

export function loginCustomer(username, password) {
  const body = {
    username: username,
    password: password,
  };
  return (dispatch) => {
    return fetch(authURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw invalidRequest(response);
      })
      .then((result) => {
        localStorage["token"] = result.token;
        localStorage["username"] = username;
        if (result.shouldChangePassword) localStorage["shouldChangePassword"] = true;
        return true;
      })
      .catch(async (err) => {
        const errorMessage = await err.then((err) => err.message);
        dispatch(setLoginAlertText(errorMessage));
        return false;
      });
  };
}

export function logout() {
  return (dispatch) => {
    return fetch(authURL + "/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage["token"]}`,
      },
    })
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        if (response.status !== 200) throw invalidRequest(response);
      })
      .then(() => {
        dispatch(showSnackBar(true, "Logout Successful", "success"));
        window.location.reload();
      })
      .catch(() => {
        dispatch(showSnackBar(true, "Invalid Session", "error"));
        window.location.reload();
      });
  };
}

export function forgotPassword(email) {
  const body = {
    email: email,
  };
  return (dispatch) => {
    return fetch(authURL + "/forgotPass", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw invalidRequest(response);
      })
      .then((result) => {
        dispatch(showSnackBar(true, result.message, "success"));
        return true;
      })
      .catch(async (err) => {
        const errorMessage = await err.then((error) => error.message);
        dispatch(showSnackBar(true, errorMessage, "error"));
        return false;
      });
  };
}

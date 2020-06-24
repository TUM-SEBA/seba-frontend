import {authURL} from "../constants";
import {invalidRequest} from "./loginService";
import {saveMyBadges, setIsChangePasswordDialogOpen} from "../actions/welcomePage";
import {showSnackBar} from "../actions/loginPage";

export function getMyBadges() {
  return (dispatch) => {
    return fetch(authURL + "/mybadges", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage["token"]}`,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw invalidRequest(response);
      })
      .then((result) => {
        dispatch(saveMyBadges(result));
      })
      .catch(() => {
        console.log("Invalid Request");
        return false;
      });
  };
}

export function changePassword(currentPassword, newPassword) {
  const body = {
    currentPassword: currentPassword,
    newPassword: newPassword,
  };
  return (dispatch) => {
    return fetch(authURL + "/changePassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage["token"]}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw invalidRequest(response);
      })
      .then((result) => {
        dispatch(showSnackBar(true, result.message, "success"));
        dispatch(setIsChangePasswordDialogOpen(false));
        if (localStorage.getItem("shouldChangePassword"))
          localStorage.removeItem("shouldChangePassword");
      })
      .catch(async (err) => {
        const errorMessage = await err.then((error) => error.message);
        dispatch(showSnackBar(true, errorMessage, "error"));
      });
  };
}

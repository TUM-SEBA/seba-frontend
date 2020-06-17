import {authURL} from "../constants";
import {invalidRequest} from "./loginService";
import {saveMyBadges} from "../actions/welcomePage";

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
        else throw invalidRequest();
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

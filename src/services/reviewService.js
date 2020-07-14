import {reviewURL} from "../constants";
import {checkInvalidRequest} from "./loginService";

export function insertReview(review) {
  return new Promise((resolve, reject) => {
    fetch(reviewURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage["token"]}`,
      },
      body: JSON.stringify(review),
    }).then((response) => {
      if (response.status === 201) {
        resolve();
      } else {
        reject(response.status);
      }
    });
  });
}

export function getReviewsByMyCaretakerId() {
  return new Promise((resolve, reject) => {
    fetch(`${reviewURL}/user/listByCaretakerId`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage["token"]}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(response.status);
            });
        } else {
          checkInvalidRequest(response.status);
          reject(response.status);
        }
      })
      .catch((_) => {
        reject(500);
      });
  });
}

export function getReviewsByCaretakerId(caretakerId) {
  return new Promise((resolve, reject) => {
    fetch(`${reviewURL}/user/${caretakerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage["token"]}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(response.status);
            });
        } else {
          checkInvalidRequest(response.status);
          reject(response.status);
        }
      })
      .catch((_) => {
        reject(500);
      });
  });
}

import {offerURL} from "../constants";

export async function getOffersByUsername() {
  return new Promise((resolve, reject) => {
    fetch(offerURL + "/caretaker/" + localStorage["username"], {
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
            .catch((_) => {
              reject(response.status);
            });
        } else {
          reject(response.status);
        }
      })
      .catch((_) => {
        reject(500);
      });
  });
}

export function insertOffer(offer) {
  const body = {
    owner: offer.owner,
    description: offer.description,
    startDate: offer.startDate,
    endDate: offer.endDate,
  };
  return new Promise((resolve, reject) => {
    fetch(offerURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage["token"]}`,
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status === 201) {
        resolve();
      } else {
        reject(response.status);
      }
    });
  });
}

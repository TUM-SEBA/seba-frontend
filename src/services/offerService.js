import {offerURL} from "../constants";

export function getOffersByUsername() {
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/caretaker/${localStorage["username"]}`, {
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

export function getOffer(offerId) {
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/${offerId}`, {
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
    createdDate: offer.createdDate,
    title: offer.title,
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

export function acceptOffer(offerId, approveBiddingRequestId, insurance) {
  const body = {
    approveBiddingRequestId: approveBiddingRequestId,
    insurance: insurance,
  };
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/accept/${offerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage["token"]}`,
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.status === 200) {
        resolve();
      } else {
        reject(response.status);
      }
    });
  });
}

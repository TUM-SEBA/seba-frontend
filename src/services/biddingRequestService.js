import {biddingRequestURL} from "../constants";

export function insertBiddingRequest(biddingRequest) {
  const body = {
    offer: biddingRequest.offer,
    caretaker: biddingRequest.caretaker,
    price: biddingRequest.price,
    remarks: biddingRequest.remarks,
  };
  return new Promise((resolve, reject) => {
    fetch(biddingRequestURL, {
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

export function getBiddingRequestByOffer(offerId) {
  return new Promise((resolve, reject) => {
    fetch(`${biddingRequestURL}/offer/${offerId}`, {
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

export function getCaretakerFromBiddingRequest(biddingRequestId) {
  return new Promise((resolve, reject) => {
    fetch(`${biddingRequestURL}/caretaker/${biddingRequestId}`, {
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

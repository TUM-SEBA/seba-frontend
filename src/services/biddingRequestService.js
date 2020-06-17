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

import {offerURL} from "../constants";

export async function getAllOffer() {
  return fetch(offerURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage["token"]}`,
    },
  }).then((response) => {
    return response.json();
  });
}

import {reviewURL} from "../constants";

export function insertReview(review) {
  const body = {
    offer: review.offer,
    text: review.text,
    rating: review.rating,
  };
  return new Promise((resolve, reject) => {
    fetch(reviewURL, {
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

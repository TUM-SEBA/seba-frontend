import {offerURL} from "../constants";

export function getAvailableOffers() {
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/available`, {
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

export function getInterestedOffers() {
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/interested`, {
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

export function getNotInterestedOffers() {
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/not-interested`, {
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

export function insertOffer(offer, images) {
  const formData = new FormData();
  formData.append("description", offer.description);
  formData.append("category", offer.category);
  formData.append("startDate", offer.startDate);
  formData.append("endDate", offer.endDate);
  formData.append("createdDate", offer.createdDate);
  formData.append("title", offer.title);
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }
  return new Promise((resolve, reject) => {
    fetch(offerURL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage["token"]}`,
      },
      body: formData,
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

export function updateNotInterested(offerId) {
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/not-interested/${offerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage["token"]}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        resolve();
      } else {
        reject(response.status);
      }
    });
  });
}

export function getOffersByOwnerId() {
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/user/listByOwnerId`, {
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

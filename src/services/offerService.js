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

export function getRejectedOffers() {
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/rejected`, {
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
    entity: offer.entity,
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

export function acceptOffer(offerId, approveBiddingRequestId, price, insurance) {
  const body = {
    approvedBiddingRequest: approveBiddingRequestId,
    price: price,
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

export function rejectOffer(offerId, biddingRequestId, caretakerId) {
  const body = {
    caretakerId: caretakerId,
    biddingRequestId: biddingRequestId,
  };
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/reject/${offerId}`, {
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

export function caretakingCompleted(offerId) {
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/paymentPending/${offerId}`, {
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

export function postPaymentCompleted(offerId) {
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/completed/${offerId}`, {
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

export function closeOffer(offerId) {
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/closed/${offerId}`, {
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

export function disableOfferNotification(offerId) {
  return new Promise((resolve, reject) => {
    fetch(`${offerURL}/disablenotification/${offerId}`, {
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

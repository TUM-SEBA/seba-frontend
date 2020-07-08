import {entityURL} from "../constants";

export function getEntities() {
  return new Promise((resolve, reject) => {
    fetch(`${entityURL}`, {
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

export function insertEntity(entity) {
  const body = {
    category: entity.category,
    breed: entity.breed,
    description: entity.description,
  };
  return new Promise((resolve, reject) => {
    fetch(entityURL, {
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

export function updateEntity(entity) {
  const body = {
    category: entity.category,
    breed: entity.breed,
    description: entity.description,
  };
  return new Promise((resolve, reject) => {
    fetch(`entityURL/${entity._id}`, {
      method: "PUT",
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

export function deleteEntity(entityId) {
  return new Promise((resolve, reject) => {
    fetch(`entityURL/${entityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage["token"]}`,
      },
    }).then((response) => {
      if (response.status === 201) {
        resolve();
      } else {
        reject(response.status);
      }
    });
  });
}

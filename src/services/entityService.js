import {entityURL} from "../constants";
import {checkInvalidRequest} from "./loginService";

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
          checkInvalidRequest(response.status);
          reject(response.status);
        }
      })
      .catch((_) => {
        reject(500);
      });
  });
}

export function insertEntity(entity, images) {
  const formData = new FormData();
  formData.append("category", entity.category);
  formData.append("name", entity.name);
  formData.append("breed", entity.breed);
  formData.append("description", entity.description);
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }
  return new Promise((resolve, reject) => {
    fetch(entityURL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage["token"]}`,
      },
      body: formData,
    }).then((response) => {
      if (response.status === 201) {
        resolve();
      } else {
        checkInvalidRequest(response.status);
        reject(response.status);
      }
    });
  });
}

export function updateEntity(entity, images) {
  const formData = new FormData();
  formData.append("category", entity.category);
  formData.append("name", entity.name);
  formData.append("breed", entity.breed);
  formData.append("description", entity.description);
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }
  return new Promise((resolve, reject) => {
    fetch(`${entityURL}/${entity._id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage["token"]}`,
      },
      body: formData,
    }).then((response) => {
      if (response.status === 200) {
        resolve();
      } else {
        checkInvalidRequest(response.status);
        reject(response.status);
      }
    });
  });
}

export function deleteEntity(entityId) {
  return new Promise((resolve, reject) => {
    fetch(`${entityURL}/${entityId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage["token"]}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        resolve();
      } else {
        checkInvalidRequest(response.status);
        reject(response.status);
      }
    });
  });
}

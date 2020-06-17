import {authURL} from "../constants";

export let invalidRequest = () => {
  let error = new Error();
  error.name = "Invalid Request";
  return error;
};

export function isAuthenticated() {
  return localStorage["token"] ? true : false;
}

export function signUpCustomer(signUpFields) {
  const body = {
    username: signUpFields.username,
    password: signUpFields.password,
    name: signUpFields.name,
    phoneNumber: signUpFields.phoneNumber,
    address: signUpFields.address,
  };
  return fetch(authURL + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      else throw invalidRequest();
    })
    .then(() => {
      return true;
    })
    .catch(() => {
      console.log("Invalid Request");
      return false;
    });
}

export function loginCustomer(username, password) {
  const body = {
    username: username,
    password: password,
  };
  return fetch(authURL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.status === 200) return response.json();
      else throw invalidRequest();
    })
    .then((result) => {
      localStorage["token"] = result.token;
      localStorage["username"] = username;
      return true;
    })
    .catch(() => {
      console.log("Invalid Request");
      return false;
    });
}

export function logout() {
  return fetch(authURL + "/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage["token"]}`,
    },
  })
    .then((response) => {
      console.log(response.status);
      if (response.status !== 200) throw invalidRequest();
    })
    .then(() => {
      console.log("Hello World");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      return true;
    })
    .catch(() => {
      console.log("Invalid Request");
      return false;
    });
}

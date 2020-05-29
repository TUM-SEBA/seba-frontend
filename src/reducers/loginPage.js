import {CHANGEUSERID, CHANGEPASSWORD, SETLOGINALERT} from "../actions/loginPage";

let initialState = {
  selectedUserId: "",
  selectedPassword: "",
  showAlert: false,
};

export default function loginPage(state = initialState, action) {
  switch (action.type) {
    case CHANGEUSERID:
      return {
        ...state,
        selectedUserId: action.value,
      };
    case CHANGEPASSWORD:
      return {
        ...state,
        selectedPassword: action.value,
      };
    case SETLOGINALERT:
      return {
        ...state,
        showAlert: action.value,
      };
    default:
      return state;
  }
}

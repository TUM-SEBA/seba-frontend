import {
  CHANGEUSERID,
  CHANGEPASSWORD,
  SETLOGINALERT,
  SETLOGINALERTTEXT,
  SETISSIGNUPDIALOGOPEN,
  SETFORGOTPASSWORDDIALOGOPEN,
  SETISSIGNUPFIELDVALUE,
  SHOWSNACKBAR,
} from "../actions/loginPage";

let initialState = {
  selectedUserId: "",
  selectedPassword: "",
  showAlert: false,
  loginAlertText: "Invalid username or password",
  isSignUpDialogOpen: false,
  isForgotPasswordDialogOpen: false,
  signUpFields: {
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
  },
  snackBarData: {
    openSnackBar: false,
    message: "",
    severity: "success",
  },
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
    case SETLOGINALERTTEXT:
      return {
        ...state,
        loginAlertText: action.value,
      };
    case SETISSIGNUPDIALOGOPEN:
      return {
        ...state,
        isSignUpDialogOpen: action.value,
        signUpFields: initialState.signUpFields,
      };
    case SETFORGOTPASSWORDDIALOGOPEN:
      return {
        ...state,
        isForgotPasswordDialogOpen: action.value,
      };
    case SETISSIGNUPFIELDVALUE:
      return {
        ...state,
        signUpFields: {...state.signUpFields, [action.fieldName]: action.value},
      };
    case SHOWSNACKBAR:
      return {
        ...state,
        snackBarData: {
          ...state.snackBarData,
          openSnackBar: action.isDisplayed,
          message: action.message,
          severity: action.severity,
        },
      };
    default:
      return state;
  }
}

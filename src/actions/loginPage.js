export const CHANGEUSERID = "CHANGEUSERID";
export const CHANGEPASSWORD = "CHANGEPASSWORD";
export const SETLOGINALERT = "SETLOGINALERT";
export const SETISSIGNUPDIALOGOPEN = "SETISSIGNUPDIALOGOPEN";
export const SETISSIGNUPFIELDVALUE = "SETISSIGNUPFIELDVALUE";
export const SHOWSNACKBAR = "SHOWSNACKBAR";

export const changeUserId = (value) => (dispatch) =>
  dispatch({
    type: CHANGEUSERID,
    value,
  });

export const changePassword = (value) => (dispatch) =>
  dispatch({
    type: CHANGEPASSWORD,
    value,
  });

export const setLoginAlert = (value) => (dispatch) =>
  dispatch({
    type: SETLOGINALERT,
    value,
  });

export const setIsSignUpDialogOpen = (value) => (dispatch) =>
  dispatch({
    type: SETISSIGNUPDIALOGOPEN,
    value,
  });

export const setSignUpfieldValue = (fieldName, value) => (dispatch) =>
  dispatch({
    type: SETISSIGNUPFIELDVALUE,
    fieldName,
    value,
  });

export const showSnackBar = (isDisplayed, message, severity) => (dispatch) =>
  dispatch({
    type: SHOWSNACKBAR,
    isDisplayed,
    message,
    severity,
  });

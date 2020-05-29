export const CHANGEUSERID = "CHANGEUSERID";
export const CHANGEPASSWORD = "CHANGEPASSWORD";
export const SETLOGINALERT = "SETLOGINALERT";

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

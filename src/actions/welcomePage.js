export const ISVIEWBADGESDIALOGOPEN = "ISVIEWBADGESDIALOGOPEN";
export const SAVEMYBADGES = "SAVEMYBADGES";
export const CHANGEPASSWORD = "CHANGEPASSWORD";

export const setIsViewBadgesDialogOpen = (value) => (dispatch) =>
  dispatch({
    type: ISVIEWBADGESDIALOGOPEN,
    value,
  });

export const saveMyBadges = (value) => (dispatch) =>
  dispatch({
    type: SAVEMYBADGES,
    value,
  });

export const setIsChangePasswordDialogOpen = (value) => (dispatch) =>
  dispatch({
    type: CHANGEPASSWORD,
    value,
  });

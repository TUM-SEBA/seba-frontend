export const ISVIEWBADGESDIALOGOPEN = "ISVIEWBADGESDIALOGOPEN";
export const ISVIEWFEEDBACKDIALOGOPEN = "ISVIEWFEEDBACKDIALOGOPEN";
export const SAVEMYBADGES = "SAVEMYBADGES";

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

export const setIsViewFeedbackDialogOpen = (value) => (dispatch) =>
  dispatch({
    type: ISVIEWFEEDBACKDIALOGOPEN,
    value,
  });

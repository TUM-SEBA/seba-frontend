export const ISVIEWBADGESDIALOGOPEN = "ISVIEWBADGESDIALOGOPEN";
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

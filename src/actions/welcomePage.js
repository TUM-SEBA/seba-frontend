export const ISVIEWBADGESDIALOGOPEN = "ISVIEWBADGESDIALOGOPEN";
export const ISABOUTUSDIALOGOPEN = "ISABOUTUSDIALOGOPEN";
export const ISREVIEWDIALOGOPEN = "ISREVIEWDIALOGOPEN";
export const SAVEMYBADGES = "SAVEMYBADGES";
export const CHANGEPASSWORD = "CHANGEPASSWORD";
export const NEWBADGEAVAILABLE = "NEWBADGEAVAILABLE";
export const SAVEMYPROFILE = "SAVEMYPROFILE";
export const SETUSERPROFILEDIALOGOPEN = "SETUSERPROFILEDIALOGOPEN";
export const SETPROFILEFIELDVALUE = "SETPROFILEFIELDVALUE";

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

export const setNewBadgeAvailable = (value, isOpen) => (dispatch) =>
  dispatch({
    type: NEWBADGEAVAILABLE,
    value,
    isOpen,
  });

export const saveMyProfile = (value) => (dispatch) =>
  dispatch({
    type: SAVEMYPROFILE,
    value,
  });

export const setUserProfileDialogOpen = (value) => (dispatch) =>
  dispatch({
    type: SETUSERPROFILEDIALOGOPEN,
    value,
  });

export const setProfilefieldValue = (fieldName, value) => (dispatch) =>
  dispatch({
    type: SETPROFILEFIELDVALUE,
    fieldName,
    value,
  });

export const setIsAboutUsDialogOpen = (value) => (dispatch) =>
  dispatch({
    type: ISABOUTUSDIALOGOPEN,
    value,
  });

export const setIsReviewDialogOpen = (value, userIdReview) => (dispatch) =>
  dispatch({
    type: ISREVIEWDIALOGOPEN,
    value,
    userIdReview,
  });

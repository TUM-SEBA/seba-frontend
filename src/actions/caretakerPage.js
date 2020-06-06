export const CHANGEFILTERBY = "CHANGEFILTERBY";
export const CHANGESEARCH = "CHANGESEARCH";
export const SETISBIDDINGREQUESTDIALOGOPEN = "SETISBIDDINGREQUESTDIALOGOPEN";
export const SETBIDDINGREQUESTFIELDVALUE = "SETBIDDINGREQUESTFIELDVALUE";

export const changeFilterBy = (value) => (dispatch) =>
  dispatch({
    type: CHANGEFILTERBY,
    value,
  });

export const changeSearch = (value) => (dispatch) =>
  dispatch({
    type: CHANGESEARCH,
    value,
  });

export const setIsBiddingRequestDialogOpen = (isOpen, offerId) => (dispatch) =>
  dispatch({
    type: SETISBIDDINGREQUESTDIALOGOPEN,
    isOpen,
    offerId,
  });

export const setBiddingRequestFieldValue = (fieldName, value) => (dispatch) =>
  dispatch({
    type: SETBIDDINGREQUESTFIELDVALUE,
    fieldName,
    value,
  });

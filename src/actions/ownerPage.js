export const CHANGEFILTERBY = "CHANGEFILTERBY";
export const CHANGESEARCH = "CHANGESEARCH";
export const SETOFFERFIELDVALUE = "SETOFFERFIELDVALUE";
export const SETISOFFERDIALOGOPEN = "SETISOFFERDIALOGOPEN";

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

export const setIsOfferDialogOpen = (isOpen) => (dispatch) =>
  dispatch({
    type: SETISOFFERDIALOGOPEN,
    isOpen,
  });

export const setOfferFieldValue = (fieldName, value) => (dispatch) =>
  dispatch({
    type: SETOFFERFIELDVALUE,
    fieldName,
    value,
  });

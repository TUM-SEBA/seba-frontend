export const CHANGEFILTERBY = "CHANGEFILTERBY";
export const CHANGESEARCH = "CHANGESEARCH";
export const SETOFFERFIELDVALUE = "SETOFFERFIELDVALUE";
export const SETISOFFERDIALOGOPEN = "SETISOFFERDIALOGOPEN";
export const BIDDINGREQUESTLISTCHANGEFILTERBY = "BIDDINGREQUESTLISTCHANGEFILTERBY";
export const BIDDINGREQUESTLISTCHANGESEARCH = "BIDDINGREQUESTLISTCHANGESEARCH";
export const SETISBIDDINGREQUESTDIALOGOPEN = "SETISBIDDINGREQUESTDIALOGOPEN";
export const SETISACCEPTCARETAKERCONFIRMATIONDIALOGOPEN =
  "SETISACCEPTCARETAKERCONFIRMATIONDIALOGOPEN";
export const SETFEEDBACKFIELDVALUE = "SETFEEDBACKFIELDVALUE";
export const ISVIEWFEEDBACKDIALOGOPEN = "ISVIEWFEEDBACKDIALOGOPEN";
export const SETISENTITYLISTDIALOGOPEN = "SETISENTITYLISTDIALOGOPEN";
export const SETISENTITYFORMDIALOGOPEN = "SETISENTITYFORMDIALOGOPEN";
export const ENTITYLISTCHANGEFILTERBY = "ENTITYLISTCHANGEFILTERBY";
export const ENTITYLISTCHANGESEARCH = "ENTITYLISTCHANGESEARCH";
export const SETENTITYFIELDVALUE = "SETENTITYFIELDVALUE";

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

export const biddingRequestListChangeFilterBy = (value) => (dispatch) =>
  dispatch({
    type: BIDDINGREQUESTLISTCHANGEFILTERBY,
    value,
  });

export const biddingRequestChangeSearch = (value) => (dispatch) =>
  dispatch({
    type: BIDDINGREQUESTLISTCHANGESEARCH,
    value,
  });

export const setIsBiddingRequestDialogOpen = (isOpen, offerId) => (dispatch) =>
  dispatch({
    type: SETISBIDDINGREQUESTDIALOGOPEN,
    isOpen,
    offerId,
  });

export const setIsAcceptCaretakerConfirmationDialogOpen = (isOpen, biddingRequestId) => (
  dispatch
) =>
  dispatch({
    type: SETISACCEPTCARETAKERCONFIRMATIONDIALOGOPEN,
    isOpen,
    biddingRequestId,
  });

export const setFeedbackFieldValue = (fieldName, value) => (dispatch) =>
  dispatch({
    type: SETFEEDBACKFIELDVALUE,
    fieldName,
    value,
  });

export const setIsViewFeedbackDialogOpen = (value, offerId) => (dispatch) =>
  dispatch({
    type: ISVIEWFEEDBACKDIALOGOPEN,
    value,
    offerId,
  });

export const setIsEntityListDialogOpen = (isOpen) => (dispatch) =>
  dispatch({
    type: SETISENTITYLISTDIALOGOPEN,
    isOpen,
  });

export const setIsEntityFormDialogOpen = (isOpen, isInsert, entityId) => (dispatch) =>
  dispatch({
    type: SETISENTITYFORMDIALOGOPEN,
    isOpen,
    isInsert,
    entityId,
  });

export const entityListChangeFilterBy = (value) => (dispatch) =>
  dispatch({
    type: ENTITYLISTCHANGEFILTERBY,
    value,
  });

export const entityChangeSearch = (value) => (dispatch) =>
  dispatch({
    type: ENTITYLISTCHANGESEARCH,
    value,
  });

export const setEntityfieldValue = (fieldName, value) => (dispatch) =>
  dispatch({
    type: SETENTITYFIELDVALUE,
    fieldName,
    value,
  });

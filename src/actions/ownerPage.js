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

export const BIDDINGREQUESTLISTCHANGEFILTERBY = "BIDDINGREQUESTLISTCHANGEFILTERBY";
export const BIDDINGREQUESTLISTCHANGESEARCH = "BIDDINGREQUESTLISTCHANGESEARCH";
export const SETISBIDDINGREQUESTDIALOGOPEN = "SETISBIDDINGREQUESTDIALOGOPEN";
export const SETISACCEPTCARETAKERCONFIRMATIONDIALOGOPEN =
  "SETISACCEPTCARETAKERCONFIRMATIONDIALOGOPEN";

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

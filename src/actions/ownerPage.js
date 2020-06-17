export const BIDDINGREQUESTLISTCHANGEFILTERBY = "BIDDINGREQUESTLISTCHANGEFILTERBY";
export const BIDDINGREQUESTLISTCHANGESEARCH = "BIDDINGREQUESTLISTCHANGESEARCH";
export const SETISBIDDINGREQUESTDIALOGOPEN = "SETISBIDDINGREQUESTDIALOGOPEN";

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

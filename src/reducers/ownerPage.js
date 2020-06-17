import {
  BIDDINGREQUESTLISTCHANGEFILTERBY,
  BIDDINGREQUESTLISTCHANGESEARCH,
  SETISACCEPTCARETAKERCONFIRMATIONDIALOGOPEN,
  SETISBIDDINGREQUESTDIALOGOPEN,
} from "../actions/ownerPage";

let initialState = {
  biddingRequestSelectedFilterBy: "-1",
  biddingRequestSearchValue: "",
  isBiddingRequestDialogOpen: true,
  offerId: "",
  isAcceptCaretakerConfirmationDialogOpen: false,
  biddingRequestId: "",
};

export default function caretakerPage(state = initialState, action) {
  switch (action.type) {
    case BIDDINGREQUESTLISTCHANGEFILTERBY:
      return {
        ...state,
        biddingRequestSelectedFilterBy: action.value,
      };
    case BIDDINGREQUESTLISTCHANGESEARCH:
      return {
        ...state,
        biddingRequestSearchValue: action.value,
      };
    case SETISBIDDINGREQUESTDIALOGOPEN:
      return {
        ...state,
        isBiddingRequestDialogOpen: action.isOpen,
        offerId: action.offerId,
      };
    case SETISACCEPTCARETAKERCONFIRMATIONDIALOGOPEN:
      return {
        ...state,
        isAcceptCaretakerConfirmationDialogOpen: action.isOpen,
        biddingRequestId: action.biddingRequestId,
      };
    default:
      return state;
  }
}

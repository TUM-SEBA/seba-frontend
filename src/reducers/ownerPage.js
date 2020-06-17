import {
  BIDDINGREQUESTLISTCHANGEFILTERBY,
  BIDDINGREQUESTLISTCHANGESEARCH,
  SETISBIDDINGREQUESTDIALOGOPEN,
} from "../actions/ownerPage";

let initialState = {
  biddingRequestSelectedFilterBy: "-1",
  biddingRequestSearchValue: "",
  isBiddingRequestDialogOpen: true,
  offerId: "",
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
    default:
      return state;
  }
}

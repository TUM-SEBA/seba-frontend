import {
  CHANGEFILTERBY,
  CHANGESEARCH,
  SETOFFERFIELDVALUE,
  SETISOFFERDIALOGOPEN,
  BIDDINGREQUESTLISTCHANGEFILTERBY,
  BIDDINGREQUESTLISTCHANGESEARCH,
  SETISACCEPTCARETAKERCONFIRMATIONDIALOGOPEN,
  SETISBIDDINGREQUESTDIALOGOPEN,
} from "../actions/ownerPage";

let initialState = {
  selectedFilterBy: "-1",
  searchValue: "",
  isOfferDialogOpen: false,
  offerFields: {
    category: "pet",
    startDate: "",
    endDate: "",
    description: "",
  },
  biddingRequestSelectedFilterBy: "-1",
  biddingRequestSearchValue: "",
  isBiddingRequestDialogOpen: true,
  offerId: "5ee0956e97529563045c4912",
  isAcceptCaretakerConfirmationDialogOpen: false,
  biddingRequestId: "",
};

export default function ownerPage(state = initialState, action) {
  switch (action.type) {
    case CHANGEFILTERBY:
      return {
        ...state,
        selectedFilterBy: action.value,
      };
    case CHANGESEARCH:
      return {
        ...state,
        searchValue: action.value,
      };
    case SETISOFFERDIALOGOPEN:
      return {
        ...state,
        isOfferDialogOpen: action.isOpen,
        offerId: action.offerId,
        offerFields: initialState.offerFields,
      };
    case SETOFFERFIELDVALUE:
      return {
        ...state,
        offerFields: {
          ...state.offerFields,
          [action.fieldName]: action.value,
        },
      };
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

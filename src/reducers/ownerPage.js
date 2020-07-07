import {
  CHANGEFILTERBY,
  CHANGESEARCH,
  SETOFFERFIELDVALUE,
  SETISOFFERDIALOGOPEN,
  BIDDINGREQUESTLISTCHANGEFILTERBY,
  BIDDINGREQUESTLISTCHANGESEARCH,
  SETISACCEPTCARETAKERCONFIRMATIONDIALOGOPEN,
  SETISBIDDINGREQUESTDIALOGOPEN,
  SETFEEDBACKFIELDVALUE,
  ISVIEWFEEDBACKDIALOGOPEN,
} from "../actions/ownerPage";

let initialState = {
  selectedFilterBy: "",
  searchValue: "",
  isOfferDialogOpen: false,
  offerFields: {
    category: "Pet",
    startDate: "",
    endDate: "",
    description: " ",
    title: "",
  },
  biddingRequestSelectedFilterBy: "-1",
  biddingRequestSearchValue: "",
  isBiddingRequestDialogOpen: false,
  offerId: "",
  isAcceptCaretakerConfirmationDialogOpen: false,
  biddingRequestId: "",
  isViewFeedbackDialogOpen: false,
  feedbackFields: {
    description: "",
    rating: 3,
  },
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
    case SETFEEDBACKFIELDVALUE:
      return {
        ...state,
        feedbackFields: {
          ...state.feedbackFields,
          [action.fieldName]: action.value,
        },
      };
    case ISVIEWFEEDBACKDIALOGOPEN:
      return {
        ...state,
        isViewFeedbackDialogOpen: action.value,
        offerId: action.offerId,
      };
    default:
      return state;
  }
}

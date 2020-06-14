import {
  CHANGEFILTERBY,
  CHANGESEARCH,
  SETOFFERFIELDVALUE,
  SETISOFFERDIALOGOPEN,
} from "../actions/ownerPage";

let initialState = {
  selectedFilterBy: "-1",
  searchValue: "",
  isOfferDialogOpen: false,
  offerFields: {
    biddingAmount: "",
    remarks: "",
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
    default:
      return state;
  }
}

import {
  CHANGEFILTERBY,
  CHANGESEARCH,
  SETBIDDINGREQUESTFIELDVALUE,
  SETISBIDDINGREQUESTDIALOGOPEN,
} from "../actions/caretakerPage";

let initialState = {
  selectedFilterBy: "",
  searchValue: "",
  isBiddingRequestDialogOpen: false,
  biddingRequestFields: {
    biddingAmount: "",
    remarks: "",
  },
};

export default function caretakerPage(state = initialState, action) {
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
    case SETISBIDDINGREQUESTDIALOGOPEN:
      return {
        ...state,
        isBiddingRequestDialogOpen: action.isOpen,
        offerId: action.offerId,
        biddingRequestFields: initialState.biddingRequestFields,
      };
    case SETBIDDINGREQUESTFIELDVALUE:
      return {
        ...state,
        biddingRequestFields: {
          ...state.biddingRequestFields,
          [action.fieldName]: action.value,
        },
      };
    default:
      return state;
  }
}

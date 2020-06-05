import {CHANGEFILTERBY, CHANGESEARCH} from "../actions/caretakerPage";

let initialState = {
  selectedFilterBy: "-1",
  searchValue: "",
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
    default:
      return state;
  }
}

import {ISVIEWBADGESDIALOGOPEN, SAVEMYBADGES} from "../actions/welcomePage";

let initialState = {
  isViewBadgesDialogOpen: false,
  myBadges: {},
};

export default function welcomePage(state = initialState, action) {
  switch (action.type) {
    case ISVIEWBADGESDIALOGOPEN:
      return {
        ...state,
        isViewBadgesDialogOpen: action.value,
      };
    case SAVEMYBADGES:
      return {
        ...state,
        myBadges: action.value,
      };
    default:
      return {
        ...state,
      };
  }
}

import {
  ISVIEWBADGESDIALOGOPEN,
  SAVEMYBADGES,
  CHANGEPASSWORD,
} from "../actions/welcomePage";

let initialState = {
  isViewBadgesDialogOpen: false,
  myBadges: {},
  isChangePasswordDialogOpen: false,
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
    case CHANGEPASSWORD:
      return {
        ...state,
        isChangePasswordDialogOpen: action.value,
      };
    default:
      return {
        ...state,
      };
  }
}

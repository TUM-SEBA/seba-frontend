import {
  ISVIEWBADGESDIALOGOPEN,
  SAVEMYBADGES,
  CHANGEPASSWORD,
  NEWBADGEAVAILABLE,
} from "../actions/welcomePage";

let initialState = {
  isViewBadgesDialogOpen: false,
  myBadges: {},
  isChangePasswordDialogOpen: false,
  newBadge: null,
  newBadgeDialog: false,
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
    case NEWBADGEAVAILABLE:
      return {
        ...state,
        newBadge: action.value,
        newBadgeDialog: action.isOpen,
      };
    default:
      return {
        ...state,
      };
  }
}

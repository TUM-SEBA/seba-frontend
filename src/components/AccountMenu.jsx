import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PopupState, {bindTrigger, bindMenu} from "material-ui-popup-state";
import theme from "../themes";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {
  setIsViewBadgesDialogOpen,
  setIsChangePasswordDialogOpen,
  setUserProfileDialogOpen,
} from "../actions/welcomePage";
import {getMyBadges, getUserProfile} from "../services/customerService";
import {setIsViewFeedbackDialogOpen} from "../actions/ownerPage";

const styles = (theme) => ({
  menuList: {
    color: "#DCEFDE",
  },
  sentenceCase: {
    textTransform: "none",
    fontSize: "13px",
  },
});

const MyMenuItem = withStyles({
  root: {
    "&:hover": {
      backgroundColor: "#DCEFDE",
    },
  },
})(MenuItem);

function MenuPopupState(props) {
  const {
    classes,
    setIsViewBadgesDialogOpen,
    getMyBadges,
    setIsChangePasswordDialogOpen,
    getUserProfile,
    setUserProfileDialogOpen,
  } = props;

  return (
    <PopupState variant="popover" popupId="account-menu">
      {(popupState) => (
        <React.Fragment>
          <Button {...bindTrigger(popupState)}>
            <AccountCircleIcon />
            <Typography className={classes.sentenceCase}>My Account</Typography>
          </Button>
          <Menu
            className={classes.menuList}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "center",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: -theme.spacing(3),
              horizontal: "right",
            }}
            {...bindMenu(popupState)}
          >
            <MyMenuItem
              onClick={async () => {
                await getUserProfile();
                setUserProfileDialogOpen(true);
                popupState.close();
              }}
            >
              View Profile
            </MyMenuItem>
            <MyMenuItem
              onClick={() => {
                setIsChangePasswordDialogOpen(true);
                popupState.close();
              }}
            >
              Change Password
            </MyMenuItem>
            <MyMenuItem
              onClick={() => {
                getMyBadges();
                setIsViewBadgesDialogOpen(true);
                popupState.close();
              }}
            >
              View Badges
            </MyMenuItem>
            <MyMenuItem
              onClick={() => {
                setIsViewFeedbackDialogOpen(true);
                popupState.close();
              }}
            >
              Feedbacks
            </MyMenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

const mapStateToProps = ({loginPage: {snackBarData}}) => ({
  snackBarData,
});

const mapDispatchToProps = {
  setIsViewBadgesDialogOpen: setIsViewBadgesDialogOpen,
  setIsViewFeedbackDialogOpen: setIsViewFeedbackDialogOpen,
  getMyBadges: getMyBadges,
  setIsChangePasswordDialogOpen: setIsChangePasswordDialogOpen,
  getUserProfile: getUserProfile,
  setUserProfileDialogOpen: setUserProfileDialogOpen,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(MenuPopupState));

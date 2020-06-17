import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PopupState, {bindTrigger, bindMenu} from "material-ui-popup-state";
import theme from "../themes";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/styles";
import {setIsViewBadgesDialogOpen} from "../actions/welcomePage";
import {getMyBadges} from "../services/customerService";

const styles = (theme) => ({
  menuList: {
    color: "#DCEFDE",
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
  const {classes, setIsViewBadgesDialogOpen, getMyBadges} = props;

  return (
    <PopupState variant="popover" popupId="account-menu">
      {(popupState) => (
        <React.Fragment>
          <Button {...bindTrigger(popupState)}>
            <AccountCircleIcon />
            My Account
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
            <MyMenuItem onClick={popupState.close}>View Profile</MyMenuItem>
            <MyMenuItem onClick={popupState.close}>Update Profile</MyMenuItem>
            <MyMenuItem
              onClick={() => {
                getMyBadges();
                setIsViewBadgesDialogOpen(true);
                popupState.close();
              }}
            >
              View Badges
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
  getMyBadges: getMyBadges,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, {withTheme: true})(MenuPopupState));

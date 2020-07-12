import React from "react";
import ViewBadges from "./ViewBadges";
import ChangePassword from "./ChangePassword";
import SnackbarAlert from "./SnackbarAlert";
import ViewEditCustomerProfile from "./ViewEditCustomerProfile";
import Review from "./Review";

function MenuDialog() {
  return (
    <div>
      <ViewBadges />
      <ChangePassword />
      <SnackbarAlert />
      <Review />
      <ViewEditCustomerProfile />
    </div>
  );
}

export default MenuDialog;

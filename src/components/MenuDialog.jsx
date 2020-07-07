import React from "react";
import ViewBadges from "./ViewBadges";
import ChangePassword from "./ChangePassword";
import SnackbarAlert from "./SnackbarAlert";
import ViewEditCustomerProfile from "./ViewEditCustomerProfile";

function MenuDialog() {
  return (
    <div>
      <ViewBadges />
      <ChangePassword />
      <SnackbarAlert />
      <ViewEditCustomerProfile />
    </div>
  );
}

export default MenuDialog;

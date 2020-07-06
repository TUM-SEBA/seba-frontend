import React from "react";
import ViewBadges from "./ViewBadges";
import ViewFeedbackForm from "./FeedbackForm";
import ChangePassword from "./ChangePassword";
import SnackbarAlert from "./SnackbarAlert";
import ViewEditCustomerProfile from "./ViewEditCustomerProfile";

function MenuDialog() {
  return (
    <div>
      <ViewBadges />
      <ViewFeedbackForm />
      <ChangePassword />
      <SnackbarAlert />
      <ViewEditCustomerProfile />
    </div>
  );
}

export default MenuDialog;

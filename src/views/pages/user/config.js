import React from "react";
import { lazy } from "react";

const ProfileConfig = {
  routes: [
    {
      path: "/apps/user/view/:id",
      exact: true,
      appLayout: true,
      className: "email-application",
      component: lazy(() => import("./view/index")),
    },
  ],
};

export default ProfileConfig;

import React from "react";
import { lazy } from "react";

const ProfileConfig = {
  routes: [
    {
      path: "/apps/user/view/:id",
      exact: true,
      component: lazy(() => import("./view/index")),
    },
  ],
};

export default ProfileConfig;

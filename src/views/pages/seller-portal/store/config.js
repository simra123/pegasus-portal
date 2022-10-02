import React from "react";
import { lazy } from "react";

const StoreConfig = {
  routes: [
    {
      path: "/apps/store",
      exact: true,
      className: "ecommerce-application",
      component: lazy(() => import("./index")),
    },
  ],
};

export default StoreConfig;

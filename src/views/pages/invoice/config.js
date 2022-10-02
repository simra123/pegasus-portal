import React from "react";
import { lazy } from "react";

const OrderConfig = {
  routes: [
    {
      path: "/apps/orders",
      exact: true,
      component: lazy(() => import("./list/index")),
    },
  ],
};

export default OrderConfig;

import React from "react";
import { lazy } from "react";

const ProductConfig = {
  routes: [
    {
      path: "/apps/products",
      exact: true,
      className: "email-application",
      component: lazy(() => import("./index")),
    },
  ],
};

export default ProductConfig;

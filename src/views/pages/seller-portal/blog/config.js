import React from "react";
import { lazy } from "react";

const ProductEditConfig = {
  routes: [
    {
      path: "/apps/product/edit/:id",
      exact: true,
      className: "email-application",
      component: lazy(() => import("./edit/index")),
    },
    {
      path: "/apps/product/add",
      exact: true,
      className: "email-application",
      component: lazy(() => import("./edit/index")),
    },
  ],
};

export default ProductEditConfig;

import React from "react";
import { lazy } from "react";

const SellerConfig = {
	routes: [
		{
			path: "/apps/customers/details",
			exact: true,
			className: "ecommerce-application",
			component: lazy(() => import("./index")),
		},
	],
};

export default SellerConfig;

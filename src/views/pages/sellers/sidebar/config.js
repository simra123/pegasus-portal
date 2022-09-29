import React from "react";
import { lazy } from "react";

const SellerConfig = {
	routes: [
		{
			path: "/apps/sellers/details",
			exact: true,
			className: "ecommerce-application",
			component: lazy(() => import("./products")),
		},
	],
};

export default SellerConfig;

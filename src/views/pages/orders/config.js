import React from "react";
import { lazy } from "react";

const SellerConfig = {
	routes: [
		{
			path: "/apps/orders",
			exact: true,
			appLayout: true,
			className: "email-application",
			component: lazy(() => import("./index")),
		},
	],
};

export default SellerConfig;
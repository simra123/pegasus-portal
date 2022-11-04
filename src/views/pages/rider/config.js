import React from "react";
import { lazy } from "react";

const SellerConfig = {
	routes: [
		{
			path: "/apps/rider",
			exact: true,
			component: lazy(() => import("./index")),
		},
	],
};

export default SellerConfig;

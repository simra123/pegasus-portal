import React from "react";
import { lazy } from "react";

const verificationConfig = {
	routes: [
		{
			path: "/apps/users/verify",
			exact: true,
			component: lazy(() => import("./seller/index")),
		},
		{
			path: "/apps/products/verify",
			exact: true,
			component: lazy(() => import("./products/index")),
		},
		{
			path: "/apps/riders/verify",
			exact: true,
			component: lazy(() => import("./riders/index")),
		},
		{
			path: "/apps/deals/verify",
			exact: true,
			component: lazy(() => import("./deals/index")),
		},
	],
};

export default verificationConfig;

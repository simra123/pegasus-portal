import React from "react";
import { lazy } from "react";

const verifyConfig = {
	routes: [
		{
			path: "/apps/users/verify",
			exact: true,
			component: lazy(() => import("./index")),
		},
		{
			path: "/apps/products/verify",
			exact: true,
			component: lazy(() => import("./index")),
		},
		{
			path: "/apps/riders/verify",
			exact: true,
			component: lazy(() => import("./index")),
		},
		{
			path: "/apps/rider",
			exact: true,
			component: lazy(() => import("./index")),
		},
	],
};

export default verifyConfig;

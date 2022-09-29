import React from "react";
import { lazy } from "react";

const CustomerConfig = {
	routes: [
		{
			path: "/apps/customers",
			exact: true,
			component: lazy(() => import("./index")),
		},
	],
};

export default CustomerConfig;

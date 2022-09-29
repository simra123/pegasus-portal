import React from "react";
import { lazy } from "react";

const verifyConfig = {
	routes: [
		{
			path: "/apps/users/verify",
			exact: true,
			component: lazy(() => import("./index")),
		},
	],
};

export default verifyConfig;

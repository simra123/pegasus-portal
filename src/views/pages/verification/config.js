import React from "react";
import { lazy } from "react";

const verifyConfig = {
	routes: [
		{
			path: "/apps/users/verify",
			exact: true,
			appLayout: true,
			className: "email-application",
			component: lazy(() => import("./index")),
		},
	],
};

export default verifyConfig;

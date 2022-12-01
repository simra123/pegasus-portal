import React from "react";
import { lazy } from "react";

const CustomerConfig = {
	routes: [
		{
			path: "/apps/customers/details",
			exact: true,
			className: "ecommerce-application",
			component: lazy(() => import("./index")),
		},
		// {
		// 	path: "/apps/sellers/details/products",
		// 	exact: true,
		// 	className: "ecommerce-application",
		// 	component: lazy(() => import("./products")),
		// },
		// {
		// 	path: "/apps/sellers/details/profile",
		// 	exact: true,
		// 	className: "ecommerce-application",
		// 	component: lazy(() => import("./profile")),
		// },
	],
};

export default CustomerConfig;

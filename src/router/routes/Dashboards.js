import { lazy } from "react";

const DashboardRoutes = [
	// Dashboards
	{
		path: "/apps/dashboard",
		component: lazy(() => import("../../views/dashboard/analytics")),
	},
	{
		path: "/dashboard",
		component: lazy(() => import("../../views/dashboard/ecommerce")),
		exact: true,
	},
];

export default DashboardRoutes;

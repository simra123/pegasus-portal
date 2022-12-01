import React from "react";
import { Redirect } from "react-router-dom";
// import FuseUtils from "@fuse/utils";
// import ExampleConfig from "app/main/example/ExampleConfig";
import pagesConfigs from "./pageConfig";
import PagesRoutes from "../router/routes/Pages";
//import OtpConfig from "../views/pages/dm/config";
import DashboardAdmin from "../router/routes/Dashboards";
import RidersDetailsConfig from "../views/pages/rider/sidebar/config";

const routeConfigs = [...pagesConfigs];

const routes = [
	//...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
	...routeConfigs,
	...PagesRoutes,
	...DashboardAdmin,
	...RidersDetailsConfig.routes,
	// {
	// 	path: "/",
	// 	exact: true,
	// 	component: () => <Redirect to="/apps/dashboard" />,
	// },
	// {
	// 	component: () => <Redirect to="/pages/errors/error-404" />,
	// },
];
console.log(routes, "routesss");
export default routes;

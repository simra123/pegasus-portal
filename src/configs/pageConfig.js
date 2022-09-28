import { Routes } from "../router/routes";
import allPagesConfig from "./allPageConfigs";
import PagesRoutes from "../router/routes/Pages";

let pagesConfigs = [];
const setRoutes = (config, defaultAuth) => {
	let routes = [...config.routes];
	routes = routes.map((route) => {
		return {
			...route,
		};
	});

	return [...routes];
};

const generateRoutesFromConfigs = (configs, defaultAuth) => {
	let allRoutes = [];
	configs.forEach((config) => {
		allRoutes.push(...setRoutes(config));
		//	console.log(...setRoutes(config)); //9 elemnets
	});
	return allRoutes;
};
let userAcl = localStorage.getItem("user_acl");
if (userAcl !== null) {
	userAcl = JSON.parse(userAcl);

	pagesConfigs = allPagesConfig.map((config) => {
		let check = false;
		if (config && config.routes && config.routes.length) {
			for (let i = 0; i < config.routes.length; i++) {
				let route = config.routes[i];
				//	console.log(config.routes[i], config.routes.length, 'matching');

				if (userAcl[`FRONT:${route.path}`]) {
					check = true;
					//break;
				}
			}
		}

		if (check) {
			return config;
		}
	});

	pagesConfigs = pagesConfigs.filter((el) => el);
	pagesConfigs = generateRoutesFromConfigs(pagesConfigs, null);
} else {
	pagesConfigs = [...PagesRoutes];
}

export default pagesConfigs;

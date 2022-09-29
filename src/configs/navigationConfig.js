import navigationConfig from "./navigation";

let userAcl = localStorage.getItem("user_acl");

let navigationBar = [];

if (userAcl && navigationConfig && navigationConfig.length) {
	userAcl = JSON.parse(userAcl);

	if (userAcl && Object.keys(userAcl) && Object.keys(userAcl).length) {
		let keys = Object.keys(userAcl);

		userAcl = keys.filter((key) => userAcl[key]);

		navigationBar = [
			// {
			// 	id: navigationConfig[0].id,
			// 	title: navigationConfig[0].title,
			// 	icon: navigationConfig[0].icon,
			// 	children: [],
			// },
		];

		if (navigationConfig[0].children && navigationConfig[0].children.length) {
			function urlInACL(url) {
				return userAcl.includes("FRONT:" + url);
			}

			function parseChildren(child) {
				let result = [];
				if (child && child.length) {
					result = child.map((item) => {
						if (item) {
							if (item.children && item.children.length) {
								item.children = parseChildren(item.children);
								item.children = item.children.filter((el) => el);
								if (item.children && item.children.length) {
									return item;
								}
							} else if (item.navLink && urlInACL(item.navLink)) {
								return item;
							}
						}
					});
				}
				return result.filter((el) => el);
			}

			navigationBar = parseChildren(navigationConfig[0].children);
		}
	}
}

export default navigationBar;

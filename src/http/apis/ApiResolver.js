import UserApis from "./users";
import ClientApis from "./client";
import Sellers from "./sellers";
import Products from "./products";
import Customers from "./customers";
import Store from "./stores";
import Riders from "./riders";
class ApiResolver {
	constructor() {
		this.apis = {
			users: UserApis.apis(),
			client: ClientApis.apis(),
			sellers: Sellers.apis(),
			products: Products.apis(),
			customers: Customers.apis(),
			stores: Store.apis(),
			riders: Riders.apis(),
		};
	}

	resolve(name, apiCall) {
		if (!this.apis[name]) throw new Error(`Failed to resolve api [${name}]`);

		if (!this.apis[name][apiCall])
			throw new Error(`Failed to resolve api call [${apiCall}]`);

		return this.apis[name][apiCall];
	}
}

export default new ApiResolver();

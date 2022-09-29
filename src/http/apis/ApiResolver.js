
import UserApis from "./users";
import ClientApis from "./client"
import Sellers from "./sellers";
import Products from './products'
import Customers from "./customers"

class ApiResolver {
	constructor() {
		this.apis = {
			users: UserApis.apis(),
			client: ClientApis.apis(),
			sellers: Sellers.apis(),
			products: Products.apis(),
			customers: Customers.apis()
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

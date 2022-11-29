import UserApis from "./users";
import ClientApis from "./client";
import Sellers from "./sellers";
import Products from "./products";
import Customers from "./customers";
import Store from "./stores";
import Riders from "./riders";
import Orders from "./orders";
import Content from "./content"
import Dashboard from "./dashboard"
import Deals from "./deals";
import ProductCategories from "./productCategories";

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
			orders: Orders.apis(),
			content: Content.apis(),
			dashboard: Dashboard.apis(),
			deals: Deals.apis(),
			productCategories: ProductCategories.apis()

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

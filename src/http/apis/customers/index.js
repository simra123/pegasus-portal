class APIS {
	apis() {
		return {
			fetchAdmin: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/customers",
			},
			orders: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/customer/order/admin",
			},
			cart: {
				headers: {
					"xt-user-token": null,
				},
				method: "get",
				path: "/fetch/cart/admin/:customer_id",
			},
			update: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/customer/update/admin",
			},
		};
	}
}

export default new APIS();

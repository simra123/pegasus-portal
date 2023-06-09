class APIS {
	apis() {
		return {
			fetch: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/stores",
			},
			fetch_products: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/products",
			},
			update_admin: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/store/update/admin",
			},
			update_seller: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/store/update/seller",
			},
		};
	}
}

export default new APIS();

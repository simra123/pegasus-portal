class APIS {
	apis() {
		return {
			unapproved: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/products/unapproved",
			},
			createProduct: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/create/products",
			},
			approval: {
				headers: {
					"xt-user-token": null,
				},
				method: "put",
				path: "/products/approval/:id",
			},
			fetch: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/products",
			},
			fetch_id_name: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/fetch/id-name",
			},
			fetchSeller: {
				headers: {
					"xt-user-token": null,
				},
				method: "get",
				path: "/products",
			},
		};
	}
}

export default new APIS();

class APIS {
	apis() {
		return {
			approval: {
				headers: {
					"xt-user-token": null,
				},
				method: "put",
				path: "/sellers/approval/:id",
			},
			fetchAdmin: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/sellers/list",
			},
			updateAdmin: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/seller/update/admin",
			},
			fetchSellerOrders: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/fetch/orders",
			},
		};
	}
}

export default new APIS();

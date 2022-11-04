class APIS {
	apis() {
		return {
			fetch: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/fetch/orders",
			},
			fetchById: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/fetch/order/by-id",
			},
		};
	}
}

export default new APIS();

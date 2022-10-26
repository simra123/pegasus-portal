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
		};
	}
}

export default new APIS();

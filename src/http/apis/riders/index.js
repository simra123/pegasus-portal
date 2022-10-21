class APIS {
	apis() {
		return {
			fetch: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/riders",
			},
		};
	}
}

export default new APIS();

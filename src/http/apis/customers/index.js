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
		};
	}
}

export default new APIS();

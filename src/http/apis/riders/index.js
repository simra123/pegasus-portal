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
			approval: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/rider/approval",
			},
		};
	}
}

export default new APIS();

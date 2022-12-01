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
			updateProfile: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/rider/update/portal",
			},
			fetchOrders: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/rider/wallet",
			},
		};
	}
}

export default new APIS();

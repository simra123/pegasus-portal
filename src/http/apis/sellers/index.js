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
			forget: {
				headers: {
					"xt-client-token": null,
				},
				method: "post",
				path: "/seller/send/email",
			},
			check_token: {
				headers: {
					"xt-client-token": null,
				},
				method: "post",
				path: "/seller/check/token",
			},
			deals: {
				headers: {
					"xt-user-token": null,
				},
				method: "post",
				path: "/fetch/hot-deal",
			},
			reset_password: {
				headers: {
					"xt-client-token": null,
				},
				method: "post",
				path: "/seller/reset/password",
			},
		};
	}
}

export default new APIS();

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
      reset_password: {
        headers: {
          "xt-client-token": null,
        },
        method: "post",
        path: "/seller/reset/password",
      },
      reset_notification: {
        headers: {
          "xt-user-token": null,
        },
        method: "get",
        path: "/seller/reset/number",
      },
    };
	}
}

export default new APIS();

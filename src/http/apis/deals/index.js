class APIS {
  apis() {
    return {
      fetch_deals: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/fetch/hot-deal",
      },
      create_deals: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/create/hot-deal",
      },
      update_deals: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/hot-deal/update",
      },
      delete: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/hot-deal/delete",
      },
      fetch_admin: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/fetch/hot-deals/admin",
      },
      approve: {
        headers: {
          "xt-user-token": null,
        },
        method: "get",
        path: "/approve/hot-deals/:id",
      },
    };
  }
}

export default new APIS();

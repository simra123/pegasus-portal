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
      }
    };
  }
}

export default new APIS();

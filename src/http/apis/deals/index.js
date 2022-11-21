class APIS {
  apis() {
    return {
      fetch_deals: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/fetch/hot-deal",
      }
    };
  }
}

export default new APIS();

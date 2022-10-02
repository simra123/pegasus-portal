class APIS {
  apis() {
    return {
      fetch: {
        headers: {
          "xt-user-token": null,
        },
        method: "get",
        path: "/stores",
      },
    };
  }
}

export default new APIS();

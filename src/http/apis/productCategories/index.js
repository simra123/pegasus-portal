class APIS {
  apis() {
    return {
      fetch: {
        headers: {
          "xt-user-token": null,
        },
        method: "get",
        path: "/categories",
      },
    };
  }
}

export default new APIS();

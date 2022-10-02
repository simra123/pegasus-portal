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
    };
  }
}

export default new APIS();

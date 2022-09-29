class APIS {
  apis() {
    return {
      unapproved: {
        headers: {
          "xt-user-token": null,
        },
        method: "get",
        path: "/products/unapproved",
      },
      approval: {
        headers: {
          "xt-user-token": null,
        },
        method: "put",
        path: "/products/approval/:id",
      },
    };
  }
}

export default new APIS();

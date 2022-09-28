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
    };
  }
}

export default new APIS();

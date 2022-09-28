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
    };
  }
}

export default new APIS();

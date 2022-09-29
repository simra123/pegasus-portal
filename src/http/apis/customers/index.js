class APIS {
  apis() {
    return {
      fetchAdmin: {
        headers: {
          "xt-user-token": null,
        },
        method: "get",
        path: "/customers",
      }
    };
  }
}

export default new APIS();

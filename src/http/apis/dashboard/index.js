class APIS {
  apis() {
    return {
      sellerDashboard: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/seller/dashboard",
      },
    };
  }
}

export default new APIS();

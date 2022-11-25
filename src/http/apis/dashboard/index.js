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
      adminDashboard: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/admin/dashboard",
      },
    };
  }
}

export default new APIS();

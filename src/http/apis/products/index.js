class APIS {
	apis() {
		return {
      unapproved: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/products/unapproved",
      },
      createProduct: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/create/products",
      },
      update: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/update/product",
      },
      approval: {
        headers: {
          "xt-user-token": null,
        },
        method: "put",
        path: "/products/approval/:id",
      },
      fetch: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/products",
      },
      fetch_id_name: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/fetch/id-name",
      },
      fetchSeller: {
        headers: {
          "xt-user-token": null,
        },
        method: "get",
        path: "/products",
      },
      delete: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/product/delete",
      },
      search: {
        headers: {
          "xt-user-token": null,
        },
        method: "post",
        path: "/search/product",
      },
    };
	}
}

export default new APIS();

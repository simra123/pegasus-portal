class APIS {
    apis() {
        return {
          login: {
            headers: {
              "xt-client-token": null,
            },
            method: "post",
            path: "/auth/user",
          },
          update_user: {
            headers: {
              "xt-user-token": null,
            },
            method: "put",
            path: "/backend/users/update-own/id",
          },
          create_user: {
            headers: {
              "xt-user-token": null,
            },
            method: "post",
            path: "/backend/users/create-own-user",
          },
          delete: {
            headers: {
              "xt-user-token": null,
            },
            method: "delete",
            path: "/backend/users/delete/:id",
          },
           unapproved: {
            headers: {
              "xt-user-token": null,
            },
            method: "get",
            path: "/users/unapproved",
          },
        };
    }
}

export default new APIS;
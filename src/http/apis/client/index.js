class APIS {
  apis() {
    return {
      auth: {
        headers: {
          "xt-api-key":
            "87aa0ca19c9ed4f7f25cabaef076087ab8ba327916732ff7aec778479106d80d",
          //'xt-api-key': '797526a6e491ec43bbe290a54193f25f5ea15f7514e84a853d8d501009b0ba11'
        },
        method: "get",
        path: "/authenticate",
      },
    };
  }
}

export default new APIS();

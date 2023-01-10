class APIS {
	apis() {
		return {
			seller_customer: {
				headers: {
					"xt-user-token": null,
				},
				method: "get",
				path: "/conversations/seller-customer/admin?page=pageVal&limit=limitVal",
			},
			seller_customer_chats: {
				headers: {
					"xt-user-token": null,
				},
				method: "get",
				path: "/fetch/chat/room/admin?page=pageVal&limit=limitVal&room_id=chatId",
			},
			rider_customer: {
				headers: {
					"xt-user-token": null,
				},
				method: "get",
				path: "/conversations/rider-customer/admin?page=pageVal&limit=limitVal",
			},
			rider_customer_chats: {
				headers: {
					"xt-user-token": null,
				},
				method: "get",
				path: "/fetch/chat/order/admin?page=pageVal&limit=limitVal&order_id=orderId",
			},
		};
	}
}

export default new APIS();

import io from "socket.io-client";
import React from "react";
const URL = "https://whatsapp-ess-be.golive.com.pk";

const getToken = () => {
	return localStorage.getItem("user_token");
};

class WebSocket {
	static socket = null;
	static initializeSocket = () => {
		let check = false;
		if (getToken()) {
			if (!WebSocket.socket) {
				WebSocket.socket = io(URL, {
					query: {
						token: getToken(),
					},
				});
			}
			check = true;
			WebSocket.socket.on("connect", () => {});

			WebSocket.socket.on("disconnect", () => {
				WebSocket.socket = null;
			});
		}

		return check;
	};
	static getSocket = () => {
		if (!WebSocket.socket) {
			if (!WebSocket.initializeSocket()) {
				return null;
			}
		}
		return WebSocket.socket;
	};
}

export default WebSocket;

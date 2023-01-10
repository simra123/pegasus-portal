import React from "react";
import { lazy } from "react";

const Chats = {
	routes: [
		{
			path: "/apps/chat",
			exact: true,
			appLayout: true,
			className: "chat-application",
			component: lazy(() => import("./index")),
		},
	],
};

export default Chats;

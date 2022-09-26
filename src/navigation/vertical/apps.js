// ** Icons Import
import {
	Mail,
	MessageSquare,
	CheckSquare,
	Calendar,
	FileText,
	Circle,
	ShoppingCart,
	User,
	Shield,
} from "react-feather";

export default [
	{
		header: "Apps & Pages",
	},
	{
		id: "users",
		title: "Users",
		icon: <User size={20} />,
		children: [
			{
				id: "sell",
				title: "Sellers",
				icon: <Circle size={12} />,
				navLink: "/apps/sellers",
			},
			{
				id: "cus",
				title: "Customers",
				icon: <Circle size={12} />,
				navLink: "/apps/customers",
			},
		],
	},
	{
		id: "rider",
		title: "Riders",
		icon: <MessageSquare size={20} />,
		navLink: "/apps/riders",
	},
	{
		id: "order",
		title: "Order",
		icon: <CheckSquare size={20} />,
		navLink: "/apps/orders",
	},
	{
		id: "req",
		title: "Requests",
		icon: <Shield size={20} />,
		children: [
			{
				id: "rid",
				title: "Verify Riders",
				icon: <Circle size={12} />,
				navLink: "/apps/riders/verify",
			},
			{
				id: "shop",
				title: "Verify Stores",
				icon: <Circle size={12} />,
				navLink: "/apps/shop",
			},
			{
				id: "prod",
				title: "Verify Products",
				icon: <Circle size={12} />,
				navLink: "/apps/products",
			},
		],
	},
];

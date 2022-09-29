import {
	Mail,
	MessageSquare,
	CheckSquare,
	Calendar,
	FileText,
	BarChart,
	Circle,
	Grid,
	Home,
	Settings,
	User,
} from "react-feather";

export default [
	{
		id: "applications",
		title: "Applications",
		translate: "Navigation",
		type: "group",
		icon: "apps",
		children: [
			{
				id: "Dashboard",
				title: "Dashboard",
				translate: <Home size={20} />,
				type: "item",
				icon: <Grid size={20} />,
				navLink: "/dashboard",
				exact: true,
			},

			{
				id: "users",
				title: "Users",
				translate: "Chat",
				type: "collapse",
				icon: <User size={20} />,
				// navLink: '/apps/groups/group',
				children: [
					{
						id: "Sellers",
						title: "Sellers",
						translate: "Sellers",
						type: "item",
						icon: <Circle size={12} />,
						navLink: "/apps/sellers",
						exact: true,
					},
					{
						id: "Customers",
						title: "Customers",
						translate: "Customers",
						type: "item",
						icon: <Circle size={12} />,
						navLink: "/apps/customers",
						exact: true,
					},
				],
			},

			{
				id: "Riders",
				title: "Riders",
				translate: "Riders",
				type: "item",
				icon: <MessageSquare size={20} />,
				navLink: "/apps/riders",
				exact: true,
			},
			{
				id: "orders",
				title: "Orders",
				translate: "Orders",
				type: "item",
				icon: <CheckSquare size={20} />,
				navLink: "/apps/orders",
				exact: true,
			},

			{
				id: "Request",
				title: "Request",
				translate: "request",
				type: "collapse",
				icon: <CheckSquare size={20} />,
				// navLink: '/apps/groups/group',
				children: [
					{
						id: "Verify Riders",
						title: "Verify Riders",
						translate: "Verify Riders",
						type: "item",
						navLink: "/apps/riders/verify",
						exact: true,
					},
					{
						id: "Verify Users",
						title: "Verify Users",
						type: "item",
						translate: "Verify Users",
						navLink: "/apps/users/verify",
						exact: true,
					},
				],
			},
		],
	},
];

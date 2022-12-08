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
import { BiStore } from "react-icons/bi";
import { FaBoxes } from "react-icons/fa";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { RiEBikeLine } from "react-icons/ri";
import { FiPackage } from "react-icons/fi";
import {
	MdOutlinePendingActions,
	MdOutlineStorefront,
	MdOutlineProductionQuantityLimits,
} from "react-icons/md";

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
				id: "Sellers",
				title: "Sellers",
				translate: "Sellers",
				type: "item",
				navLink: "/apps/sellers",
				exact: true,
				icon: <MdOutlineStorefront size={20} />,
			},
			{
				id: "Customers",
				title: "Customers",
				translate: "Customers",
				type: "item",
				icon: <User size={20} />,
				navLink: "/apps/customers",
				exact: true,
			},
			{
				id: "store",
				title: "Store",
				icon: <BiStore size={20} />,
				navLink: "/apps/store",
			},
			{
				id: "products",
				title: "Products",
				icon: <MdOutlineProductionQuantityLimits size={20} />,
				navLink: "/apps/products",
			},
			{
				id: "Riders",
				title: "Riders",
				translate: "Riders",
				type: "item",
				icon: <RiEBikeLine size={20} />,
				navLink: "/apps/rider",
				exact: true,
			},
			{
				id: "orders",
				title: "Orders",
				translate: "Orders",
				type: "item",
				icon: <FiPackage size={20} />,
				navLink: "/apps/orders",
				exact: true,
			},
			{
				id: "deals",
				title: "Deals",
				translate: "Deals",
				type: "item",
				icon: <FaBoxes size={20} />,
				navLink: "/apps/deals",
				exact: true,
			},
			{
				id: "Request",
				title: "Request",
				translate: "request",
				type: "collapse",
				icon: <MdOutlinePendingActions size={20} />,
				// navLink: '/apps/groups/group',
				children: [
					{
						id: "Verify Users",
						title: "Verify Sellers",
						type: "item",
						icon: <Circle size={12} />,
						translate: "Verify Users",
						navLink: "/apps/users/verify",
						exact: true,
					},
					{
						id: "Verify Products",
						title: "Verify Products",
						translate: "Verify Products",
						icon: <Circle size={12} />,
						type: "item",
						navLink: "/apps/products/verify",
						exact: true,
					},
					{
						id: "Verify Riders",
						title: "Verify Riders",
						translate: "Verify Riders",
						icon: <Circle size={12} />,
						type: "item",
						navLink: "/apps/riders/verify",
						exact: true,
					},
					{
						id: "Verify Deals",
						title: "Verify Deals",
						translate: "Verify Deals",
						icon: <Circle size={12} />,
						type: "item",
						navLink: "/apps/deals/verify",
						exact: true,
					},
				],
			},
		],
	},
];

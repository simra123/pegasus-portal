// ** React Imports
import { lazy } from "react";
import { Redirect } from "react-router-dom";

const AppRoutes = [
	// {
	// 	path: "/apps/email",
	// 	exact: true,
	// 	appLayout: true,
	// 	className: "email-application",
	// 	component: lazy(() => import("../../views/apps/email")),
	// },
	// {
	// 	path: "/apps/email/:folder",
	// 	exact: true,
	// 	appLayout: true,
	// 	className: "email-application",
	// 	component: lazy(() => import("../../views/apps/email")),
	// 	meta: {
	// 		navLink: "/apps/email",
	// 	},
	// },
	// {
	// 	path: "/apps/email/label/:label",
	// 	exact: true,
	// 	appLayout: true,
	// 	className: "email-application",
	// 	component: lazy(() => import("../../views/apps/email")),
	// 	meta: {
	// 		navLink: "/apps/email",
	// 	},
	// },
	// {
	// 	path: "/apps/email/:filter",
	// 	component: lazy(() => import("../../views/apps/email")),
	// 	meta: {
	// 		navLink: "/apps/email",
	// 	},
	// },
	// // {
	// //   path: "/apps/rider",
	// //   className: "chat-application",
	// //   component: lazy(() => import("../../views/pages/verification")),
	// // },
	// {
	// 	path: "/apps/orders",
	// 	exact: true,
	// 	appLayout: true,
	// 	className: "todo-application",
	// 	component: lazy(() => import("../../views/pages/invoice/list")),
	// },
	// {
	// 	path: "/apps/todo/:filter",
	// 	appLayout: true,
	// 	exact: true,
	// 	className: "todo-application",
	// 	component: lazy(() => import("../../views/apps/todo")),
	// 	meta: {
	// 		navLink: "/apps/todo",
	// 	},
	// },
	// {
	// 	path: "/apps/todo/tag/:tag",
	// 	appLayout: true,
	// 	className: "todo-application",
	// 	component: lazy(() => import("../../views/apps/todo")),
	// 	meta: {
	// 		navLink: "/apps/todo",
	// 	},
	// },
	// {
	// 	path: "/apps/calendar",
	// 	component: lazy(() => import("../../views/apps/calendar")),
	// },
	// {
	// 	path: "/apps/invoice/list",
	// 	component: lazy(() => import("../../views/apps/invoice/list")),
	// },
	// {
	// 	path: "/apps/invoice/preview/:id",
	// 	component: lazy(() => import("../../views/apps/invoice/preview")),
	// 	meta: {
	// 		navLink: "/apps/invoice/preview",
	// 	},
	// },
	// {
	// 	path: "/apps/invoice/preview",
	// 	exact: true,
	// 	component: () => <Redirect to='/apps/invoice/preview/4987' />,
	// },
	// {
	// 	path: "/apps/invoice/edit/:id",
	// 	component: lazy(() => import("../../views/apps/invoice/edit")),
	// 	meta: {
	// 		navLink: "/apps/invoice/edit",
	// 	},
	// },
	// {
	// 	path: "/apps/invoice/edit",
	// 	exact: true,
	// 	component: () => <Redirect to='/apps/invoice/edit/4987' />,
	// },
	// {
	// 	path: "/apps/invoice/add",
	// 	component: lazy(() => import("../../views/apps/invoice/add")),
	// },
	// {
	// 	path: "/apps/invoice/print",
	// 	layout: "BlankLayout",
	// 	component: lazy(() => import("../../views/apps/invoice/print")),
	// },
	// {
	// 	path: "/apps/ecommerce/shop",
	// 	className: "ecommerce-application",
	// 	component: lazy(() => import("../../views/apps/ecommerce/shop")),
	// },
	// {
	// 	path: "/apps/ecommerce/wishlist",
	// 	className: "ecommerce-application",
	// 	component: lazy(() => import("../../views/apps/ecommerce/wishlist")),
	// },
	// {
	// 	path: "/apps/products",
	// 	appLayout: true,
	// 	exact: true,
	// 	className: "ecommerce-application",
	// 	component: () => (
	// 		<Redirect to='/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />
	// 	),
	// },
	// {
	// 	path: "/apps/ecommerce/product-detail/:product",
	// 	exact: true,
	// 	className: "ecommerce-application",
	// 	component: lazy(() => import("../../views/apps/ecommerce/detail")),
	// 	meta: {
	// 		navLink: "/apps/ecommerce/product-detail",
	// 	},
	// },
	// {
	// 	path: "/apps/ecommerce/checkout",
	// 	className: "ecommerce-application",
	// 	component: lazy(() => import("../../views/apps/ecommerce/checkout")),
	// },
	// {
	// 	path: "/apps/user/list",
	// 	component: lazy(() => import("../../views/apps/user/list")),
	// },
	// {
	// 	path: "/apps/users/verify",
	// 	exact: true,
	// 	component: lazy(() => import("../../views/pages/verification")),
	// },
	// {
	// 	path: "/apps/products/verify",
	// 	exact: true,
	// 	component: lazy(() => import("../../views/pages/verification")),
	// },
	// {
	// 	path: "/apps/riders/verify",
	// 	exact: true,
	// 	component: lazy(() => import("../../views/pages/verification")),
	// },
	// {
	// 	path: "/apps/sellers",
	// 	component: lazy(() => import("../../views/pages/sellers")),
	// },
	// {
	// 	path: "/apps/seller/view/:id",
	// 	className: "todo-application ecommerce-application",
	// 	component: lazy(() => import("../../views/apps/todo")),
	// 	meta: {
	// 		navLink: "/apps/seller/view",
	// 	},
	// },
	// {
	// 	path: "/apps/todo/products",
	// 	className: "todo-application ecommerce-application",
	// 	component: lazy(() => import("../../views/apps/todo")),
	// },
	// {
	// 	path: "/apps/customers",
	// 	component: lazy(() =>
	// 		import("../../views/apps/roles-permissions/permissions")
	// 	),
	// },
];

export default AppRoutes;

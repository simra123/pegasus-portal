// ** Icons Import
import { Mail, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield } from 'react-feather'

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
        navLink: "/apps/roles",
      },
      {
        id: "cus",
        title: "Customers",
        icon: <Circle size={12} />,
        navLink: "/apps/permissions",
      },
    ],
  },
  {
    id: "rider",
    title: "Riders",
    icon: <MessageSquare size={20} />,
    navLink: "/apps/chat",
  },
  {
    id: "order",
    title: "Order",
    icon: <CheckSquare size={20} />,
    navLink: "/apps/todo",
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
        navLink: "/apps/user/list",
      },
      {
        id: "shop",
        title: "Verify Stores",
        icon: <Circle size={12} />,
        navLink: "/apps/user/view",
      },
      {
        id: "prod",
        title: "Verify Products",
        icon: <Circle size={12} />,
        navLink: "/apps/user/view",
      },
    ],
  },
]

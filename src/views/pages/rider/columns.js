// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { store } from "@store/store";
import { getUser } from "@src/views/apps/user/store";

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, Eye } from "react-feather";

// ** Reactstrap Imports
import { Badge, Button } from "reactstrap";

import moment from "moment";

// ** Renders Client Columns
const renderClient = (row) => {
	const stateNum = Math.floor(Math.random() * 6),
		states = [
			"light-success",
			"light-danger",
			"light-warning",
			"light-info",
			"light-primary",
			"light-secondary",
		],
		color = states[stateNum];

	if (row.image) {
		return (
			<Avatar
				className='me-1'
				img={row.image}
				width='32'
				height='32'
			/>
		);
	} else {
		return (
			<Avatar
				color={color || "primary"}
				className='me-1'
				content={row.username || "John Doe"}
				initials
			/>
		);
	}
};

// ** Renders Role Columns
const renderRole = (row) => {
	const roleObj = {
		subscriber: {
			class: "text-primary",
			icon: User,
		},
		maintainer: {
			class: "text-success",
			icon: Database,
		},
		editor: {
			class: "text-info",
			icon: Edit2,
		},
		seller: {
			class: "text-warning",
			icon: User,
		},
		admin: {
			class: "text-danger",
			icon: Slack,
		},
	};

	const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2;

	return (
		<span className='text-truncate text-capitalize align-middle'>
			<Icon
				size={18}
				className={`${roleObj[row.role] ? roleObj[row.role].class : ""} me-50`}
			/>
			{row.role}
		</span>
	);
};

const statusObj = {
	pending: "light-warning",
	active: "light-success",
	inactive: "light-secondary",
};

export const columns = [
	{
		name: "Name",
		sortable: true,
		minWidth: "297px",
		sortField: "username",
		selector: (row) => row.username,
		cell: (row) => (
			<div className='d-flex justify-content-left align-items-center'>
				{renderClient(row)}
				<div className='d-flex flex-column'>
					<Link
						to={`/apps/seller/view/9`}
						className='user_name text-truncate text-body'
						onClick={() => store.dispatch(getUser(row.id))}>
						<span className='fw-bold'>{row.username}</span>
					</Link>
					<small className='text-truncate text-muted mb-0'>{row.email}</small>
				</div>
			</div>
		),
	},
	{
		name: "Role",
		sortable: true,
		minWidth: "172px",
		sortField: "role",
		selector: (row) => row.role,
		cell: (row) => renderRole(row),
	},
	{
		name: "Number",
		sortable: true,
		minWidth: "150px",
		sortField: "billing",
		selector: (row) => row.number,
		sortField: "billing",
		selector: (row) => row.number,
		cell: (row) => <span className='text-capitalize'>{row.number}</span>,
	},
	{
		name: "Date",
		sortable: true,
		minWidth: "180px",
		sortField: "dt",
		selector: (row) => row.dt,
		cell: (row) => <span>{moment(row.dt).format("DD-MM-YY, h:mm a")}</span>,
	},
	{
		name: "Status",
		sortable: true,
		minWidth: "150px",
		sortField: "enabled",
		selector: (row) => (row.enabled == false ? "inactive" : ""),
		cell: (row) => (
			<Badge
				className='text-capitalize'
				color={row.enabled == false ? statusObj["pending"] : ""}
				pill>
				{row.enabled == false ? "Pending" : "active"}
			</Badge>
		),
	},
	{
		name: "Details",
		minWidth: "50px",
		cell: (row) => (
			<Link to={`/apps/sellers/details`}>
				<Button
					color='primary'
					size='sm'>
					View
				</Button>
			</Link>
		),
	},
];

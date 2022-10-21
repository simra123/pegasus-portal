// ** React Imports
import { useState, useEffect, forwardRef } from "react";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import { Loader, Pagination } from "../reuseable";

import {
	Card,
	Input,
	Row,
	Col,
	Button,
	Badge,
	Table,
	CardBody,
} from "reactstrap";
import Avatar from "@components/avatar";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CoreHttpHandler from "../../../http/services/CoreHttpHandler";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
	<div className='form-check'>
		<Input
			type='checkbox'
			ref={ref}
			{...props}
		/>
	</div>
));

const SellersTable = () => {
	const handleDetails = (e) => {
		history.push({
			pathname: "/apps/sellers/details",
			state: { id: e.store_id },
		});
	};

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [currentParams, setCurrentParams] = useState({
		limit: 10,
		page: 0,
	});
	const history = useHistory();
	const getUsersData = () => {
		CoreHttpHandler.request(
			"customers",
			"fetchAdmin",
			{
				...currentParams,
			},
			(response) => {
				setLoading(false);
				const res = response.data.data;
				setTotalPages(res.totalPages);
				setData(res.data);
			},
			(failure) => {
				setLoading(false);
			}
		);
	};

	useEffect(() => {
		getUsersData();
	}, [currentParams]);

	return (
		<>
			<Card>
				<CardBody>
					{!loading && data ? (
						<Table
							striped
							responsive
							className='border-none'>
							<thead>
								<tr style={{ fontSize: "11px" }}>
									<th>SN</th>
									<th>Name</th>
									<th>Number</th>
									<th>Date</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{data?.map((customer, index) => {
									return (
										<tr key={customer.id}>
											<td>{index + 1}</td>

											<td>{customer.username}</td>
											<td>{customer.number}</td>
											<td>{customer.dt}</td>
											<td>
												{customer.enabled ? (
													<Badge
														pill
														color='light-primary'
														className='mr-1'>
														Active
													</Badge>
												) : (
													<Badge
														pill
														color='light-danger'
														className='mr-1'>
														InActive
													</Badge>
												)}
											</td>
											{/* <td>
												{" "}
												<Button
													color='primary'
													size='sm'
													className='text-primary'
													onClick={() => handleDetails(customer)}>
													view
												</Button>
											</td> */}
										</tr>
									);
								})}
							</tbody>
						</Table>
					) : null}
					{!loading && !data?.length && (
						<div className='text-ceter'>No Data Found</div>
					)}
					<Loader loading={loading} />
				</CardBody>
			</Card>
			<Pagination
				total={totalPages}
				handlePagination={(e) =>
					setCurrentParams({ limit: 10, page: e.selected })
				}
			/>
		</>
	);
};

export default SellersTable;

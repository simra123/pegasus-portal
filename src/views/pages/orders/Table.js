// ** React Imports
import { useState, useEffect, forwardRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { Loader, Pagination, DataNotFound, SearchFilters } from "../reuseable";
import moment from "moment";
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
import { Navigation } from "react-feather";
// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CoreHttpHandler from "../../../http/services/CoreHttpHandler";
import InvoicePreview from "./preview";

const SellersTable = () => {
	// const handleDetails = (e) => {
	// 	history.push({
	// 		pathname: "/apps/sellers/details",
	// 		state: { id: e.store_id },
	// 	});
	// };
	const [tempTotal, setTempTotal] = useState(0);
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [currentParams, setCurrentParams] = useState({
		limit: 10,
		page: 0,
	});
	const [picker, setPicker] = useState(new Date());
	const [filter, setFilter] = useState("");
	const [searchVal, setSearchVal] = useState("");
	const [data2, setData2] = useState([]);
	const [showDetails, setShowDetails] = useState(false);
	const [singleOrder, setSingleOrder] = useState({});

	const history = useHistory();
	const getOrders = (start, end, val, page) => {
		setLoading(true);

		CoreHttpHandler.request(
			"orders",
			"fetch",
			{
				//status: true,
				limit: currentParams.limit,
				page: page ? 0 : currentParams.page,
				filter: val == undefined ? filter : val,
				searchValue: searchVal,
				startDate: start,
				endDate: end,
			},
			(response) => {
				setLoading(false);
				const res = response.data.data.orders;
				setTotalPages(res.totalPages);
				if (filter == "all" || filter == "") {
					setData2(res.orders);
					setTempTotal(res.totalPages);
				}
				setData(res.orders);
				//console.log(res);
			},
			(failure) => {
				setLoading(false);
			}
		);
	};

	useEffect(() => {
		getOrders();
	}, [currentParams]);

	const handleFilter = () => {
		if (picker[0] && picker[1]) {
			getOrders(
				`${moment(picker[0]).format("YYYY-MM-DD")} 00:00:00`,
				`${moment(picker[1]).format("YYYY-MM-DD")} 00:00:00`
			);
		} else {
			getOrders(null, null, null, true);
		}
	};

	const orderStatus = (status) => {
		switch (status) {
			case "accepted":
				return (
					<Badge
						pill
						color='light-primary'
						className='mr-1'>
						Accepted
					</Badge>
				);
			case "order_placed":
				return (
					<Badge
						pill
						color='dark'
						className='mr-1'>
						Order Placed
					</Badge>
				);
			case "delieverd":
				return (
					<Badge
						pill
						color='light-success'
						className='mr-1'>
						Delivered
					</Badge>
				);
			case "picked":
				return (
					<Badge
						pill
						color='light-secondary'
						className='mr-1'>
						Picked
					</Badge>
				);

			default:
				return (
					<Badge
						pill
						color='light-primary'
						className='mr-1'>
						Accepted
					</Badge>
				);
		}
	};
	return (
		<>
			{showDetails && (
				<InvoicePreview
					data={singleOrder}
					setShowDetails={setShowDetails}
				/>
			)}
			{!showDetails && (
				<>
					<Card>
						<CardBody>
							<h3 className='mt-50'>Total Orders</h3>
							<br />
							<SearchFilters
								filter={filter}
								setFilter={setFilter}
								setSearchVal={setSearchVal}
								searchVal={searchVal}
								getData={getOrders}
								data2={data2}
								handleFilter={handleFilter}
								setPicker={setPicker}
								picker={picker}
								setData={setData}
								setTotalPages={setTotalPages}
								tempTotal={tempTotal}
								options={[
									{
										name: "Order no",
										value: "order_no",
									},
									{
										name: "Status",
										value: "status",
									},
									{
										name: "Date",
										value: "date",
									},
								]}
							/>
							{!loading && data ? (
								<Table
									striped
									responsive
									className='border-none'>
									<thead>
										<tr style={{ fontSize: "11px" }}>
											<th>Order id</th>
											<th>order number</th>
											<th>City</th>
											<th>Amount</th>
											<th>Date</th>
											<th>Status</th>
											<th>location</th>
											<th>Details</th>
										</tr>
									</thead>
									<tbody>
										{data?.map((order, index) => {
											return (
												<tr
													style={{ fontSize: "13px" }}
													key={order.id}>
													<td>{order.id}</td>

													<td>{order.order_no}</td>
													<td>{order.city}</td>
													<td>{order.amount}</td>
													<td>{moment(order.dt).format("DD-MM-YY")}</td>
													<td>{orderStatus(order.status)}</td>
													<td>
														<a
															href={`https://www.google.com/maps/place/${order.user_location}`}
															target='_blank'>
															<Navigation size='20' />
														</a>
													</td>
													<td>
														{" "}
														<Button
															color='primary'
															size='sm'
															onClick={() => {
																setShowDetails(true);
																setSingleOrder(order);
															}}>
															view
														</Button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</Table>
							) : null}
							{!loading && !data?.length && <DataNotFound />}
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
			)}
		</>
	);
};

export default SellersTable;

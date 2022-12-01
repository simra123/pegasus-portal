// ** React Imports
import { useState, useEffect, forwardRef } from "react";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import {
	Loader,
	Pagination,
	DatePicker,
	ToastAlertError,
	DataNotFound,
	SearchFilters,
} from "../../../reuseable";
import {
	Card,
	Input,
	Row,
	Col,
	Button,
	Badge,
	Table,
	CardBody,
	Label,
	InputGroup,
	InputGroupText,
} from "reactstrap";
import Avatar from "@components/avatar";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CoreHttpHandler from "../../../../../http/services/CoreHttpHandler";
import { Navigation } from "react-feather";
const OrderTable = ({
	data,
	setCurrentParams,
	totalPages,
	loading,
	setTotalPages,
	setData,
	filter,
	setFilter,
	picker,
	setPicker,
	data2,
	tempTotal,
	getOrders,
	handleFilter,
	searchVal,
	setSearchVal,
}) => {
	const [showDetails, setShowDetails] = useState(false);
	const [singleOrder, setSingleOrder] = useState({});

	const history = useHistory();

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
			{!showDetails && (
				<Card>
					<CardBody>
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
							tempTotal={tempTotal}
							setData={setData}
							setTotalPages={setTotalPages}
							options={[
								{
									name: "Order no",
									value: "order_no",
								},

								{
									name: "Date",
									value: "date",
								},
							]}
						/>

						{!loading && data ? (
							<>
								<Table
									striped
									responsive
									className='border-none'>
									<thead>
										<tr>
											<th style={{ fontSize: "10px" }}>Order Id</th>
											<th style={{ fontSize: "10px" }}>Order</th>
											<th style={{ fontSize: "10px" }}>City</th>
											<th style={{ fontSize: "10px" }}>Amount</th>
											<th style={{ fontSize: "10px" }}>Date</th>
											<th style={{ fontSize: "10px" }}>User location</th>
											<th style={{ fontSize: "10px" }}>Delivery Fee</th>
										</tr>
									</thead>
									<tbody>
										{data?.map((order, index) => {
											return (
												<tr
													key={order.order_id}
													style={{ fontSize: "11px" }}>
													<td>{order.order_id}</td>
													<td>{order.order_no}</td>

													<td>{order.city}</td>
													<td>{order.amount}</td>
													<td>{moment(order.dt).format("YYYY-MM-DD")}</td>
													{/* <td>{orderStatus(order.status)}</td> */}
													<td>
														<a
															href={`https://www.google.com/maps/place/${order.user_location}`}
															target='_blank'>
															<Navigation size='20' />
														</a>
													</td>
													<td>
														{order.delivery_fees ? order.delivery_fees : "0"}
													</td>

													{/* <td>
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
													</td> */}
												</tr>
											);
										})}
									</tbody>
								</Table>
							</>
						) : null}
						{!loading && !data?.length && <DataNotFound />}
					</CardBody>
				</Card>
			)}
			<Loader loading={loading} />

			{!showDetails && (
				<Pagination
					total={totalPages}
					handlePagination={(e) =>
						setCurrentParams({ limit: 10, page: e.selected })
					}
				/>
			)}
		</>
	);
};

export default OrderTable;

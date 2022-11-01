// ** React Imports
import { useState, useEffect, forwardRef } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
	Loader,
	Pagination,
	DatePicker,
	ToastAlertError,
	SearchFilters,
	ToastAlertSuccess,
	DataNotFound,
} from "../../reuseable";

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
import CoreHttpHandler from "../../../../http/services/CoreHttpHandler";

const SellersTable = () => {
	const [data, setData] = useState([]);
	const [data2, setData2] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [tempTotal, setTempTotal] = useState(0);

	const [currentParams, setCurrentParams] = useState({
		limit: 10,
		page: 0,
	});
	const [picker, setPicker] = useState(new Date());
	const [filter, setFilter] = useState("all");
	const [searchVal, setSearchVal] = useState("");

	const getUsersData = (start, end, val) => {
		setLoading(true);
		CoreHttpHandler.request(
			"riders",
			"fetch",
			{
				status: false,
				...currentParams,
				filter: val == undefined ? filter : val,
				searchValue: searchVal,
				startDate: start,
				endDate: end,
			},
			(response) => {
				setLoading(false);
				const res = response.data.data.riders;
				setTotalPages(res.totalPages);
				if (filter == "all" || filter == "") {
					setData2(res.data);
					setTempTotal(res.totalPages);
				}
				setData(res.data);
			},
			(failure) => {
				setLoading(false);
				console.log(failure);
			}
		);
	};

	useEffect(() => {
		getUsersData();
	}, [currentParams]);

	const handleFilter = () => {
		if (filter) {
			setCurrentParams({
				limit: 10,
				page: 0,
			});
		}
		if (picker[0] && picker[1]) {
			getUsersData(
				`${moment(picker[0]).format("YYYY-MM-DD")} 00:00:00`,
				`${moment(picker[1]).format("YYYY-MM-DD")} 00:00:00`
			);
		} else {
			getUsersData();
		}
	};
	const MySwal = withReactContent(Swal);

	const Approval = (id) => {
		MySwal.fire({
			title: "Are you sure?",
			icon: "warning",
			padding: "50px",
			showCancelButton: true,
			customClass: {
				confirmButton: "btn btn-primary",
				cancelButton: "btn btn-outline-danger ms-1",
			},
			background: "#020202",
			buttonsStyling: false,
			confirmButtonText: "Yes",
		}).then(
			(result) => {
				console.log(result, "reddd");
				if (result.value) {
					CoreHttpHandler.request(
						"riders",
						"approval",
						{
							rider_id: id,
							enabled: true,
						},
						(response) => {
							ToastAlertSuccess("Rider has been Approved");

							getUsersData();
						},
						(err) => ToastAlertError("something went wrong")
					);
				}
			},
			(error) => {}
		);
	};
	return (
		<>
			<Card>
				<CardBody>
					<SearchFilters
						filter={filter}
						setFilter={setFilter}
						setSearchVal={setSearchVal}
						searchVal={searchVal}
						getData={getUsersData}
						data2={data2}
						handleFilter={handleFilter}
						setPicker={setPicker}
						picker={picker}
						setData={setData}
						tempTotal={tempTotal}
						setTotalPages={setTotalPages}
					/>
					{!loading && data ? (
						<Table
							striped
							responsive
							className='border-none'>
							<thead>
								<tr style={{ fontSize: "11px" }}>
									<th>SN</th>
									<th>Name</th>
									<th>Email</th>
									<th>City</th>
									<th>Number</th>
									<th>Date</th>
									<th>Status</th>
									<th>Details</th>
								</tr>
							</thead>
							<tbody>
								{data?.map((riders, index) => {
									return (
										<tr key={riders.id}>
											<td>{index + 1}</td>

											<td>{riders.username}</td>
											<td>{riders.email}</td>
											<td>{riders.city}</td>
											<td>{riders.number}</td>
											<td>{riders.dt}</td>
											<td>
												{riders.enabled ? (
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
											<td>
												{" "}
												<Button
													color='primary'
													size='sm'
													className='text-primary'
													onClick={() => Approval(riders.id)}>
													{" "}
													Approval
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
	);
};

export default SellersTable;

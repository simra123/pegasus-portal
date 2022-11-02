// ** React Imports
import { useState, useEffect, forwardRef } from "react";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import {
	Loader,
	Pagination,
	DatePicker,
	ToastAlertError,
	SearchFilters,
} from "../reuseable";
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
			state: { id: e.store_id, data: e },
		});
	};

	const [data, setData] = useState([]);
	const [tempTotal, setTempTotal] = useState(0);
	const [data2, setData2] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [picker, setPicker] = useState(new Date());
	const [filter, setFilter] = useState("all");
	const [searchVal, setSearchVal] = useState("");
	const [currentParams, setCurrentParams] = useState({
		limit: 10,
		page: 0,
	});

	const history = useHistory();
	const getUsersData = (start, end, val) => {
		setLoading(true);
		CoreHttpHandler.request(
			"sellers",
			"fetchAdmin",
			{
				enabled: true,
				...currentParams,
				filter: val == undefined ? filter : val,
				searchValue: searchVal,
				startDate: start,
				endDate: end,
			},
			(response) => {
				setLoading(false);
				const res = response.data.data.data;
				setTotalPages(res.totalPages);
				if (filter == "all" || filter == "") {
					setData2(res.data);
					setTempTotal(res.totalPages);
				}
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

	//console.log(moment(picker[0]).format("YYYY-MM-DD"), "picker");
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
			console.log(filter, "else");
			getUsersData();
		}
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
									<th>Number</th>
									<th>Date</th>
									<th>Status</th>
									<th>Details</th>
								</tr>
							</thead>
							<tbody>
								{data?.map((seller, index) => {
									return (
										<tr key={seller.id}>
											<td>{index + 1}</td>

											<td>{seller.username}</td>
											<td>{seller.number}</td>
											<td>{moment(seller.dt).format("YYYY-MM-DD")}</td>
											<td>
												{seller.enabled ? (
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
													onClick={() => handleDetails(seller)}>
													view
												</Button>
											</td>
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

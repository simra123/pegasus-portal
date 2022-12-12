// ** React Imports
import { useState, useEffect, forwardRef } from "react";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { getAllData, getData } from "@src/views/apps/user/store";
import CoreHttpHandler from "../../../../http/services/CoreHttpHandler";
// ** Third Party Components
import { Search, Trash } from "react-feather";
import { X } from "react-feather";
// ** Reactstrap Imports
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
import {
	Loader,
	Pagination,
	DatePicker,
	ToastAlertError,
	SearchFilters,
	LoadingButton,
} from "../../reuseable";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
// ** React Imports
import { Link } from "react-router-dom";
// ** Custom Components
import Avatar from "@components/avatar";
import Swal from "sweetalert2";

// ** Store & Actions
import { store } from "@store/store";
import { getUser } from "@src/views/apps/user/store";

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, Eye } from "react-feather";

// ** Reactstrap Imports
import moment from "moment/moment";
import { MdAddCircle } from "react-icons/md";

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

// ** Table Header
const CustomHeader = ({
	plan,
	handlePlanChange,
	handlePerPage,
	rowsPerPage,
	handleFilter,
	searchTerm,
}) => {
	return (
		<div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
			<Row>
				<Col
					xl='6'
					className='d-flex align-items-center p-0'>
					<div className='d-flex align-items-center w-100'>
						<label htmlFor='rows-per-page'>Show</label>
						<Input
							className='mx-50'
							type='select'
							id='rows-per-page'
							value={rowsPerPage}
							onChange={handlePerPage}
							style={{ width: "5rem" }}>
							<option value='10'>10</option>
							<option value='25'>25</option>
							<option value='50'>50</option>
						</Input>
						<label htmlFor='rows-per-page'>Entries</label>
					</div>
				</Col>
				<Col
					xl='6'
					className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pe-lg-1 p-0 mt-lg-0 mt-1'>
					<div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
						<label
							className='mb-0'
							htmlFor='search-invoice'>
							Search:
						</label>
						<Input
							type='text'
							value={searchTerm}
							id='search-invoice'
							className='ms-50 w-100'
							onChange={(e) => handleFilter(e.target.value)}
						/>
					</div>
					{/* <Input
						value={plan}
						type='select'
						style={{ width: "10rem" }}
						onChange={(e) => handlePlanChange(e.target.value)}>
						<option value=''>Select Role</option>
						<option value='basic'>Basic</option>
						<option value='company'>Company</option>
						<option value='enterprise'>Enterprise</option>
						<option value='team'>Team</option>
					</Input> */}
				</Col>
			</Row>
		</div>
	);
};

const ProductsTable = () => {
	// ** Store Vars
	const dispatch = useDispatch();
	const store = useSelector((state) => state.users);

	// ** States
	const [plan, setPlan] = useState("");
	const [loading, setLoading] = useState(true);
	const [sort, setSort] = useState("desc");
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [sortColumn, setSortColumn] = useState("id");
	const [data, setData] = useState([]);
	const [storesData, setStoresData] = useState([]);
	const [productsData, setProductsData] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [currentParams, setCurrentParams] = useState({
		limit: 10,
		page: 0,
	});
	const [searchVal, setSearchVal] = useState("");

	// ** Renders Role Columns
	const statusObj = {
		pending: "light-warning",
		active: "light-success",
		inactive: "light-secondary",
	};

	// 	const columns = [
	//     {
	//       name: "Name",
	//       sortable: true,
	//       minWidth: "297px",
	//       sortField: "name",
	//       selector: (row) => row.name,
	//       cell: (row) => (
	//         <div className="d-flex justify-content-left align-items-center">
	//           {/* <img
	//             width="60"
	//             height="35"
	//             className="img-fluid"
	//             src={
	//               row?.attachment?.val[
	//                 row?.attachment["type"]?.findIndex((t) => t == "0")
	//               ]
	//             }
	//           /> */}
	//           <div className="d-flex flex-column">
	//             <span className="fw-bold" style={{ marginLeft: "20px" }}>
	//               {row.name}
	//             </span>
	//           </div>
	//         </div>
	//       ),
	//     },
	//     {
	//       name: "Product Category",
	//       sortable: true,
	//       minWidth: "220px",
	//       sortField: "product_category",
	//       selector: (row) => row.product_category,
	//       cell: (row) => (
	//         <span style={{ marginLeft: "30px" }}>{row.product_category}</span>
	//       ),
	//     },
	//     {
	//       name: "Date",
	//       sortable: true,
	//       minWidth: "180px",
	//       sortField: "dt",
	//       selector: (row) => row.dt,
	//       cell: (row) => <span>{moment(row.dt).format("DD-MM-YY, h:mm a")}</span>,
	//     },
	//     {
	//       name: "Status",
	//       sortable: true,
	//       minWidth: "150px",
	//       sortField: "enabled",
	//       selector: (row) => (row.enabled == false ? "pending" : ""),
	//       cell: (row) => (
	//         <Badge
	//           className="text-capitalize"
	//           color={row.enabled == false ? statusObj["pending"] : ""}
	//           pill
	//         >
	//           {row.enabled == false ? "pending" : "Pending"}
	//         </Badge>
	//       ),
	//     },
	//     {
	//       name: "Details",
	//       minWidth: "50px",
	//       cell: (row) => (
	//         <Link
	//           to={{
	//             pathname: `/apps/product/edit/9`,
	//             state: { id: 1, name: "sabaoon", shirt: "green" },
	//           }}
	//         >
	//           <Button color="danger" size="sm" onClick={(e) => {}}>
	//             Edit
	//           </Button>
	//         </Link>
	//       ),
	//     },
	//   ];

	useEffect(() => {
		if (searchVal == "") {
			getUsersData();
		} else {
			onClickSearch();
		}
	}, [currentParams]);

	const getUsersData = () => {
		setLoading(true);
		CoreHttpHandler.request(
			"products",
			"fetch",
			{
				...currentParams,
			},
			(response) => {
				setLoading(false);
				setTotalPages(response.data.data.data.totalPages);
				setData(response.data.data.data.product);
			},
			(failure) => {}
		);
	};

	// ** Function in get data on page change
	const handlePagination = (page) => {
		dispatch(
			getData({
				sort,
				role: "",
				status: "",
				sortColumn,
				q: searchTerm,
				currentPlan: plan,
				perPage: rowsPerPage,
				page: page.selected + 1,
			})
		);
		setCurrentPage(page.selected + 1);
	};

	// ** Function in get data on rows per page
	const handlePerPage = (e) => {
		const value = parseInt(e.currentTarget.value);
		dispatch(
			getData({
				sort,
				role: "",
				sortColumn,
				status: "",
				q: searchTerm,
				perPage: value,
				currentPlan: plan,
				page: currentPage,
			})
		);
		setRowsPerPage(value);
	};
	// ** Function in get data on search query change
	const handleFilter = (val) => {
		setSearchTerm(val);
		dispatch(
			getData({
				q: val,
				sort,
				role: "",
				sortColumn,
				status: "",
				currentPlan: plan,
				page: currentPage,
				perPage: rowsPerPage,
			})
		);
	};

	const handlePlanChange = (val) => {
		setPlan(val);
		dispatch(
			getData({
				sort,
				role: val,
				sortColumn,
				status: "",
				q: searchTerm,
				currentPlan: plan,
				page: currentPage,
				perPage: rowsPerPage,
			})
		);
	};

	// ** Table data to render
	const dataToRender = () => {
		return data.product;
		// const filters = {
		// 	q: searchTerm,
		// };

		// const isFiltered = Object.keys(filters).some(function (k) {
		// 	return filters[k].length > 0;
		// });

		// if (store.data.length > 0) {
		// 	return store.data;
		// } else if (store.data.length === 0 && isFiltered) {
		// 	return [];
		// } else {
		// 	return store.allData.slice(0, rowsPerPage);
		// }
	};

	const handleSort = (column, sortDirection) => {
		setSort(sortDirection);
		setSortColumn(column.sortField);
		dispatch(
			getData({
				sort,
				role: "",
				sortColumn,
				status: "",
				q: searchTerm,
				currentPlan: plan,
				page: currentPage,
				perPage: rowsPerPage,
			})
		);
	};

	const Remove = (e) => {
		CoreHttpHandler.request(
			"products",
			"delete",
			{
				product_id: e.id,
			},
			(response) => {
				Swal.fire({
					icon: "success",
					title: "Success",
					text: "Successfully Deleted Product.",
					showCancelButton: false,
					customClass: {
						confirmButton: "btn btn-primary",
						cancelButton: "btn btn-outline-danger ms-1",
					},
					background: "#020202",
				});
				setLoading(false);
				getUsersData();
			},
			(failure) => {}
		);
	};

	const onClickSearch = (page) => {
		if (page == 0) {
			setCurrentPage({
				limit: 10,
				page: 0,
			});
		}
		setLoading(true);
		CoreHttpHandler.request(
			"products",
			"search",
			{
				page: page == 0 ? 0 : currentParams.page,
				limit: currentParams.limit,
				name: searchVal,
			},
			(response) => {
				setLoading(false);
				const res = response.data.data.data.data;
				setTotalPages(response.data.data.data.totalPages);
				setData(res);
			},
			(failure) => {}
		);
	};

	return (
		<>
			<h3 className='mt-50'>Products</h3>

			<Row className='mt-1 justify-content-end'>
				<Col sm='3'>
					<InputGroup className='input-group-merge'>
						<Input
							className='search-product'
							placeholder='Search Product'
							value={searchVal}
							onChange={(e) => setSearchVal(e.target.value)}
						/>
						<InputGroupText>
							{searchVal.length > 0 && (
								<X
									style={{ cursor: "pointer" }}
									onClick={() => {
										getUsersData();
										setSearchVal("");
									}}
									className='text-muted'
									size={14}
								/>
							)}
						</InputGroupText>
					</InputGroup>
				</Col>
				<Col sm='1'>
					<Button
						className='text-primary cursor-pointer'
						onClick={() => onClickSearch(0)}
						size='sm'
						color='primary'
						style={{ height: "35px" }}>
						<Search size={15} />
					</Button>
				</Col>
			</Row>
			<br />
			{!loading && data ? (
				<Table
					striped
					responsive
					className='border-none'>
					<thead>
						<tr style={{ fontSize: "11px" }}>
							<th>SN</th>
							<th>Name</th>
							<th>Category</th>
							<th>Date</th>
							<th>Status</th>
							<th>Details</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{data?.map((p, index) => {
							return (
								<tr key={p.id}>
									<td>{index + 1}</td>

									<td>{p.name}</td>
									<td>{p.product_category}</td>
									<td>{moment(p.dt).format("YYYY-MM-DD")}</td>
									<td>
										{p.enabled ? (
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
												Pending
											</Badge>
										)}
									</td>
									<td>
										{" "}
										<Link
											to={{
												pathname: `/apps/product/edit/${p.id}`,
												state:
													p["attachment"][0]?.url != null
														? { ...p, type: "Edit" }
														: { ...p, type: "Edit", attachment: [] },
											}}>
											<Button
												color='primary'
												size='sm'>
												Edit
											</Button>
										</Link>
									</td>
									<td onClick={() => Remove(p)}>
										<Trash
											size={18}
											style={{ marginLeft: "20px", cursor: "pointer" }}
										/>
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
			<MdAddCircle
				color='#f3ac3b'
				size='35'
				style={{
					cursor: "pointer",
					float: "right",
					marginRight: "20px",
				}}
				// onClick={() => setShowCreate(true)}
			/>
			<Pagination
				total={totalPages}
				handlePagination={(e) =>
					setCurrentParams({ limit: 10, page: e.selected })
				}
			/>
			<Link
				to={{
					pathname: `/apps/product/add`,
					state: { type: "Add", attachment: [] },
				}}></Link>
		</>
	);
};

export default ProductsTable;

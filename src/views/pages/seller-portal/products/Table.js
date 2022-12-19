// ** React Imports
import { useState, useEffect, forwardRef } from "react";
import withReactContent from "sweetalert2-react-content";

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
	ToastAlertSuccess,
} from "../../reuseable";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
// ** React Imports
import { Link } from "react-router-dom";
// ** Custom Components
import Swal from "sweetalert2";

// ** Reactstrap Imports
import moment from "moment/moment";
import { MdAddCircle } from "react-icons/md";

const MySwal = withReactContent(Swal);

const ProductsTable = () => {
	// ** States
	const [currentPage, setCurrentPage] = useState(0);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [totalPages, setTotalPages] = useState(0);

	const [currentParams, setCurrentParams] = useState({
		limit: 10,
		page: 0,
	});
	const [searchVal, setSearchVal] = useState("");
	const [showCreate, setShowCreate] = useState(false);

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

	const Remove = (item) => {
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
				if (result.value) {
					CoreHttpHandler.request(
						"products",
						"delete",
						{
							product_id: item.id,
						},
						(response) => {
							ToastAlertSuccess("Product has been Deleted");
							getUsersData();
						},
						(err) => {
							ToastAlertError(
								err?.response?.data?.message
									? err?.response.data.message
									: "something went wrong"
							);
						}
					);
				}
			},
			(error) => {}
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
				}}>
				<MdAddCircle
					color='#f3ac3b'
					size='35'
					style={{
						cursor: "pointer",
						float: "right",
						marginRight: "20px",
					}}
					onClick={() => setShowCreate(true)}
				/>
			</Link>
		</>
	);
};

export default ProductsTable;

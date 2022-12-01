// ** React Imports
import { useState, useEffect, forwardRef } from "react";
import { useHistory, Link } from "react-router-dom";
import ProductDetails from "./productsDetails";
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
import CoreHttpHandler from "../../../../http/services/CoreHttpHandler";
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
import { getProduct } from "../../sellers/sidebar/products/store";
const SellersTable = () => {
	const handleDetails = (e) => {
		history.push({
			pathname: "/apps/sellers/details",
			state: { id: e.store_id },
		});
	};
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
	const [productDetails, setProductDetails] = useState({});
	const [modal, setModal] = useState(false);

	const history = useHistory();
	const getProducts = (start, end, val, page) => {
		setLoading(true);

		CoreHttpHandler.request(
			"deals",
			"fetch_admin",
			{
				limit: currentParams.limit,
				page: page ? 0 : currentParams.page,
				filter: val == undefined ? filter : val,
				searchValue: searchVal,
				startDate: start,
				endDate: end,
				status: false
			},
			(response) => {
				setLoading(false);
				const res = response.data.data.data;
				setTotalPages(res.totalPages);
				if (filter == "all" || filter == "") {
					setData2(res.product);
					setTempTotal(res.totalPages);
				}
				setData(res.hotDeals);
			},
			(failure) => {
				setLoading(false);
				console.log(failure);
			}
		);
	};

	useEffect(() => {
		getProducts();
	}, [currentParams]);

	const handleFilter = () => {
		if (picker[0] && picker[1]) {
			getProducts(
				`${moment(picker[0]).format("YYYY-MM-DD")} 00:00:00`,
				`${moment(picker[1]).format("YYYY-MM-DD")} 00:00:00`
			);
		} else {
			getProducts(null, null, null, true);
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
				if (result.value) {
					CoreHttpHandler.request(
						"deals",
						"approve",
						{ key: ":id", value: id },
						(response) => {
							ToastAlertSuccess("Deal has been Approved");
							getProducts();
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
					<ProductDetails
						modal={modal}
						setModal={setModal}
						data={productDetails}
					/>
					<SearchFilters
						filter={filter}
						setFilter={setFilter}
						setSearchVal={setSearchVal}
						searchVal={searchVal}
						getData={getProducts}
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
									<th>Name</th>
									<th>Deal Price</th>
									<th>Regular Price</th>
									<th>Store</th>
									<th>Status</th>
									<th>Details</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{data?.map((product, index) => {
									return (
										<tr
											style={{ fontSize: "13px" }}
											key={product.id}>
											<td>{product.name}</td>
											<td>{product.deal_price}</td>
											<td>{product.regular_price}</td>

											<td>{product.products[0].store_name}</td>
											<td>
												{product.enabled ? (
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
												<Button
													color='primary'
													size='sm'
													className='text-primary'
													onClick={() => {
														setProductDetails(product);
														setModal(true);
													}}>
													view
												</Button>
											</td>

											<td>
												<Button
													color='primary'
													size='sm'
													className='text-primary'
													onClick={() => Approval(product.id)}>
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

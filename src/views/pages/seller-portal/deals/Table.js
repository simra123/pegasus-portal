// ** React Imports
import { useState, useEffect, forwardRef } from "react";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import logo from "@src/assets/images/logo/image.png";

import {
	Loader,
	Pagination,
	DatePicker,
	ToastAlertError,
	DataNotFound,
	LoadingButton,
	TextEditor,
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
	Label,
	InputGroup,
	InputGroupText,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
} from "reactstrap";
import Select from "react-select";

import Avatar from "@components/avatar";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CoreHttpHandler from "../../../../http/services/CoreHttpHandler";
import { MdAddCircle } from "react-icons/md";
import { useForm } from "react-hook-form";
import { selectThemeColors } from "@utils";
import Swal from "sweetalert2";
import Flatpickr from "react-flatpickr";
import ContentUploadHandler from "../../../../http/services/ContentUploadHandler";
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import { EditorState, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import { defaultProductImage, url } from "../../../../image-service-url";
import { Trash } from "react-feather";

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

const SellersTable = (props) => {
	const { storeData, productsData } = props;

	const [data, setData] = useState([]);
	const [tempTotal, setTempTotal] = useState(0);
	const [data2, setData2] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [picker, setPicker] = useState(new Date());
	const [filter, setFilter] = useState("all");
	const [searchVal, setSearchVal] = useState("");
	const [showCreate, setShowCreate] = useState(false);
	const [product_ids, setProduct_ids] = useState([]);
	const [avatar, setAvatar] = useState(logo);
	const [name, setName] = useState("");
	const [regularPrice, setRegularPrice] = useState("");
	const [dealPrice, setDealPrice] = useState("");
	const [date, setDate] = useState("");
	const [image, setImage] = useState("");
	const [stock, setStock] = useState("");
	const [description, setDescription] = useState(EditorState.createEmpty());
	const [fileData, setFileData] = useState("");
	const [dealId, setdealId] = useState("");
	const paraToHtml = description?.getCurrentContent().getPlainText();

	const [type, setType] = useState("");

	console.log(new Date(), "dateet");

	let filename = "";

	console.log(product_ids, "oososos");

	const [currentParams, setCurrentParams] = useState({
		limit: 10,
		page: 0,
	});

	const history = useHistory();

	const getDealsData = (start, end, val) => {
		setLoading(true);
		CoreHttpHandler.request(
			"deals",
			"fetch_deals",
			{
				store_id: storeData?.id,
				enabled: true,
				...currentParams,
			},
			(response) => {
				setLoading(false);
				const res = response.data.data.data;
				setTotalPages(res.totalPages);
				// if (filter == "all" || filter == "") {
				// 	setData2(res.data);
				// 	setTempTotal(res.totalPages);
				// }
				setData(res.hotDeals);
			},
			(failure) => {
				setLoading(false);
			}
		);
	};

	const {
		reset,
		control,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			date: "",
			regular_price: "",
			deal_price: "",
			image: "",
			product_ids: [],
		},
	});

	useEffect(() => {
		if (storeData) {
			getDealsData();
		}
	}, [currentParams, storeData]);

	const statusOptions = [
		{ value: "active", label: "Active" },
		{ value: "inactive", label: "Inactive" },
		{ value: "suspended", label: "Suspended" },
	];

	const onChange = (e) => {
		filename = e.target.files[0].name;

		const reader = new FileReader(),
			files = e.target.files;
		reader.onload = function () {
			setAvatar(reader.result);
		};
		reader.readAsDataURL(files[0]);
		setFileData(e.target.files[0]);
	};

	const handleImgReset = () => {
		setAvatar(require("@src/assets/images/logo/image.png").default);
	};

	const onSubmit = (data) => {
		if (picker[0] == undefined || picker[1] == undefined) {
			ToastAlertError(`Please select start date and end date`);
		}
		if (product_ids.length == 0) {
			return ToastAlertError(`Please select products`);
		}
		if (dealPrice == "") {
			return ToastAlertError(`Please select deal price`);
		}
		if (regularPrice == "") {
			return ToastAlertError(`Please select regular price`);
		}
		if (stock == "") {
			return ToastAlertError(`Please select stock`);
		}
		if (description == "") {
			return ToastAlertError(`Please select description`);
		}
		if (name == "") {
			return ToastAlertError(`Please select name`);
		}

		const _data = new FormData();

		let ids = product_ids.map((p) => p.value);
		console.log(ids, "ioop");
		let startDate = moment(picker[0]).format("YYYY-MM-DD");
		let endDate = moment(picker[1]).format("YYYY-MM-DD");
		setLoading(true);
		if (fileData != "") {
			_data.append("file", fileData, `${new Date().getTime()}_${filename}`);
			ContentUploadHandler.request(
				"content",
				"upload",
				{
					params: _data,
				},
				(response) => {
					let img = response.data.data.file;
					CoreHttpHandler.request(
						"deals",
						type == "edit" ? "update_deals" : "create_deals",
						{
							name: name,
							featured_image: img,
							store_id: storeData?.id,
							description: paraToHtml,
							stock: stock,
							deal_price: dealPrice,
							regular_price: regularPrice,
							product_ids: ids,
							startDate: startDate,
							endDate: endDate,
							hot_deal_id: dealId,
						},
						(response) => {
							setLoading(false);
							document.body.style.opacity = 1;
							Swal.fire({
								icon: "success",
								title: "Success",
								text: "Successfully Created Hot Deals",
								showCancelButton: false,
								customClass: {
									confirmButton: "btn btn-primary",
									cancelButton: "btn btn-outline-danger ms-1",
								},
								background: "#020202",
							});

							getDealsData();
							setShowCreate(false);
						},
						(error) => {}
					);
				},
				(error) => {
					setLoading(false);
				}
			);
		} else {
			let img = `${url}${defaultProductImage}`;
			CoreHttpHandler.request(
				"deals",
				type == "edit" ? "update_deals" : "create_deals",
				{
					name: name,
					featured_image: img,
					store_id: storeData?.id,
					description: paraToHtml,
					stock: stock,
					deal_price: dealPrice,
					regular_price: regularPrice,
					product_ids: ids,
					startDate: startDate,
					endDate: endDate,
					hot_deal_id: dealId,
				},
				(response) => {
					setLoading(false);
					document.body.style.opacity = 1;
					Swal.fire({
						icon: "success",
						title: "Success",
						text: "Successfully Created Hot Deals",
						showCancelButton: false,
						customClass: {
							confirmButton: "btn btn-primary",
							cancelButton: "btn btn-outline-danger ms-1",
						},
						background: "#020202",
					});

					getDealsData();
					setShowCreate(false);
				},
				(error) => {
					setLoading(false);
				}
			);
		}
	};

	const customStyles = {
		option: (base, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...base,
				backgroundColor: isFocused ? "red" : "rgba(52, 52, 52, 1)",
			};
		},
	};

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

	const handleDetails = async (data) => {
		setName(data.name);
		setRegularPrice(data.regular_price);
		setDealPrice(data.deal_price);
		setDescription(
			data.description == undefined || data.description == null
				? EditorState.createEmpty()
				: EditorState.createWithContent(
						ContentState.createFromText(data?.description)
				  )
		);
		setStock(data.stock);
		setAvatar(data.featured_image);
		let arr = [];
		arr.push(new Date(data.start_date));
		arr.push(new Date(data.end_date));
		setPicker(arr);
		let ids = [];
		await data.products.map((d) => {
			ids.push({ label: d.name, value: d.id });
		});
		setProduct_ids(ids);
		setType("edit");
		setShowCreate(true);
		setdealId(data?.id);
	};

	const handleDelete = (e) => {
		CoreHttpHandler.request(
			"deals",
			"delete",
			{
				hot_deal_id: e.id,
				store_id: storeData?.id,
			},
			(response) => {
				Swal.fire({
					icon: "success",
					title: "Success",
					text: "Successfully Deleted Hot Deal.",
					showCancelButton: false,
					customClass: {
						confirmButton: "btn btn-primary",
						cancelButton: "btn btn-outline-danger ms-1",
					},
					background: "#020202",
				});
				setLoading(false);
				getDealsData();
			},
			(failure) => {
				setLoading(false);
			}
		);
	};

	const handleReset = () => {
		setName("");
		setAvatar("");
		setProduct_ids([]);
		setdealId("");
		setType("");
		setStock("");
		setPicker("");
		setDescription(EditorState.createEmpty());
		setRegularPrice("");
		setDealPrice("");
	};

	return (
		<>
			{showCreate ? (
				<>
					<Modal
						isOpen={showCreate}
						backdrop={false}
						toggle={() => {
							handleReset();
							setShowCreate(!showCreate);
						}}
						className='modal-dialog-centered modal-lg'>
						<ModalHeader
							className='bg-transparent'
							toggle={() => {
								handleReset();
								setShowCreate(!showCreate);
							}}></ModalHeader>
						<ModalBody className='px-sm-5 pt-50 pb-5'>
							<div className='text-center mb-2'>
								<h1 className='mb-1'>Add New Deal</h1>
							</div>
							<Form onSubmit={handleSubmit(onSubmit)}>
								<Row className='gy-1 pt-75'>
									<Col
										md={6}
										xs={12}>
										<Label
											className='form-label'
											for='firstName'>
											Name
										</Label>
										<Input
											defaultValue=''
											control={control}
											id='firstName'
											name='name'
											placeholder='Deal name'
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</Col>
									<Col
										md={6}
										xs={12}>
										<Label
											className='form-label'
											for='range-picker'>
											Date Picker
										</Label>
										<Flatpickr
											placeholder='Add Deal Start Date and End Date'
											style={{ fontSize: "11px" }}
											value={picker}
											id='range-picker'
											className='form-control'
											onChange={(date) => setPicker(date)}
											options={{
												mode: "range",
											}}
										/>
									</Col>
									<Col
										md={6}
										xs={12}>
										<Label
											className='form-label'
											for='firstName'>
											Regular Price
										</Label>
										<Input
											defaultValue=''
											control={control}
											id='regular'
											name='regular'
											placeholder='Amount'
											type='number'
											value={regularPrice}
											onChange={(e) => setRegularPrice(e.target.value)}
										/>
									</Col>
									<Col
										md={6}
										xs={12}>
										<Label
											className='form-label'
											for='range-picker'>
											Deal Price
										</Label>
										<Input
											defaultValue=''
											control={control}
											id='Deal_price'
											name='Deal_price'
											type='number'
											placeholder='Amount'
											value={dealPrice}
											onChange={(e) => setDealPrice(e.target.value)}
										/>
									</Col>
									<Col
										md={6}
										xs={12}>
										<Label
											className='form-label'
											for='firstName'>
											Stock
										</Label>
										<Input
											defaultValue=''
											control={control}
											id='regular'
											name='regular'
											type='number'
											placeholder='Add Stock'
											value={stock}
											onChange={(e) => setStock(e.target.value)}
										/>
									</Col>
									<Col
										xs={12}
										style={{ marginTop: "20px" }}>
										<Label
											className='form-label'
											for='range-picker'>
											Add Products
										</Label>
										<div>
											<Select
												style={{ zIndex: 10000 }}
												id='label'
												name='label'
												isClearable={false}
												className='react-select'
												classNamePrefix='select'
												options={productsData}
												theme={selectThemeColors}
												isMulti={true}
												value={product_ids.length ? [...product_ids] : null}
												onChange={(data) => {
													if (product_ids.length >= 2 && data.length >= 2) {
														Swal.fire({
															icon: "error",
															title: "Error",
															text: "Product limit Exceeded",
															confirmButtonColor: "#ff3600",
															padding: "50px",
															customClass: {
																confirmButton: "btn btn-primary",
																cancelButton: "btn btn-outline-danger ms-1",
															},
															background: "#020202",
															buttonsStyling: false,
														});
														return;
													}
													setProduct_ids([...data]);
												}}
											/>
										</div>
									</Col>
									<Col xs={12}>
										<Label
											className='form-label'
											for='firstName'>
											Description
										</Label>
										<TextEditor
											content={description}
											setContent={setDescription}
										/>
									</Col>
									<Col
										md={6}
										xs={12}>
										<div className='me-25'>
											<img
												className='rounded me-50'
												src={
													avatar?.includes("https") || avatar?.includes("data")
														? avatar
														: `${url}${avatar}`
												}
												alt='Generic placeholder image'
												height='100%'
												width='100%'
											/>
										</div>
									</Col>

									<div style={{ marginTop: "10px" }}>
										<Button
											tag={Label}
											className='mb-75 me-75'
											size='sm'
											color='primary'>
											Upload
											<Input
												type='file'
												onChange={onChange}
												hidden
												accept='image/*'
											/>
										</Button>
										<Button
											className='mb-75'
											color='secondary'
											size='sm'
											outline
											onClick={handleImgReset}>
											Reset
										</Button>
										<p className='mb-0'>
											Allowed JPG or PNG. Max size of 800kB
										</p>
									</div>
									<Col
										xs={12}
										className='text-center mt-2 pt-50'>
										<LoadingButton
											type='create'
											color='primary'
											text='Submit'
											// block={true}
											loading={loading}
											style={{ width: "100px" }}
										/>
										{"    "}
										<Button
											type='reset'
											color='secondary'
											outline
											onClick={() => {
												handleReset();
												setShowCreate(false);
											}}>
											Discard
										</Button>
									</Col>
								</Row>
							</Form>
						</ModalBody>
					</Modal>
				</>
			) : null}
			<Card>
				<CardBody>
					{/* <SearchFilters
            filter={filter}
            setFilter={setFilter}
            setSearchVal={setSearchVal}
            searchVal={searchVal}
            getData={getDealsData}
            data2={data2}
            handleFilter={handleFilter}
            setPicker={setPicker}
            picker={picker}
            setData={setData}
            tempTotal={tempTotal}
            setTotalPages={setTotalPages}
          /> */}
					{!loading && data ? (
						<>
							<Table
								striped
								responsive
								className='border-none'>
								<thead>
									<tr style={{ fontSize: "11px" }}>
										<th>SN</th>
										<th>Name</th>
										<th>Start Date</th>
										<th>End Date</th>
										<th>Status</th>
										<th>Created Date</th>
										<th>Details</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{data?.map((deal, index) => {
										return (
											<tr key={deal.id}>
												<td>{index + 1}</td>

												<td>{deal.name}</td>
												<td>{moment(deal.start_date).format("YYYY-MM-DD")}</td>
												<td>{moment(deal.end_date).format("YYYY-MM-DD")}</td>
												<td>
													{deal.enabled ? (
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
															In Review
														</Badge>
													)}
												</td>
												<td>{moment(deal.dt).format("YYYY-MM-DD")}</td>

												<td>
													{" "}
													<Button
														color='primary'
														size='sm'
														onClick={() => handleDetails(deal)}>
														Edit
													</Button>
												</td>
												<td onClick={() => handleDelete(deal)}>
													<Trash
														style={{ marginLeft: "20px", cursor: "pointer" }}
														size={20}
													/>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
						</>
					) : null}
					{!loading && !data?.length && <DataNotFound />}
					<Loader loading={loading} />
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

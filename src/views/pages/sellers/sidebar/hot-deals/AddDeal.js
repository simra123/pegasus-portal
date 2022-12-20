import { useState, useEffect, forwardRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { X } from "react-feather";
import {
	Loader,
	Pagination,
	DatePicker,
	ToastAlertError,
	DataNotFound,
	LoadingButton,
	TextEditor,
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
	CardHeader,
	Form,
} from "reactstrap";
import Select from "react-select";

import Avatar from "@components/avatar";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CoreHttpHandler from "../../../../../http/services/CoreHttpHandler";
import { MdAddCircle } from "react-icons/md";
import { useForm } from "react-hook-form";
import { selectThemeColors } from "@utils";
import Swal from "sweetalert2";
import Flatpickr from "react-flatpickr";
import ContentUploadHandler from "../../../../../http/services/ContentUploadHandler";
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import { EditorState, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import { defaultProductImage, url } from "../../../../../image-service-url";
import { Trash } from "react-feather";

const CreateProduct = (props) => {
	const { storeData, productsData, showCreate, setShowCreate } = props;
	const [data, setData] = useState([]);
	const [tempTotal, setTempTotal] = useState(0);
	const [data2, setData2] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [picker, setPicker] = useState(new Date());
	const [filter, setFilter] = useState("all");
	const [searchVal, setSearchVal] = useState("");
	const [product_ids, setProduct_ids] = useState([]);
	const [avatar, setAvatar] = useState();
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

	let filename = "";

	const [currentParams, setCurrentParams] = useState({
		limit: 10,
		page: 0,
	});

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
	return (
		<>
			{loading ? (
				<Spinner loading={loading} />
			) : (
				<div className='blog-edit-wrapper'>
					<Row>
						<Col sm='12'>
							<Card>
								<CardHeader style={{ marginLeft: "auto" }}>
									<X
										size='12'
										color='white'
										className='cursor-pointer'
										onClick={() => {
											handleReset();
											setShowCreate(!showCreate);
										}}
									/>
								</CardHeader>
								<CardBody>
									<div className='mb-2'>
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
															avatar?.includes("https") ||
															avatar?.includes("data")
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
													onClick={onSubmit}
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
								</CardBody>
							</Card>
						</Col>
					</Row>
				</div>
			)}
		</>
	);
};

export default CreateProduct;

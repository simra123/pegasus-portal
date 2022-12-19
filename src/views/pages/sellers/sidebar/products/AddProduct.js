// ** React Imports
import { useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";
import Select from "react-select";
import { stateToHTML } from "draft-js-export-html";
import { Link, useLocation } from "react-router-dom";
import { EditorState, ContentState } from "draft-js";
import {
	ToastAlertError,
	ToastAlertSuccess,
	TextEditor,
	LoadingButton,
} from "../../../reuseable";
// ** Custom Components

import { X } from "react-feather";
import ContentUploadHandler from "../../../../../http/services/ContentUploadHandler";
import _ from "lodash";
import { useHistory } from "react-router-dom";

import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
	Row,
	Col,
	Card,
	CardBody,
	CardText,
	Form,
	Label,
	Input,
	CardHeader,
	Button,
} from "reactstrap";
import CoreHttpHandler from "../../../../../http/services/CoreHttpHandler";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";
import FileUploaderMultiple from "../../../seller-portal/blog/edit/FileUploaderMultiple";
import RepeatingForm from "../../../seller-portal/blog/edit/RepeatingForm";
import Spinner from "../../../../../@core/components/spinner/Fallback-spinner";
import Swal from "sweetalert2";

const CreateProduct = ({
	storeId,
	setShowCreate,
	getProducts,
	type,
	sellerData,
	productItem,
	setProductItem,
	setType,
}) => {
	const [category, setCategory] = useState({
		value: productItem?.product_category_id,
		label: productItem?.product_category,
	});

	const { state } = useLocation();
	let history = useHistory();

	// ** States
	const [files, setFiles] = useState([]);
	const [content, setContent] = useState(
		productItem == undefined || productItem.description == null
			? EditorState.createEmpty()
			: EditorState.createWithContent(
					ContentState.createFromText(productItem?.description)
			  )
	);
	const [imgPath, setImgPath] = useState("banner.jpg");
	const [loading, setLoading] = useState(false);
	const [featuredImg, setFeaturedImg] = useState(productItem?.featured_image);
	const [attachments, setAttachments] =
		productItem.length != 0
			? useState([...productItem?.attachment])
			: useState([]);
	const [indexs, setIndexs] = useState([]);
	const [showImage, setShowImage] = useState(productItem?.featured_image);
	const [showAttach, setShowAttach] =
		productItem.length != 0
			? useState([...productItem?.attachment])
			: useState([]);
	const [currency, setCurrency] = useState(productItem?.currency);
	const [categoriesData, setCategoriesData] = useState([]);
	const [title, setTitle] = useState(productItem?.name);
	const [price, setPrice] = useState(productItem?.price);
	const [sale_price, setSalePrice] = useState(productItem?.sale_price);
	const [stock, setStock] = useState(productItem?.stock);
	const [size, setSize] = useState(productItem?.size);

	useEffect(() => {
		getCategories();
	}, []);

	const getCategories = () => {
		CoreHttpHandler.request(
			"productCategories",
			"fetch",
			{},
			(response) => {
				let cate = [];
				response.data.data.data.data.map((r) => {
					cate.push({
						value: r.id,
						label: r.name,
					});
				});

				setCategoriesData(cate);
			},
			(err) => {}
		);
	};

	const onChange = (e) => {
		const reader = new FileReader(),
			files = e.target.files;
		setImgPath(files[0].name);
		reader.onload = function () {
			setShowImage(reader.result);
		};
		setFeaturedImg(e.target.files[0]);
		reader.readAsDataURL(files[0]);
	};

	const onSubmit = async () => {
		setLoading(true);
		let attachment = [];
		if (featuredImg == "") {
			featuredImg = `${url}${defaultProductImage}`;
		}
		let data = {
			name: title,
			sale_price,
			price,
			description: paraToHtml,
			stock,
			size,
			product_category_id: category.value,
			currency: currency,
			user_id: sellerData,
			product_id: productItem?.id,
		};

		let prevAttachment = attachments.filter((a) => a.url != undefined);
		let newAttachment = attachments.filter((a) => a.url == undefined);

		if (newAttachment.length != 0) {
			await newAttachment.map((a, i) => {
				setTimeout(() => {
					const _data = new FormData();

					_data.append("file", a, `${new Date().getTime()}_${a.name}`);
					ContentUploadHandler.request(
						"content",
						"upload",
						{
							params: _data,
						},
						(response) => {
							console.log(response, "pddllslss");
							attachment.push({
								image: response.data.data.file,
								type: "0",
							});
							if (i == newAttachment.length - 1) {
								if (prevAttachment.length != 0) {
									prevAttachment.map((p) => {
										attachment.push({ image: p.url, type: "0" });
									});
								}
								if (typeof featuredImg === "object" && featuredImg !== null) {
									const _data = new FormData();
									_data.append(
										"file",
										featuredImg,
										`${new Date().getTime()}_${featuredImg.name}`
									);
									ContentUploadHandler.request(
										"content",
										"upload",
										{
											params: _data,
										},
										(response) => {
											attachment.unshift({
												image: response.data.data.file,
												type: "0",
											});
											data["attachment"] = attachment;
											sendApi(data);
										},
										(err) => {}
									);
								} else {
									attachment.unshift({ image: featuredImg, type: "0" });
									data["attachment"] = attachment;
									sendApi(data);
								}
							}
						},
						(err) => {
							console.log(err);
						}
					);
				}, i * 1000);
			});
		} else {
			if (prevAttachment.length != 0) {
				prevAttachment.map((p) => {
					console.log(p, "pppos");
					attachment.push({ image: p.url, type: "0" });
				});
			}
			if (typeof featuredImg === "object" && featuredImg !== null) {
				const _data = new FormData();
				_data.append(
					"file",
					featuredImg,
					`${new Date().getTime()}_${featuredImg.name}`
				);
				ContentUploadHandler.request(
					"content",
					"upload",
					{
						params: _data,
					},
					(response) => {
						attachment.unshift({
							image: response.data.data.file,
							type: "0",
						});
						data["attachment"] = attachment;
						sendApi(data);
					},
					(err) => {}
				);
			} else {
				attachment.unshift({ image: featuredImg, type: "0" });
				data["attachment"] = attachment;
				sendApi(data);
			}
		}
	};

	const sendApi = (data) => {
		if (type == "edit") {
			CoreHttpHandler.request(
				"products",
				"update",
				data,
				(response) => {
					setLoading(false);
					document.body.style.opacity = 1;
					Swal.fire({
						icon: "success",
						title: "Success",
						text: "Hot Deals Successfully Updated",
						showCancelButton: false,
						customClass: {
							confirmButton: "btn btn-primary",
							cancelButton: "btn btn-outline-danger ms-1",
						},
						background: "#020202",
					});
					getProducts();
					setShowCreate(false);
					setProductItem([]);
					handleClearValues();
					setType("create");
					// history;
				},
				(error) => {}
			);
		} else {
			CoreHttpHandler.request(
				"products",
				"createProduct",
				data,
				(response) => {
					setLoading(false);
					document.body.style.opacity = 1;
					Swal.fire({
						icon: "success",
						title: "Success",
						text: "Hot Deals Successfully Created",
						showCancelButton: false,
						customClass: {
							confirmButton: "btn btn-primary",
							cancelButton: "btn btn-outline-danger ms-1",
						},
						background: "#020202",
					});
					getProducts();
					setProductItem([]);
					setShowCreate(false);
					handleClearValues();
					setType("create");
				},
				(error) => {}
			);
		}
	};

	const handleClearValues = () => {
		setAttachments([]);
		setCategory({});
		setContent(EditorState.createEmpty());
		setCurrency("");
		setFeaturedImg([]);
		setSalePrice("");
		setPrice("");
		setImgPath("");
		setSize("");
		setStock("");
		setShowImage("");
		setShowAttach([]);
		setTitle("");
	};
	const paraToHtml = content.getCurrentContent().getPlainText();

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
											setShowCreate(false);
											setProductItem([]);
											handleClearValues();
											setType("create");
										}}
									/>
								</CardHeader>
								<CardBody>
									<div className='d-flex'>
										<div>
											<h2>
												{type == "create" ? "Add Product" : "Edit Product"}
											</h2>
										</div>
										<div>{/* <CardText>{userData.dt}</CardText> */}</div>
									</div>
									<Form className='mt-2'>
										<Row>
											<Col
												md='6'
												className='mb-2'>
												<Label
													className='form-label'
													for='blog-edit-title'>
													Title
												</Label>
												<Input
													id='blog-edit-title'
													value={title}
													onChange={(e) => setTitle(e.target.value)}
												/>
											</Col>
											<Col
												md='6'
												className='mb-2'>
												<Label
													className='form-label'
													for='blog-edit-category'>
													Category
												</Label>
												<Select
													id='blog-edit-category'
													isClearable={false}
													theme={selectThemeColors}
													value={category}
													name='colors'
													options={categoriesData}
													className='react-select'
													classNamePrefix='select'
													onChange={(data) => setCategory(data)}
												/>
											</Col>
											<Col
												md='6'
												className='mb-2'>
												<Label
													className='form-label'
													for='blog-edit-slug'>
													Regular Price
												</Label>
												<Input
													id='blog-edit-slug'
													value={price}
													type='number'
													onChange={(e) => setPrice(e.target.value)}
												/>
											</Col>
											<Col
												md='6'
												className='mb-2'>
												<Label
													className='form-label'
													for='blog-edit-slug'>
													Sale Price
												</Label>
												<Input
													id='blog-edit-slug'
													value={sale_price}
													onChange={(e) => setSalePrice(e.target.value)}
												/>
											</Col>
											<Col
												md='6'
												className='mb-2'>
												<Label
													className='form-label'
													for='blog-edit-slug'>
													Stock
												</Label>
												<Input
													id='blog-edit-slug'
													value={stock}
													onChange={(e) => setStock(e.target.value)}
												/>
											</Col>
											<Col
												md='6'
												className='mb-2'>
												<Label
													className='form-label'
													for='blog-edit-slug'>
													Currency
												</Label>
												<Input
													id='blog-edit-slug'
													value={currency}
													onChange={(e) => setCurrency(e.target.value)}
												/>
											</Col>
											<Col
												md='6'
												className='mb-2'>
												<Label
													className='form-label'
													for='blog-edit-slug'>
													Product Size
												</Label>
												<Input
													id='blog-edit-slug'
													value={size}
													onChange={(e) => setSize(e.target.value)}
												/>
											</Col>
											<Col
												sm='12'
												className='mb-2'>
												<Label className='form-label'>Description</Label>
												<TextEditor
													content={content}
													setContent={setContent}
												/>
											</Col>

											<Col>
												<Label className='form-label'>Product Images</Label>

												<RepeatingForm
													onChange={onChange}
													featuredImg={showImage}
													imgPath={imgPath}
												/>
												<FileUploaderMultiple
													setAttachments={setAttachments}
													showAttach={showAttach}
													setShowAttach={setShowAttach}
												/>
											</Col>
											{/* <Col className="mt-50"> </Col> */}
										</Row>
										<div style={{ float: "right" }}>
											<Button
												color='primary'
												className='me-1'
												onClick={onSubmit}>
												{type == "create" ? "Create" : "Update"}
											</Button>

											<Button
												color='secondary'
												outline
												onClick={() => {
													setShowCreate(false);
													setProductItem([]);
													handleClearValues();
													setType("create");
												}}>
												Cancel
											</Button>
										</div>
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

// ** React Imports
import { useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";
import Select from "react-select";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
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
import RepeatingForm from "./RepeatingForm";

const CreateProduct = ({ storeId, setShowCreate, getProducts }) => {
	const [productItems, setProductItems] = useState({
		name: "",
		currency: "usd",
		price: null,
		stock: null,
		category: "2",
		type: "featured",
		size: "",
	});

	// ** States
	const [files, setFiles] = useState([]);
	const [content, setContent] = useState(EditorState.createEmpty());
	const [imgPath, setImgPath] = useState([]);
	const [loading, setLoading] = useState(false);
	const [featuredImg, setFeaturedImg] = useState([]);
	const [attachments, setAttachments] = useState([]);
	const [indexs, setIndexs] = useState([]);
	const paraToHtml = stateToHTML(content.getCurrentContent());

	const onChange = (e, i) => {
		let arrUpload = [...files];

		if (arrUpload[i] != undefined) {
			arrUpload[i] = e.target.files[0];
			let arr = [];
			const _data = new FormData();
			_data.append(
				"file",
				e.target.files[0],
				`${new Date().getTime()}_${e.target.files[0].name}`
			);
			ContentUploadHandler.request(
				"content",
				"upload",
				{
					params: _data,
				},
				(response) => {
					let _arr = [...attachments];
					_arr[i]["image"] = response.data.data.file;
					_arr[i]["type"] = "0";
					setAttachments([..._arr]);
				},
				(err) => {
					console.log(err);
				}
			);
		} else {
			let arr = [];

			const _data = new FormData();
			_data.append(
				"file",
				e.target.files[0],
				`${new Date().getTime()}_${e.target.files[0].name}`
			);
			ContentUploadHandler.request(
				"content",
				"upload",
				{
					params: _data,
				},
				(response) => {
					arr.push({ image: response.data.data.file, type: "0" });
					setAttachments([...attachments, ...arr]);
				},
				(err) => {
					console.log(err);
				}
			);
			arrUpload.push(e.target.files[0]);
		}
		setFiles(arrUpload);
		const reader = new FileReader(),
			file = e.target.files;

		if (arrUpload[i] != undefined) {
			arrUpload[i] = e.target.files[0];
		} else {
			arrUpload.push(e.target.files[0]);
		}

		const pathArr = [...imgPath];
		pathArr.push(e.target.files[0].name);

		setImgPath(pathArr);
		reader.onload = function () {
			let arr = [];
			arr = [...featuredImg];
			if (arr[i] != undefined) {
				arr[i] = reader.result;
			} else {
				arr.push(reader.result);
			}
			setFeaturedImg(arr);
		};
		reader.readAsDataURL(file[0]);
	};
	const handleSubmit = () => {
		setLoading(true);

		const params = {
			name: productItems.name,
			product_category_id: productItems.category,
			storeId: storeId,
			price: productItems.price,
			currency: productItems.currency,
			type: productItems.type,
			attachment: attachments,
			description: paraToHtml,
			size: productItems.size,
		};
		if (attachments?.length) {
			CoreHttpHandler.request(
				"products",
				"createProduct",
				params,
				(res) => {
					ToastAlertSuccess("Product Created Successfully");
					setShowCreate(false);
					getProducts();
					setLoading(false);
				},
				(err) => {
					if (err?.response?.data?.message)
						ToastAlertError(err.response.data.message);
					else ToastAlertError("Something went wrong");
					setLoading(false);
					console.log(err, "error");
				}
			);
		} else {
			ToastAlertError("Please add Featured Image");
		}
	};
	return (
		<div className='blog-edit-wrapper'>
			<Row>
				<Col sm='12'>
					<Card>
						<CardHeader style={{ marginLeft: "auto" }}>
							<X
								size='12'
								color='white'
								className='cursor-pointer'
								onClick={() => setShowCreate(false)}
							/>
						</CardHeader>
						<CardBody>
							<div className='d-flex'>
								<div>
									<h2>Add Product</h2>
								</div>
								<div>{/* <CardText>{userData.dt}</CardText> */}</div>
							</div>
							<Form
								className='mt-2'
								onSubmit={(e) => e.preventDefault()}>
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
											value={productItems.name}
											onChange={(e) =>
												setProductItems({
													...productItems,
													name: e.target.value,
												})
											}
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
										<Input
											type='select'
											id='blog-edit-status'
											value={productItems.category}
											onChange={(e) =>
												setProductItems({
													...productItems,
													category: e.target.value,
												})
											}>
											<option value='2'> Vipe </option>
											<option value='3'> Wine </option>
										</Input>
									</Col>
									<Col
										md='6'
										className='mb-2'>
										<Label
											className='form-label'
											for='blog-edit-slug'>
											Price
										</Label>
										<Input
											id='blog-edit-slug'
											value={productItems.price}
											onChange={(e) =>
												setProductItems({
													...productItems,
													price: e.target.value,
												})
											}
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
											value={productItems.stock}
											onChange={(e) =>
												setProductItems({
													...productItems,
													stock: e.target.value,
												})
											}
										/>
									</Col>
									<Col
										md='6'
										className='mb-2'>
										<Label
											className='form-label'
											for='blog-edit-status'>
											Currency
										</Label>
										<Input
											type='select'
											id='blog-edit-status'
											value={productItems.currency}
											onChange={(e) =>
												setProductItems({
													...productItems,
													currency: e.target.value,
												})
											}>
											<option value='usd'>USD($)</option>
											<option value='pound'>POUND(£)</option>
											{/* <option value='Draft'>Draft</option> */}
										</Input>
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
											value={productItems.size}
											onChange={(e) =>
												setProductItems({
													...productItems,
													size: e.target.value,
												})
											}
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
										<Label className='form-label'>Product Imgaes</Label>

										<RepeatingForm
											onChange={onChange}
											featuredImg={featuredImg}
											imgPath={imgPath}
											setFiles={setFiles}
											files={files}
										/>
									</Col>
									{/* <Col className="mt-50"> </Col> */}
								</Row>
								<div style={{ float: "right" }}>
									<LoadingButton
										text={"Create"}
										className='me-1'
										loading={loading}
										onClick={() => handleSubmit()}
									/>

									<Button
										color='secondary'
										outline
										onClick={() => setShowCreate(false)}>
										Cancel
									</Button>
								</div>
							</Form>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default CreateProduct;

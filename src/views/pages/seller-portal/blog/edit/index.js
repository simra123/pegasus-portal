// ** React Imports
import { useState, useEffect } from "react";

// ** Third Party Components
import axios from "axios";
import Select from "react-select";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import { EditorState, ContentState } from "draft-js";

// ** Custom Components
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";

// ** Utils
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
	Button,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";
import RepeatingForm from "./RepeatingForm";

const BlogEdit = () => {
	const initialContent = `
  <p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p>
  <p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>
  `;

	const contentBlock = htmlToDraft(initialContent);
	const contentState = ContentState.createFromBlockArray(
		contentBlock.contentBlocks
	);
	const editorState = EditorState.createWithContent(contentState);

	// ** States
	const [data, setData] = useState(null),
		[title, setTitle] = useState(""),
		[slug, setSlug] = useState(""),
		[status, setStatus] = useState(""),
		[content, setContent] = useState(EditorState.createEmpty()),
		[blogCategories, setBlogCategories] = useState([]),
		[featuredImg, setFeaturedImg] = useState([]),
		[imgPath, setImgPath] = useState("banner.jpg");

	let category = [
		{
			value: "vape",
			label: "Vape",
		},
	];

	useEffect(() => {
		axios.get("/blog/list/data/edit").then((res) => {
			setData(res.data);
			setTitle(res.data.blogTitle);
			setSlug(res.data.slug);
			setBlogCategories(category);
			setFeaturedImg([
				"https://images.unsplash.com/photo-1545095088-26a59e3f2717?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
			]);
			setStatus(res.data.status);
		});
	}, []);

	const categories = [
		{
			value: "E-Cigars",
			label: "E-Cigars",
		},
		{
			value: "vape",
			label: "Vape",
		},
	];

	const onChange = (e) => {
		const reader = new FileReader(),
			files = e.target.files;
		setImgPath(files[0].name);
		reader.onload = function () {
			let arr = [];
			arr = [...featuredImg];
			arr.push(reader.result);
			setFeaturedImg(arr);
		};
		reader.readAsDataURL(files[0]);
	};
	const paraToHtml = stateToHTML(content.getCurrentContent());
	const userData = JSON.parse(localStorage.getItem("user_data"));
	return (
		<div className='blog-edit-wrapper'>
			{data !== null ? (
				<Row>
					<Col sm='12'>
						<Card>
							<CardBody>
								<div className='d-flex'>
									<div>
										<h2>Edit Product</h2>
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
												value={blogCategories}
												name='colors'
												options={categories}
												className='react-select'
												classNamePrefix='select'
												onChange={(data) => setBlogCategories(data)}
											/>
										</Col>
										<Col
											md='6'
											className='mb-2'>
											<Label
												className='form-label'
												for='blog-edit-slug'>
												Amount
											</Label>
											<Input
												id='blog-edit-slug'
												value={slug}
												onChange={(e) => setSlug(e.target.value)}
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
												value={status}
												onChange={(e) => setStatus(e.target.value)}>
												<option value='USD'>USD($)</option>
												<option value='POUND'>POUND(£)</option>
												{/* <option value='Draft'>Draft</option> */}
											</Input>
										</Col>
										<Col
											sm='12'
											className='mb-2'>
											<Label className='form-label'>Content</Label>
											<Editor
												editorState={content}
												onEditorStateChange={(data) => {
													setContent(data);
												}}
											/>
										</Col>

										<Col>
											<RepeatingForm
												onChange={onChange}
												featuredImg={featuredImg}
												imgPath={imgPath}
											/>
										</Col>
										{/* <Col className="mt-50">
                      
                    </Col> */}
									</Row>
									<div style={{ float: "right" }}>
										<Button
											color='primary'
											className='me-1'>
											Save Changes
										</Button>
										<Button
											color='secondary'
											outline>
											Cancel
										</Button>
									</div>
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			) : null}
		</div>
	);
};

export default BlogEdit;

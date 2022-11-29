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
  Modal,
  ModalBody,
} from "reactstrap";
import Spinner from "../../../../../@core/components/spinner/Fallback-spinner";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";
import RepeatingForm from "./RepeatingForm";
import { Link, useLocation } from "react-router-dom";
import CoreHttpHandler from "../../../../../http/services/CoreHttpHandler";
import FileUploaderMultiple from "./FileUploaderMultiple";
import ContentUploadHandler from "../../../../../http/services/ContentUploadHandler";
import { defaultProductImage, url } from "../../../../../image-service-url";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";


const BlogEdit = (props) => {
  let history = useHistory();
	const initialContent = `
  <p>Cupcake ipsum dolor sit. Amet dessert donut candy chocolate bar cotton dessert candy chocolate. Candy muffin danish. Macaroon brownie jelly beans marzipan cheesecake oat cake. Carrot cake macaroon chocolate cake. Jelly brownie jelly. Marzipan pie sweet roll.</p>
  <p>Liquorice dragée cake chupa chups pie cotton candy jujubes bear claw sesame snaps. Fruitcake chupa chups chocolate bonbon lemon drops croissant caramels lemon drops. Candy jelly cake marshmallow jelly beans dragée macaroon. Gummies sugar plum fruitcake. Candy canes candy cupcake caramels cotton candy jujubes fruitcake.</p>
  `;
		const { state } = useLocation();
		console.log(state)
	const contentBlock = htmlToDraft(initialContent);
	const contentState = ContentState.createFromBlockArray(
		contentBlock.contentBlocks
	);
	const editorState = EditorState.createWithContent(contentState);

	// ** States
    console.log(state,'ssoooss')
	const [data, setData] = useState(null),
    [title, setTitle] = useState(state?.name),
    [price, setPrice] = useState(state?.price),
    [sale_price, setSalePrice] = useState(state?.sale_price),
    [status, setStatus] = useState(state?.enabled),
    [content, setContent] = useState(
      state == undefined || state.description == null ? EditorState.createEmpty() :
      EditorState.createWithContent(
        ContentState.createFromText(state?.description)
      )
    ),
    [category, setCategory] = useState({
      value: state?.product_category_id,
      label: state?.product_category,
    }),
    [featuredImg, setFeaturedImg] = useState(state?.featured_image),
    [imgPath, setImgPath] = useState("banner.jpg"),
    [categoriesData, setCategoriesData] = useState([]),
    [stock, setStock] = useState(state?.stock),
    [size, setSize] = useState(state?.size),
    [attachments, setAttachments] = useState([...state?.attachment]),
    [currency, setCurrency] = useState(state?.currency),
    [showImage, setShowImage] = useState(state?.featured_image),
    [showAttach, setShowAttach] = useState([...state?.attachment]);

	const [loading, setLoading] = useState(false);


	useEffect(()=>{
		getCategories()
	},[])
  useEffect(()=>{
    if(state?.attachment){
      setAttachments([...state.attachment])
    }
  },[state.attachment])

	const getCategories = () =>{
		CoreHttpHandler.request(
			"productCategories",
			"fetch",
			{},
			(response) =>{
				
				let cate = []
				response.data.data.data.data.map(r =>{
					 cate.push({
							value: r.id,
							label: r.name
						})
						
				})
				
				setCategoriesData(cate)
			},
			(err)=>{}
		)
	}
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

  const onSubmit = async() =>{
    setLoading(true)
    let attachment = [];
    if (featuredImg == "") {
      featuredImg = `${url}${defaultProductImage}`;
    }
    let data ={
      name: title,
      sale_price,
      price,
      description: paraToHtml,
      stock,
      size,
      product_category_id: category.value,
      currency: currency,
      product_id: state.id
    }

    let prevAttachment = attachments.filter(a=> a.url != undefined)
    let newAttachment = attachments.filter((a) => a.url == undefined);

    if(newAttachment.length != 0){
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
                    console.log(prevAttachment, "aasass");
                    if (prevAttachment.length != 0) {
                      prevAttachment.map((p) => {
                        console.log(p, "pppos");
                        attachment.push({ image: p.url, type: "0" });
                      });
                    }
                    if (
                      typeof featuredImg === "object" &&
                      featuredImg !== null
                    ) {
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
    }else{
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
    


  }
 
  const sendApi = (data) =>{
    console.log(data,'sspspsp')
    if(state.type == "Edit"){
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
                text: "Successfully Created Hot Deals",
                showCancelButton: false,
                customClass: {
                  confirmButton: "btn btn-primary",
                  cancelButton: "btn btn-outline-danger ms-1",
                },
                background: "#020202",
              });
              history.goBack();
              getDealsData();
              setShowCreate(false);
              history
            },
            (error) => {}
          );
    }else{
       CoreHttpHandler.request(
         "products",
         "createProduct",
         data,
         (response) => {
           setLoading(false);
           console.log('gmgmmg')
           document.body.style.opacity = 1;
           Swal.fire({
             icon: "success",
             title: "Success",
             text: "Successfully Created Product",
             showCancelButton: false,
             customClass: {
               confirmButton: "btn btn-primary",
               cancelButton: "btn btn-outline-danger ms-1",
             },
             background: "#020202",
           });
           history.goBack();
           getDealsData();
           setShowCreate(false);
         },
         (error) => {}
       );
    }

  }

	const paraToHtml = 
    content.getCurrentContent().getPlainText()
	const userData = JSON.parse(localStorage.getItem("user_data"));
	return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="blog-edit-wrapper">
          {state !== null ? (
            <Row>
              <Col sm="12" style={{ position: "relative" }}>
                <Card>
                  <CardBody>
                    <div className="d-flex">
                      <div>
                        <h2>{state.type} Product</h2>
                      </div>
                      <div>{/* <CardText>{userData.dt}</CardText> */}</div>
                    </div>
                    <Form className="mt-2">
                      <Row>
                        <Col md="6" className="mb-2">
                          <Label className="form-label" for="blog-edit-title">
                            Name
                          </Label>
                          <Input
                            id="blog-edit-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </Col>
                        <Col md="6" className="mb-2">
                          <Label
                            className="form-label"
                            for="blog-edit-category"
                          >
                            Category
                          </Label>
                          <Select
                            id="blog-edit-category"
                            isClearable={false}
                            theme={selectThemeColors}
                            value={category}
                            name="colors"
                            options={categoriesData}
                            className="react-select"
                            classNamePrefix="select"
                            onChange={(data) => setCategory(data)}
                          />
                        </Col>
                        <Col md="6" className="mb-2">
                          <Label className="form-label" for="blog-edit-slug">
                            Regular Price
                          </Label>
                          <Input
                            id="blog-edit-slug"
                            value={price}
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </Col>
                        <Col md="6" className="mb-2">
                          <Label className="form-label" for="blog-edit-slug">
                            Sale Price
                          </Label>
                          <Input
                            id="blog-edit-slug"
                            type="number"
                            value={sale_price}
                            onChange={(e) => setSalePrice(e.target.value)}
                          />
                        </Col>
                        <Col md="6" className="mb-2">
                          <Label className="form-label" for="blog-edit-slug">
                            Size
                          </Label>
                          <Input
                            id="blog-edit-slug"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                          />
                        </Col>
                        <Col md="6" className="mb-2">
                          <Label className="form-label" for="blog-edit-slug">
                            Currency
                          </Label>
                          <Input
                            id="blog-edit-slug"
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                          />
                        </Col>
                        <Col md="6" className="mb-2">
                          <Label className="form-label" for="blog-edit-slug">
                            Stock
                          </Label>
                          <Input
                            id="blog-edit-slug"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                          />
                        </Col>
                        {/* <Col md="6" className="mb-2">
                      <Label className="form-label" for="blog-edit-status">
                        Currency
                      </Label>
                      <Input
                        type="select"
                        id="blog-edit-status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="USD">USD($)</option>
                        <option value="POUND">POUND(£)</option>
                       
                      </Input>
                    </Col> */}
                        <Col sm="12" className="mb-2">
                          <Label className="form-label">Content</Label>
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
                            featuredImg={showImage}
                            imgPath={imgPath}
                          />

                          <Col sm="12">
                            <FileUploaderMultiple
                              setAttachments={setAttachments}
                              showAttach={showAttach}
                              setShowAttach={setShowAttach}
                            />
                          </Col>

                          {/* <RepeatingForm
                        onChange={onChange}
                        featuredImg={featuredImg}
                        imgPath={imgPath}
                      /> */}
                        </Col>
                        {/* <Col className="mt-50">
                      
                    </Col> */}
                      </Row>
                      <div style={{ float: "right" }}>
                        <Button
                          color="primary"
                          className="me-1"
                          onClick={onSubmit}
                        >
                          Save Changes
                        </Button>
                        <Link to="/apps/products">
                          <Button color="secondary" outline>
                            Cancel
                          </Button>
                        </Link>
                      </div>
                    </Form>
                    <div style={{ positon: "absolute" }}></div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          ) : null}
        </div>
      )}
    </>
  );
};

export default BlogEdit;

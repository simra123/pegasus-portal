// ** React Imports
import { useState, Fragment } from "react";
import logo from "@src/assets/images/logo/logo.png";
import Editor from "../../../../components/Editor";

// ** Reactstrap Imports
import {
	Row,
	Col,
	Card,
	Form,
	CardBody,
	Button,
	Badge,
	Modal,
	Input,
	Label,
	ModalBody,
	ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";
import storeImage from "@src/assets/images/profile/user-uploads/store.jpg";
// ** Utils
import { selectThemeColors } from "@utils";
import { MapPin } from "react-feather";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import moment from "moment";
import CoreHttpHandler from "../../../../../http/services/CoreHttpHandler";
import ContentUploadHandler from "../../../../../http/services/ContentUploadHandler";

const roleColors = {
	editor: "light-info",
	admin: "light-danger",
	author: "light-warning",
	maintainer: "light-success",
	subscriber: "light-primary",
};

const statusColors = {
	approved: "light-success",
	pending: "light-warning",
	inactive: "light-secondary",
};

const statusOptions = [
	{ value: "active", label: "Active" },
	{ value: "inactive", label: "Inactive" },
	{ value: "suspended", label: "Suspended" },
];

const countryOptions = [
	{ value: "uk", label: "UK" },
	{ value: "usa", label: "USA" },
	{ value: "france", label: "France" },
	{ value: "russia", label: "Russia" },
	{ value: "canada", label: "Canada" },
];

const languageOptions = [
	{ value: "english", label: "English" },
	{ value: "spanish", label: "Spanish" },
	{ value: "french", label: "French" },
	{ value: "german", label: "German" },
	{ value: "dutch", label: "Dutch" },
];

const MySwal = withReactContent(Swal);

const UserInfoCard = (props) => {
	const { data, setData } = props;
	// ** State
	const [show, setShow] = useState(false);
	const [avatar, setAvatar] = useState("");
	const [bodyContentEnglish, setBodyContentEnglish] = useState(
		data?.description
	);

	// ** Hook
	const {
		reset,
		control,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: data?.name,
			image: data?.store_image,
			city: data?.store_city,
			type: data?.type,
			number: data?.store_number,
			description: data?.description,
			location: data?.location,
		},
	});

	const categoryOptions = [
		{ value: "vape", label: "Vape" },
		{ value: "e-cigs", label: "E-cigs" },
	];

	// ** render user img
	const renderUserImg = () => {
		return (
			<img
				height='240'
				width='240'
				alt='user-avatar'
				src={avatar == "" ? data?.store_image : avatar}
				className='img-fluid rounded mt-3 mb-2'
			/>
		);
	};

	const [type, setType] = useState("");
	const [number, setNumber] = useState("");
	const [fileData, setFileData] = useState("");
	const [url, setUrl] = useState("");
	const [name, setName] = useState("");

	const onChange = (e) => {
		let _name = e.target.files[0].name;

		if (!_name.includes(".png")) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "PNG images are allowed",
				confirmButtonColor: "#ff3600",
			});
			return;
		}
		const reader = new FileReader(),
			files = e.target.files;
		reader.onload = function () {
			setAvatar(reader.result);
		};
		reader.readAsDataURL(files[0]);
		_name = _name.replace(/\s/g, "");
		setName(_name);
		setFileData(e.target.files[0]);
	};

	const onSubmit = (datas) => {
		document.body.style.opacity = 0.4;
		const _data = new FormData();

		if (fileData != "") {
			_data.append("file", fileData, `${new Date().getTime()}_${name}`);
			ContentUploadHandler.request(
				"content",
				"upload",
				{
					params: _data,
				},
				(response) => {
					let img = response.data.data.file;
					CoreHttpHandler.request(
						"stores",
						"update_admin",
						{
							number: number == "" ? datas?.number : number,
							enable: true,
							name: datas?.name,
							image: `https://upload.its.com.pk/v1/fetch/file/${response.data.data.file}`,
							store_id: data?.store_id,
							city: datas?.city,
							type: type,
							description: bodyContentEnglish,
							location: datas?.location,
						},
						(response) => {
							let _params = {
								...data,
								store_number: number == "" ? datas?.number : number,
								enable: true,
								name: datas?.name,
								store_image: `https://upload.its.com.pk/v1/fetch/file/${img}`,
								store_id: data?.store_id,
								store_city: datas?.city,
								type: type,
								description: bodyContentEnglish,
								location: datas?.location,
							};
							setData(_params);
							document.body.style.opacity = 1;
							Swal.fire({
								icon: "success",
								title: "Success",
								text: "Successfully Updated Seller Details",
								confirmButtonColor: "green",
							});
						},
						(error) => {}
					);
				},
				(error) => {}
			);
		} else {
			CoreHttpHandler.request(
				"stores",
				"update_admin",
				{
					number: number == "" ? datas?.number : number,
					enable: true,
					name: datas?.name,
					image: datas?.image,
					store_id: data?.store_id,
					city: datas?.city,
					type: type,
					description: bodyContentEnglish,
					location: datas?.location,
				},
				(response) => {
					document.body.style.opacity = 1;
					let _params = {
						...data,
						store_number: number == "" ? datas?.number : number,
						enable: true,
						name: datas?.name,
						store_image: datas?.image,
						store_id: data?.store_id,
						store_city: datas?.city,
						type: type,
						description: bodyContentEnglish,
						location: datas?.location,
					};
					setData(_params);
					Swal.fire({
						icon: "success",
						title: "Success",
						text: "Successfully Updated Seller Details",
						confirmButtonColor: "green",
					});
				},
				(error) => {}
			);
		}
	};

	const handleImgReset = () => {
		setAvatar("");
		setFileData("");
	};

	return (
		<Fragment>
			<Card>
				<CardBody>
					<div className='user-avatar-section'>
						<div className='d-flex align-items-center flex-column'>
							{renderUserImg()}
							<div className='align-items-center text-center'>
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
								<p className='mb-0'>Allowed PNG. Max size of 1 MB</p>
							</div>
							<div
								className='d-flex flex-column align-items-center text-center'
								style={{ marginTop: "50px" }}>
								<div className='user-info'>
									<h4>{data?.name}</h4>
									<Badge
										color={roleColors["subscriber"]}
										className='text-capitalize'>
										Store
									</Badge>
								</div>
							</div>
						</div>
					</div>
					<Form
						className='mt-2 pt-50'
						onSubmit={handleSubmit(onSubmit)}>
						<Row>
							<Col
								sm='6'
								className='mb-1'
								style={{ marginTop: "20px" }}>
								<Label
									className='form-label'
									for='Store'>
									Store Name
								</Label>
								<Controller
									name='name'
									control={control}
									render={({ field }) => (
										<Input
											defaultValue={data?.name}
											id='name'
											name='names'
											placeholder='Store Name'
											{...field}
										/>
									)}
								/>
							</Col>

							{/* <Col sm="6" className="mb-1">
                <Label className="form-label" for="address">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={data?.store_address}
                />
              </Col> */}
							<Col
								sm='6'
								className='mb-1'
								style={{ marginTop: "20px" }}>
								<Label
									className='form-label'
									for='accountState'>
									Store Type
								</Label>

								<Select
									id='type'
									name='type'
									isClearable={false}
									className='react-select'
									classNamePrefix='select'
									options={categoryOptions}
									theme={selectThemeColors}
									onChange={(e) => setType(e.value)}
									defaultValue={
										data?.type == "vape"
											? categoryOptions[0]
											: categoryOptions[1]
									}
								/>
							</Col>
							<Col
								sm='6'
								className='mb-1'>
								<Label
									className='form-label'
									for='zipCode'>
									Store City
								</Label>
								<Controller
									name='city'
									control={control}
									render={({ field }) => (
										<Input
											id='StoreCity'
											name='StoreCity'
											defaultValue={data?.store_city}
											{...field}
										/>
									)}
								/>
							</Col>
							<Col
								sm='6'
								className='mb-1'>
								<Label
									className='form-label'
									for='number'>
									Store Number
								</Label>
								<Controller
									name='number'
									control={control}
									render={({ field }) => (
										<Input
											defaultValue={data?.store_number}
											{...field}
										/>
									)}
								/>
							</Col>
							<Col
								sm='6'
								className='mb-1'>
								<Label
									className='form-label'
									for='created'>
									Created Date
								</Label>
								<Input
									disabled={true}
									id='created'
									defaultValue={moment(data?.dt).format("DD-MM-YYYY HH:MM a")}
								/>
							</Col>
							<Col
								sm='6'
								className='mb-1'>
								<Label
									className='form-label'
									for='Location'>
									Location
								</Label>
								<div style={{ marginTop: "10px" }}>
									<a
										href={`https://www.google.com/maps/place/${data?.location}`}
										target='_blank'>
										<MapPin size='20' />
									</a>
								</div>
							</Col>
							<div style={{ marginLeft: "5px", marginRight: "5px" }}>
								<Editor
									editorValue={bodyContentEnglish}
									handleChange={(valuee) => setBodyContentEnglish(valuee)}
								/>
							</div>

							<Col
								className='mt-2'
								sm='12'>
								<Button
									type='submit'
									className='me-1'
									color='primary'>
									Save changes
								</Button>
								<Button
									color='secondary'
									outline>
									Discard
								</Button>
							</Col>
						</Row>
					</Form>

					{/* <div className='d-flex justify-content-around my-2 pt-75'>
						<div className='d-flex align-items-start me-2'>
							<Badge
								color='light-primary'
								className='rounded p-75'>
								<Check className='font-medium-2' />
							</Badge>
							<div className='ms-75'>
								<h4 className='mb-0'>58</h4>
								<small>Products</small>
							</div>
						</div>
						<div className='d-flex align-items-start'>
							<Badge
								color='light-primary'
								className='rounded p-75'>
								<Briefcase className='font-medium-2' />
							</Badge>
							<div className='ms-75'>
								<h4 className='mb-0'>4k</h4>
								<small>Reiews</small>
							</div>
						</div>
					</div>
					<h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
					<div className='info-container'>
						<ul className='list-unstyled'>
							<li className='mb-75'>
								<span className='fw-bolder me-1'>Username:</span>
								<span>john765</span>
							</li>
							<li className='mb-75'>
								<span className='fw-bolder me-1'>Billing Email:</span>
								<span>john09876543@email.com</span>
							</li>
							<li className='mb-75'>
								<span className='fw-bolder me-1'>Status:</span>
								<Badge
									className='text-capitalize'
									color={statusColors["approved"]}>
									Approved
								</Badge>
							</li>
							<li className='mb-75'>
								<span className='fw-bolder me-1'>Role:</span>
								<Badge
									color={roleColors["subscriber"]}
									className='text-capitalize'>
									Seller
								</Badge>
							</li>
							<li className='mb-75'>
								<span className='fw-bolder me-1'>Tax ID:</span>
								<span>Tax- 90$</span>
							</li>
							<li className='mb-75'>
								<span className='fw-bolder me-1'>Contact:</span>
								<span>12234567890</span>
							</li>
							<li className='mb-75'>
								<span className='fw-bolder me-1'>Language:</span>
								<span>English</span>
							</li>
							<li className='mb-75'>
								<span className='fw-bolder me-1'>Country:</span>
								<span>England</span>
							</li>
						</ul>
					</div> */}
					{/* <div className='d-flex justify-content-center pt-2'>
						<Button
							color='primary'
							onClick={() => setShow(true)}>
							Edit
						</Button>
						<Button
							className='ms-1'
							color='danger'
							outline
							onClick={handleSuspendedClick}>
							Suspended
						</Button>
					</div> */}
				</CardBody>
			</Card>
			{/* <Modal
				isOpen={show}
				toggle={() => setShow(!show)}
				className='modal-dialog-centered modal-lg'>
				<ModalHeader
					className='bg-transparent'
					toggle={() => setShow(!show)}></ModalHeader>
				<ModalBody className='px-sm-5 pt-50 pb-5'>
					<div className='text-center mb-2'>
						<h1 className='mb-1'>Edit User Information</h1>
						<p>Updating user details will receive a privacy audit.</p>
					</div>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Row className='gy-1 pt-75'>
							<Col
								md={6}
								xs={12}>
								<Label
									className='form-label'
									for='firstName'>
									First Name
								</Label>
								<Controller
									defaultValue=''
									control={control}
									id='firstName'
									name='firstName'
									render={({ field }) => (
										<Input
											{...field}
											id='firstName'
											placeholder='John'
											invalid={errors.firstName && true}
										/>
									)}
								/>
							</Col>
							<Col
								md={6}
								xs={12}>
								<Label
									className='form-label'
									for='lastName'>
									Last Name
								</Label>
								<Controller
									defaultValue=''
									control={control}
									id='lastName'
									name='lastName'
									render={({ field }) => (
										<Input
											{...field}
											id='lastName'
											placeholder='Doe'
											invalid={errors.lastName && true}
										/>
									)}
								/>
							</Col>
							<Col xs={12}>
								<Label
									className='form-label'
									for='username'>
									Username
								</Label>
								<Controller
									defaultValue=''
									control={control}
									id='username'
									name='username'
									render={({ field }) => (
										<Input
											{...field}
											id='username'
											placeholder='john.doe.007'
											invalid={errors.username && true}
										/>
									)}
								/>
							</Col>
							<Col
								md={6}
								xs={12}>
								<Label
									className='form-label'
									for='billing-email'>
									Billing Email
								</Label>
								<Input
									type='email'
									id='billing-email'
									defaultValue={selectedUser.email}
									placeholder='example@domain.com'
								/>
							</Col>
							<Col
								md={6}
								xs={12}>
								<Label
									className='form-label'
									for='status'>
									Status:
								</Label>
								<Select
									id='status'
									isClearable={false}
									className='react-select'
									classNamePrefix='select'
									options={statusOptions}
									theme={selectThemeColors}
									defaultValue={
										statusOptions[
											statusOptions.findIndex(
												(i) => i.value === selectedUser.status
											)
										]
									}
								/>
							</Col>
							<Col
								md={6}
								xs={12}>
								<Label
									className='form-label'
									for='tax-id'>
									Tax ID
								</Label>
								<Input
									id='tax-id'
									placeholder='Tax-1234'
									defaultValue={selectedUser.contact.substr(
										selectedUser.contact.length - 4
									)}
								/>
							</Col>
							<Col
								md={6}
								xs={12}>
								<Label
									className='form-label'
									for='contact'>
									Contact
								</Label>
								<Input
									id='contact'
									defaultValue={selectedUser.contact}
									placeholder='+1 609 933 4422'
								/>
							</Col>
							<Col
								md={6}
								xs={12}>
								<Label
									className='form-label'
									for='language'>
									language
								</Label>
								<Select
									id='language'
									isClearable={false}
									className='react-select'
									classNamePrefix='select'
									options={languageOptions}
									theme={selectThemeColors}
									defaultValue={languageOptions[0]}
								/>
							</Col>
							<Col
								md={6}
								xs={12}>
								<Label
									className='form-label'
									for='country'>
									Country
								</Label>
								<Select
									id='country'
									isClearable={false}
									className='react-select'
									classNamePrefix='select'
									options={countryOptions}
									theme={selectThemeColors}
									defaultValue={countryOptions[0]}
								/>
							</Col>
							<Col xs={12}>
								<div className='d-flex align-items-center mt-1'>
									<div className='form-switch'>
										<Input
											type='switch'
											defaultChecked
											id='billing-switch'
											name='billing-switch'
										/>
										<Label
											className='form-check-label'
											htmlFor='billing-switch'>
											<span className='switch-icon-left'>
												<Check size={14} />
											</span>
											<span className='switch-icon-right'>
												<X size={14} />
											</span>
										</Label>
									</div>
									<Label
										className='form-check-label fw-bolder'
										for='billing-switch'>
										Use as a billing address?
									</Label>
								</div>
							</Col>
							<Col
								xs={12}
								className='text-center mt-2 pt-50'>
								<Button
									type='submit'
									className='me-1'
									color='primary'>
									Submit
								</Button>
								<Button
									type='reset'
									color='secondary'
									outline
									onClick={() => {
										handleReset();
										setShow(false);
									}}>
									Discard
								</Button>
							</Col>
						</Row>
					</Form>
				</ModalBody>
			</Modal> */}
		</Fragment>
	);
};

export default UserInfoCard;

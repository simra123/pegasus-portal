// ** React Imports
import { Fragment, useState } from "react";
import logo from "@src/assets/images/logo/logo.png";

// ** Third Party Components
import Select from "react-select";
import Cleave from "cleave.js/react";
import { useForm, Controller } from "react-hook-form";
import "cleave.js/dist/addons/cleave-phone.us";

// ** Reactstrap Imports
import {
	Row,
	Col,
	Form,
	Card,
	Input,
	Label,
	Button,
	CardBody,
	CardTitle,
	CardHeader,
	FormFeedback,
} from "reactstrap";

// ** Utils
import { selectThemeColors } from "@utils";
import moment from "moment";
import CoreHttpHandler from "../../../../../http/services/CoreHttpHandler";
import ContentUploadHandler from "../../../../../http/services/ContentUploadHandler";
import Swal from "sweetalert2";
import { DefaultUser } from "../../../reuseable";

// ** Demo Components

const statusOptions = [
	{ value: true, label: "Enable" },
	{ value: false, label: "Disable" },
];

const AccountTabs = (props) => {
	// ** Hooks
	const { data, setData } = props;

	const defaultValues = {
		lastName: data?.lastname,
		firstName: data?.firstname,
		number: data?.number,
		email: data?.email,
		status: data?.enabled,
		username: data?.username,
		image: data?.image,
	};
	const {
		control,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues });

	// ** States
	const [avatar, setAvatar] = useState("");
	const [status, setStatus] = useState("");
	const [number, setNumber] = useState("");
	const [fileData, setFileData] = useState("");
	const [url, setUrl] = useState("");
	const [name, setName] = useState("");

	const onChange = (e) => {
		let _name = e.target.files[0].name;

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
						"sellers",
						"updateAdmin",
						{
							lastname: datas?.lastName,
							firstname: datas?.firstName,
							number: number == "" ? datas?.number : number,
							email: datas?.email,
							enable: status == "" ? datas?.status : status,
							username: datas?.username,
							image: `https://upload.its.com.pk/v1/fetch/file/${response.data.data.file}`,
							seller_id: data?.id,
						},
						(response) => {
							let _params = {
								...data,
								lastname: datas?.lastName,
								firstname: datas?.firstName,
								number: number == "" ? datas?.number : number,
								email: datas?.email,
								enable: status == "" ? datas?.status : status,
								username: datas?.username,
								image: `https://upload.its.com.pk/v1/fetch/file/${img}`,
								seller_id: data?.id,
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
				"sellers",
				"updateAdmin",
				{
					lastname: datas?.lastName,
					firstname: datas?.firstName,
					number: number == "" ? datas?.number : number,
					email: datas?.email,
					enable: status == "" ? datas?.status : status,
					username: datas?.username,
					image: datas?.image,
					seller_id: data?.id,
				},
				(response) => {
					let _params = {
						...data,
						lastname: datas?.lastName,
						firstname: datas?.firstName,
						number: number == "" ? datas?.number : number,
						email: datas?.email,
						enable: status == "" ? datas?.status : status,
						username: datas?.username,
						image: datas?.image,
						seller_id: data?.id,
					};
					setData(_params);
					document.body.style.opacity = 1;
					//  props.replace({ state: _params });
					Swal.fire({
						icon: "success",
						title: "Success",
						text: "Successfully Updated Seller Details",
						confirmButtonColor: "green",
					});
					props.replace({
						data: {
							lastname: datas?.lastName,
							firstname: datas?.firstName,
							number: number == "" ? datas?.number : number,
							email: datas?.email,
							enable: status == "" ? datas?.status : status,
							username: datas?.username,
							image: datas?.image,
							seller_id: data?.id,
						},
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
				<CardBody className='py-2 my-25'>
					<Row>
						<Col
							sm='6'
							className='mb-1'>
							<div className='d-flex'>
								<div className='me-25'>
									<img
										className='rounded me-50'
										src={
											avatar
												? avatar
												: `https://upload.its.com.pk/v1/fetch/file/${data?.image}`
										}
										alt='Generic placeholder image'
										height='100'
										width='100'
									/>
								</div>
								<div
									className='d-flex align-items-end mt-75 ms-1'
									style={{ float: "right" }}>
									<div>
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
								</div>
							</div>
						</Col>
					</Row>

					<h3 style={{ marginTop: "30px" }}>Seller Details</h3>

					<Form
						className='mt-2 pt-50'
						onSubmit={handleSubmit(onSubmit)}>
						<Row>
							<Col
								sm='6'
								className='mb-1'>
								<Label
									className='form-label'
									for='firstName'>
									First Name
								</Label>
								<Controller
									name='firstName'
									control={control}
									render={({ field }) => (
										<Input
											id='firstName'
											placeholder='John'
											invalid={errors.firstName && true}
											{...field}
										/>
									)}
								/>
								{errors && errors.firstName && (
									<FormFeedback>Please enter a valid First Name</FormFeedback>
								)}
							</Col>
							<Col
								sm='6'
								className='mb-1'>
								<Label
									className='form-label'
									for='lastName'>
									Last Name
								</Label>
								<Controller
									name='lastName'
									control={control}
									render={({ field }) => (
										<Input
											id='lastName'
											placeholder='Doe'
											invalid={errors.lastName && true}
											{...field}
										/>
									)}
								/>
								{errors.lastName && (
									<FormFeedback>Please enter a valid Last Name</FormFeedback>
								)}
							</Col>
							<Col
								sm='6'
								className='mb-1'>
								<Label
									className='form-label'
									for='emailInput'>
									E-mail
								</Label>
								<Controller
									name='email'
									control={control}
									render={({ field }) => (
										<Input
											id='emailInput'
											type='email'
											name='email'
											placeholder='Email'
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
									for='Username'>
									Username
								</Label>
								<Controller
									name='username'
									control={control}
									render={({ field }) => (
										<Input
											defaultValue={data?.username}
											id='username'
											name='username'
											placeholder='username'
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
									for='phNumber'>
									Seller Phone Number
								</Label>

								<Input
									id='phonenumber'
									name='phonenumber'
									onChange={(e) => setNumber(e.target.value)}
									defaultValue={data?.number}
								/>
							</Col>
							<Col
								sm='6'
								className='mb-1'>
								<Label
									className='form-label'
									for='enable'>
									Status
								</Label>
								<Select
									id='status'
									isClearable={false}
									className='react-select'
									classNamePrefix='select'
									options={statusOptions}
									theme={selectThemeColors}
									onChange={(e) => setStatus(e.value)}
									defaultValue={
										data?.enabled == true ? statusOptions[0] : statusOptions[1]
									}
								/>
							</Col>

							{/* <h3 style={{ marginTop: "30px" }}>Store Details</h3> */}

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
				</CardBody>
			</Card>
		</Fragment>
	);
};

export default AccountTabs;

// ** React Imports
import { useContext, Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import useJwt from "@src/auth/jwt/useJwt";
// ** Third Party Components
import { useDispatch } from "react-redux";
import { toast, Slide } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import {
	Facebook,
	Twitter,
	Mail,
	GitHub,
	HelpCircle,
	Coffee,
} from "react-feather";
import CoreHttpHandler from "../../../http/services/CoreHttpHandler";
// ** Actions
import { handleLogin } from "@store/authentication";
import { DefaultRoute } from "../../../router/routes";
// ** Context
import { AbilityContext } from "@src/utility/context/Can";
// ** Custom Components
import Avatar from "@components/avatar";
import InputPasswordToggle from "@components/input-password-toggle";
// ** Utils
//import { getHomeRouteForLoggedInUser } from "@utils";
// ** Reactstrap Imports
import {
	Row,
	Col,
	Form,
	Input,
	Label,
	Alert,
	Button,
	CardText,
	CardTitle,
	UncontrolledTooltip,
} from "reactstrap";
// import { ToastError, ToastSuccess } from "../../reuseable";
// **
import "@styles/react/pages/page-authentication.scss";
import { useState } from "react";
const ToastContent = ({ name, role }) => (
	<Fragment>
		<div className='toastify-header'>
			<div className='title-wrapper'>
				<Avatar
					size='sm'
					color='success'
					icon={<Coffee size={12} />}
				/>
				<h6 className='toast-title fw-bold'>Welcome, {name}</h6>
			</div>
		</div>
		<div className='toastify-body'>
			<span>
				You have successfully logged in as an {role} user to Vuexy. Now you can
				start to explore. Enjoy!
			</span>
		</div>
	</Fragment>
);
const defaultValues = {
	password: "admin",
	loginEmail: "admin@demo.com",
};
const Login = () => {
	// ** Hooks
	const { skin } = useSkin();
	const dispatch = useDispatch();
	const history = useHistory();
	const ability = useContext(AbilityContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const {
		control,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues });
	const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
		source = require(`@src/assets/images/pages/${illustration}`).default;
	const userToken = localStorage.getItem("user_token");
	const authSuccess = (response) => {
		const token = response.data.data.token;
		localStorage.setItem("client_token", token);
		// CoreHttpHandler.request(
		//   "core",
		//   "clientSettings",
		//   {},
		//   settingsSuccess,
		//   settingsFailure
		// );
	};
	const authFailure = (error) => {};
	const clientAuthentication = () => {
		CoreHttpHandler.request("client", "auth", {}, authSuccess, authFailure);
	};
	const checkUser = () => {
		if (userToken == null) {
			clientAuthentication();
		}
	};
	useEffect(() => {
		checkUser();
	}, []);
	//	console.log("hehehe");
	const loginSuccess = (data) => {
		// ToastSuccess(
		// 	`Welcome ${data.data.data.user?.username}`,
		// 	`You have successfully logged in as to Golive. Now you can
		// start to explore. Enjoy!`
		// );
		console.log(data.data.data);
		const { token, user, acl } = data.data.data;
		localStorage.setItem("user_token", token);
		user.ability = [{ action: "manage", subject: "all" }];
		ability.update([{ action: "manage", subject: "all" }]);

		if (user) {
			localStorage.setItem("user_data", JSON.stringify(user));
		} else localStorage.setItem("user_data", JSON.stringify({}));
		if (acl) {
			localStorage.setItem("user_acl", JSON.stringify(acl?.FRONT));
		}
		//else localStorage.setItem("user_acl", JSON.stringify({}));
		// if (app) {
		// 	localStorage.setItem("app_acl", JSON.stringify(app));
		// } else localStorage.setItem("app_acl", JSON.stringify({}));
		// if (back) {
		// 	localStorage.setItem("back_acl", JSON.stringify(back));
		// } else localStorage.setItem("back_acl", JSON.stringify({}));
		window.location.reload(false);
		// console.log(DefaultRoute, "dfff");
		setTimeout(() => {
			history.push(DefaultRoute);
		}, 2000);
	};
	const loginFailure = (error) => {
		if (
			error &&
			error.response &&
			error.response.data &&
			error.response.data.message
		) {
			//	ToastError("Error", error.response.data.message);
		} else {
			//	ToastError("Error", "Somthing went Wrong!");
		}
	};
	const onSubmit = (_data) => {
		const data = {
			username: username,
			password: password,
		};
		if (
			username == "" ||
			password == "" ||
			password == undefined ||
			username == undefined
		) {
			//setIsLoading(false)
			//setSnackBarOpen(true)
			// setSnackBarMessage('Please Fill The Required Fields')
			// setOK('error')
			// ToastError("Error", "Both Username and Password is required");
		}
		CoreHttpHandler.request(
			"users",
			"login",
			{ username: username, password: password },
			loginSuccess,
			loginFailure
		);
	};
	return (
		<div className='auth-wrapper auth-cover'>
			<Row className='auth-inner m-0'>
				<Link
					className='brand-logo'
					to='/'
					onClick={(e) => e.preventDefault()}>
					<svg
						viewBox='0 0 139 95'
						version='1.1'
						height='28'>
						<defs>
							<linearGradient
								x1='100%'
								y1='10.5120544%'
								x2='50%'
								y2='89.4879456%'
								id='linearGradient-1'>
								<stop
									stopColor='#000000'
									offset='0%'></stop>
								<stop
									stopColor='#FFFFFF'
									offset='100%'></stop>
							</linearGradient>
							<linearGradient
								x1='64.0437835%'
								y1='46.3276743%'
								x2='37.373316%'
								y2='100%'
								id='linearGradient-2'>
								<stop
									stopColor='#EEEEEE'
									stopOpacity='0'
									offset='0%'></stop>
								<stop
									stopColor='#FFFFFF'
									offset='100%'></stop>
							</linearGradient>
						</defs>
						<g
							id='Page-1'
							stroke='none'
							strokeWidth='1'
							fill='none'
							fillRule='evenodd'>
							<g
								id='Artboard'
								transform='translate(-400.000000, -178.000000)'>
								<g
									id='Group'
									transform='translate(400.000000, 178.000000)'>
									<path
										d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
										id='Path'
										className='text-primary'
										style={{ fill: "currentColor" }}></path>
									<path
										d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
										id='Path'
										fill='url(#linearGradient-1)'
										opacity='0.2'></path>
									<polygon
										id='Path-2'
										fill='#000000'
										opacity='0.049999997'
										points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'></polygon>
									<polygon
										id='Path-2'
										fill='#000000'
										opacity='0.099999994'
										points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'></polygon>
									<polygon
										id='Path-3'
										fill='url(#linearGradient-2)'
										opacity='0.099999994'
										points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'></polygon>
								</g>
							</g>
						</g>
					</svg>
					<h2 className='brand-text text-primary ms-1'>Vuexy</h2>
				</Link>
				<Col
					className='d-none d-lg-flex align-items-center p-5'
					lg='8'
					sm='12'>
					<div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
						<img
							className='img-fluid'
							src={source}
							alt='Login Cover'
						/>
					</div>
				</Col>
				<Col
					className='d-flex align-items-center auth-bg px-2 p-lg-5'
					lg='4'
					sm='12'>
					<Col
						className='px-xl-2 mx-auto'
						sm='8'
						md='6'
						lg='12'>
						<CardTitle
							tag='h2'
							className='fw-bold mb-1'>
							Welcome to Admin Portal
						</CardTitle>
						<Form
							className='auth-login-form mt-2'
							onSubmit={handleSubmit(onSubmit)}>
							<div className='mb-1'>
								<Label
									className='form-label'
									for='login-email'>
									Username
								</Label>
								<Input
									onChange={(e) => setUsername(e.target.value)}
									value={username}
									autoFocus
									type='text'
									placeholder='username'
								/>
							</div>
							<div className='mb-1'>
								<div className='d-flex justify-content-between'>
									<Label
										className='form-label'
										for='login-password'>
										Password
									</Label>
									<Link to='/forgot-password'>
										<small>Forgot Password?</small>
									</Link>
								</div>
								<Controller
									id='password'
									name='password'
									control={control}
									render={({ field }) => (
										<InputPasswordToggle
											className='input-group-merge'
											onChange={(e) => setPassword(e.target.value)}
											value={password}
										/>
									)}
								/>
							</div>
							<div className='form-check mb-1'>
								<Input
									type='checkbox'
									id='remember-me'
								/>
								<Label
									className='form-check-label'
									for='remember-me'>
									Remember Me
								</Label>
							</div>
							<Button
								type='submit'
								color='primary'
								block>
								Sign in
							</Button>
						</Form>
					</Col>
				</Col>
			</Row>
		</div>
	);
};
export default Login;

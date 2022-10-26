// ** React Imports
import { useContext, Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import logo from "@src/assets/images/logo/logo.png";

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
import { Row, Col, Form, Input, Label, CardTitle } from "reactstrap";
import { ToastError, ToastSuccess, LoadingButton } from "../reuseable";
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
	const [loading, setLoading] = useState(false);
	const {
		control,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm({ defaultValues });
	const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
		source = require(`@src/assets/images/pages/whiskey-glass.png`).default;
	const userToken = localStorage.getItem("user_token");
	const authSuccess = (response) => {
		const token = response.data.data.token;
		localStorage.setItem("client_token", token);
		console.log(response, "res");
		// CoreHttpHandler.request(
		//   "core",
		//   "clientSettings",
		//   {},
		//   settingsSuccess,
		//   settingsFailure
		// );
	};
	const authFailure = (error) => {
		console.log(error, "error");
	};
	const clientAuthentication = () => {
		console.log("working");
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
		setLoading(false);
		ToastSuccess(
			`Welcome ${data.data.data.user?.username}`,
			`You have successfully logged in as to Golive. Now you can
		start to explore. Enjoy!`
		);
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
		setLoading(false);
		if (
			error &&
			error.response &&
			error.response.data &&
			error.response.data.message
		) {
			ToastError("Error", error.response.data.message);
		} else {
			ToastError("Error", "Somthing went Wrong!");
		}
	};
	const onSubmit = (_data) => {
		setLoading(true);
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
			ToastError("Error", "Both Username and Password is required");
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
					<img
						className='img-fluid'
						width={50}
						src={logo}
						alt='Login'
						style={{ display: "flex", alignItem: "center" }}
					/>
					<h2 className='brand-text text-primary ms-1'>Pegasus</h2>
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
							Welcome to Pegasus Portal
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
							<LoadingButton
								type='submit'
								color='primary'
								text='Sign in'
								block={true}
								loading={loading}
							/>
						</Form>
					</Col>
				</Col>
			</Row>
		</div>
	);
};
export default Login;

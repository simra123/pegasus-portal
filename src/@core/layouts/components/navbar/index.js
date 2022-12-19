// ** React Imports
import { Fragment, useEffect } from "react";
import { ToastAlertSuccess } from "../../../../views/pages/reuseable";
// ** Custom Components
import { useDispatch, useSelector } from "react-redux";
import NavbarUser from "./NavbarUser";
import {
	setNotificationData,
	setNotificationNumber,
} from "../../../../redux/portalData";
import WebSocket from "../../../../views/socket/WebSocket";

import NavbarBookmarks from "./NavbarBookmarks";

const ThemeNavbar = (props) => {
	// ** Props
	const state = useSelector((state) => state.portalData);
	const socket = WebSocket.getSocket();
	const dispatch = useDispatch();
	useEffect(() => {
		socket?.on("notification", (data) => {
			if (
				state.notification_data.length != 0 &&
				state.notification_data[0]?.order_id == data.order_id
			) {
			} else {
				ToastAlertSuccess("You Have a new Order");
			}
			dispatch(setNotificationData(data));
			dispatch(setNotificationNumber(data["notification_number"] + 1));
		});
	}, []);
	const { skin, setSkin, setMenuVisibility } = props;

	return (
		<Fragment>
			<div className='bookmark-wrapper d-flex align-items-center'>
				<NavbarBookmarks setMenuVisibility={setMenuVisibility} />
			</div>
			<NavbarUser
				skin={skin}
				setSkin={setSkin}
			/>
		</Fragment>
	);
};

export default ThemeNavbar;

// ** Router Import
import Router from "./router/Router";
import { useEffect } from "react";
import WebSocket from "./views/socket/WebSocket";
import { ToastSuccess } from "./views/pages/reuseable";
import { useDispatch, useSelector } from "react-redux";
import { setNotificationData, setNotificationNumber } from "./redux/portalData";
import CoreHttpHandler from "./http/services/CoreHttpHandler";
import { createBrowserHistory } from "history";
const history = createBrowserHistory();
const App = () => {
	// useEffect(()=>{
	//   CoreHttpHandler.request(
	//     "dashboard",
	//     "sellerDashboard",
	//     {
	//       startDate: "2022-10-01",
	//       endDate: "2022-11-14",
	//     },
	//     (response) => {
	//       dispatch(
	//         setNotificationNumber(response.data.data.order_notification + 1)
	//       );
	//     },
	//     (failure) => {}
	//   );
	// },[history.location.pathname])
	return <Router />;
};
export default App;

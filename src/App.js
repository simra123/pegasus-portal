// ** Router Import
import { useState } from 'react';
import Router from './router/Router'
import { useEffect } from 'react';
import WebSocket from "./views/socket/WebSocket";
import { ToastSuccess } from "./views/pages/reuseable";
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationNumber } from './redux/portalData';
import CoreHttpHandler from './http/services/CoreHttpHandler';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();


const App = () => {
  const state = useSelector((state)=> state.portalData)
	const socket = WebSocket.getSocket();
  const dispatch = useDispatch()

    useEffect(()=>{
      socket?.on("notification", data =>{
        ToastSuccess(
          "Success",
          "You Have a new Order"
        );
        console.log(state.notification_number, "nottii");
        dispatch(setNotificationNumber(data["notification_number"] + 1))

      })
      
    },[])

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

return (

    <Router />

);

}

export default App

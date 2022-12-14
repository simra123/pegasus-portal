// ** Router Import
import { useState } from 'react';
import Router from './router/Router'
import { useEffect } from 'react';
import WebSocket from "./views/socket/WebSocket";
import { ToastSuccess } from "./views/pages/reuseable";
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationData, setNotificationNumber } from './redux/portalData';
import CoreHttpHandler from './http/services/CoreHttpHandler';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();


const App = () => {
  const state = useSelector((state)=> state.portalData)
	const socket = WebSocket.getSocket();
  const dispatch = useDispatch()

    useEffect(()=>{
      socket?.on("notification", data =>{
        
        if(state.notification_data.length != 0 &&  state.notification_data[0].order_id == data.order_id){
        
        }else{
          ToastSuccess("Success", "You Have a new Order");

        }
        dispatch(setNotificationData(data));
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

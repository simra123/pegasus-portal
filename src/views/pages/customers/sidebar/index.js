// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Shop Components
import Sidebar from "./Sidebar";
import Profile from "./profile";
import Orders from "./orders";

import { getAllData, getData } from "@src/views/apps/user/store";
import { useHistory, useLocation } from "react-router-dom";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";


// ** Styles
import "@styles/react/apps/app-ecommerce.scss";

const Shop = () => {
	// ** States
	const [activeView, setActiveView] = useState("grid");
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("products");

	// ** Vars
	const dispatch = useDispatch();
	const store = useSelector((state) => state.ecommerce);
	const location = useLocation();

	const [id, setId] = useState(location?.state?.id);
	const [sellerData, setSellerData] = useState(location?.state?.data);
	console.log(sellerData,'sss')
	const history = useHistory();
	// useEffect(() => {
	// 	if (!sellerData) {
	// 		history.push("/apps/sellers");
	// 	}
	// }, [sellerData]);
	const onChange = (p) => {
		setSellerData(p);
		console.log(location, "lol");
	};

	return (
		<Fragment>
			<div className='content-detached content-right'>
				<div className='content-body'>
					{/* <Header setSidebarOpen={setSidebarOpen} /> */}
						{activeTab === "profile" ? (
						<Profile
							data={sellerData}
							setData={onChange}
						/>
					) : activeTab === "order" ? (
						<Orders data={sellerData} />
					) : null}
				</div>
			</div>
			<Sidebar
				setActiveTab={setActiveTab}
				sidebarOpen={sidebarOpen}
				activeTab={activeTab}
			/>
		</Fragment>
	);
};
export default Shop;

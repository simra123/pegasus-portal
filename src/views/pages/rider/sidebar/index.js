// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Shop Components
import Sidebar from "./Sidebar";
import Products from "./products";
import Profile from "./profile";
import StoreDetails from "./store-details";
import Wallet from "./wallet";
import Orders from "./orders";
import Header from "./products/ProductsHeader";
import { getAllData, getData } from "@src/views/apps/user/store";
import { useHistory, useLocation } from "react-router-dom";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import {
	addToCart,
	getProducts,
	getCartItems,
	addToWishlist,
	deleteCartItem,
	deleteWishlistItem,
} from "./products/store";

// ** Styles
import "@styles/react/apps/app-ecommerce.scss";
import CoreHttpHandler from "../../../../http/services/CoreHttpHandler";
const Shop = () => {
	// ** States
	const [activeView, setActiveView] = useState("grid");
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("profile");
	const [data, setData] = useState([]);
	const [currentParams, setCurrentParams] = useState({
		limit: 10,
		page: 0,
	});
	// ** Vars
	const dispatch = useDispatch();
	const store = useSelector((state) => state.ecommerce);
	const location = useLocation();

	const [id, setId] = useState(location?.state?.id);
	const [riderData, setRiderData] = useState(location?.state?.data);
	const [totalPages, setTotalPages] = useState(0);
	const [riderWallet, setRiderWallet] = useState(0);
	const [loading, setLoading] = useState(false);

	const history = useHistory();
	const getOrders = (start, end, val, page) => {
		setLoading(true);
		CoreHttpHandler.request(
			"riders",
			"fetchOrders",
			{
				...currentParams,
				// filter: val == undefined ? filter : val,
				// searchValue: searchVal,
				// startDate: start,
				// endDate: end,
				rider_id: id,
			},
			(response) => {
				setLoading(false);
				const res = response.data.data.riders.orders;

				setData(res);
			},
			(failure) => {
				setLoading(false);
			}
		);
	};
	useEffect(() => {
		if (!riderData) {
			history.push("/apps/rider");
		}
		//getOrders();
	}, [riderData]);
	const onChange = (p) => {
		setRiderData(p);
	};
	console.log(riderData, "rider data");

	return (
		<Fragment>
			<div className='content-detached content-right'>
				<div className='content-body'>
					<Header setSidebarOpen={setSidebarOpen} />
					{activeTab === "products" ? (
						<Products
							storeId={id}
							store={store}
							dispatch={dispatch}
							addToCart={addToCart}
							activeView={activeView}
							sidebarOpen={sidebarOpen}
							getCartItems={getCartItems}
							setActiveView={setActiveView}
							addToWishlist={addToWishlist}
							setSidebarOpen={setSidebarOpen}
							deleteCartItem={deleteCartItem}
							deleteWishlistItem={deleteWishlistItem}
						/>
					) : activeTab === "profile" ? (
						<Profile
							data={riderData}
							setData={onChange}
						/>
					) : activeTab === "wallet" ? (
						<Wallet
							wallet={riderWallet}
							loading={loading}
							id={id}
							data={data}
						/>
					) : activeTab === "order" ? (
						<Orders
							id={id}
							totalPages={totalPages}
							loading={loading}
							setCurrentParams={setCurrentParams}
						/>
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

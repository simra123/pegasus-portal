// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Shop Components
import Sidebar from "./Sidebar";
import Products from "./products";
import Profile from "./profile";
import StoreDetails from "./store-details";
import Orders from "./orders";
import Header from "./products/ProductsHeader";
import HotDeals from "./hot-deals";
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

	const history = useHistory();
	useEffect(() => {
		if (!sellerData) {
			history.push("/apps/sellers");
		}
	}, [sellerData]);
	const onChange = (p) => {
		setSellerData(p);
	};

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
							sellerData={sellerData}
						/>
					) : activeTab === "profile" ? (
						<Profile
							data={sellerData}
							setData={onChange}
						/>
					) : activeTab === "store" ? (
						<StoreDetails
							data={sellerData}
							setData={onChange}
						/>
					) : activeTab === "order" ? (
						<Orders data={sellerData} />
					) : activeTab === "deals" ? (
						<HotDeals data={sellerData} />
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

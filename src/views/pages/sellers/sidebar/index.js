// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Shop Components
import Sidebar from "./Sidebar";
import Products from "./products";
import Profile from "./profile";
import StoreDetails from "./store-details";
import Header from "./products/ProductsHeader";

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

	// ** Get products
	useEffect(() => {
		dispatch(
			getProducts({
				q: "",
				sortBy: "featured",
				perPage: 9,
				page: 1,
			})
		);
	}, [dispatch]);
	console.log(activeTab, "active tab");
	return (
		<Fragment>
			<div className='content-detached content-right'>
				<div className='content-body'>
					<Header setSidebarOpen={setSidebarOpen} />
					{activeTab === "products" ? (
						<Products
							store={store}
							dispatch={dispatch}
							addToCart={addToCart}
							activeView={activeView}
							getProducts={getProducts}
							sidebarOpen={sidebarOpen}
							getCartItems={getCartItems}
							setActiveView={setActiveView}
							addToWishlist={addToWishlist}
							setSidebarOpen={setSidebarOpen}
							deleteCartItem={deleteCartItem}
							deleteWishlistItem={deleteWishlistItem}
						/>
					) : activeTab === "profile" ? (
						<Profile />
					) : activeTab === "store" ? (
						<StoreDetails />
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

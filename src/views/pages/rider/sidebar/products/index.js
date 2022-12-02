// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Product components
import ProductCards from "./ProductCards";
import ProductsSearchbar from "./ProductsSearchbar";
import CoreHttpHandler from "../../../../../http/services/CoreHttpHandler";
import CreateProduct from "./AddProduct";
// ** Third Party Components
import classnames from "classnames";
import parse from "react";
// ** Reactstrap Imports

import { Button, PaginationItem, PaginationLink } from "reactstrap";
import { Pagination } from "../../../reuseable";
const ProductsPage = (props) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showCreate, setShowCreate] = useState(false);
	const [currentParams, setCurrentParams] = useState({
		limit: 6,
		page: 0,
	});
	const [totalPages, setTotalPages] = useState(0);

	const {
		store,
		dispatch,
		addToCart,
		activeView,
		sidebarOpen,
		getProducts,
		getCartItems,
		addToWishlist,
		setActiveView,
		deleteCartItem,
		setSidebarOpen,
		deleteWishlistItem,
		storeId,
	} = props;

	// ** Handles pagination
	const handlePageChange = (val) => {
		if (val === "next") {
			dispatch(getProducts({ ...store.params, page: store.params.page + 1 }));
		} else if (val === "prev") {
			dispatch(getProducts({ ...store.params, page: store.params.page - 1 }));
		} else {
			dispatch(getProducts({ ...store.params, page: val }));
		}
	};
	const getStoreProducts = () => {
		setLoading(true);
		CoreHttpHandler.request(
			"stores",
			"fetch_products",
			{
				storeId: storeId,
				...currentParams,
			},
			(response) => {
				const res = response.data.data.data;
				setTotalPages(res.totalPages);
				setProducts(res.product);
				setLoading(false);
				setTotalPages(res.totalPages);
			},
			(failure) => {
				setLoading(false);
			}
		);
	};
	useEffect(() => {
		getStoreProducts();
	}, [currentParams]);
	// ** Render pages
	const renderPageItems = () => {
		const arrLength =
			store.totalProducts !== 0 && store.products.length !== 0
				? Number(store.totalProducts) / store.products.length
				: 3;

		return new Array(Math.trunc(arrLength)).fill().map((item, index) => {
			return (
				<PaginationItem
					key={index}
					active={store.params.page === index + 1}
					onClick={() => handlePageChange(index + 1)}>
					<PaginationLink
						href='/'
						onClick={(e) => e.preventDefault()}>
						{index + 1}
					</PaginationLink>
				</PaginationItem>
			);
		});
	};

	// ** handle next page click

	return (
		<>
			<div
				className={classnames("body-content-overlay", {
					show: sidebarOpen,
				})}
				onClick={() => setSidebarOpen(false)}></div>
			{!showCreate && (
				<>
					<ProductsSearchbar
						getProducts={getProducts}
						setShowCreate={setShowCreate}
					/>{" "}
					{/* <Button
						color='primary'
						size='md'
						style={{ float: "right", margin: "20px 0px" }}
						onClick={() => setShowCreate(true)}>
						Add New
					</Button> */}
				</>
			)}

			{!showCreate ? (
				<Fragment>
					<ProductCards
						store={store}
						loading={loading}
						dispatch={dispatch}
						addToCart={addToCart}
						activeView={activeView}
						products={products}
						getProducts={getProducts}
						getCartItems={getCartItems}
						addToWishlist={addToWishlist}
						deleteCartItem={deleteCartItem}
						deleteWishlistItem={deleteWishlistItem}
					/>
					<Pagination
						total={totalPages}
						//currentPage={currentParams.page}
						handlePagination={(e) =>
							setCurrentParams({ limit: 6, page: e.selected })
						}
					/>
				</Fragment>
			) : (
				<CreateProduct
					storeId={storeId}
					setShowCreate={setShowCreate}
					getProducts={getStoreProducts}
				/>
			)}
		</>
	);
};

export default ProductsPage;

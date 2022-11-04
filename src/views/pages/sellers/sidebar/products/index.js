// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Product components
import ProductCards from "./ProductCards";
import ProductsSearchbar from "./ProductsSearchbar";
import CoreHttpHandler from "../../../../../http/services/CoreHttpHandler";

// ** Third Party Components
import classnames from "classnames";

// ** Reactstrap Imports

import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const ProductsPage = (props) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentParams, setCurrentParams] = useState({
		limit: 3,
		page: 0,
	});
	const [totalPages, setTotalPages] = useState(0);
	// ** Props
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
			},
			(failure) => {
				setLoading(false);
			}
		);
	};
	useEffect(() => {
		getStoreProducts();
	}, []);
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
	const handleNext = () => {
		if (
			store.params.page !==
			Number(store.totalProducts) / store.products.length
		) {
			handlePageChange("next");
		}
	};

	return (
		<>
			<div
				className={classnames("body-content-overlay", {
					show: sidebarOpen,
				})}
				onClick={() => setSidebarOpen(false)}></div>
			<ProductsSearchbar
				dispatch={dispatch}
				getProducts={getProducts}
				store={store}
			/>

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
						setCurrentParams({ limit: 1, page: e.selected })
					}
				/>
			</Fragment>
			{/* ) : (
				<div className='d-flex justify-content-center mt-2'>
					<p>No Results</p>
				</div>
			)} */}
		</>
	);
};

export default ProductsPage;

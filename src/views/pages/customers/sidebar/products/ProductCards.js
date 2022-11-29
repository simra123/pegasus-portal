// ** React Imports
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductDetails from "./ProductDetails";
// ** Third Party Components
import classnames from "classnames";
import { Star, ShoppingCart, Heart } from "react-feather";
import { Loader, DataNotFound, ProductImage } from "../../../reuseable";
// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from "reactstrap";
import "@styles/react/apps/app-ecommerce.scss";

const ProductCards = (props) => {
	const [showDetails, setShowDetails] = useState(false);
	const [singleProduct, setSingleProdcuct] = useState({});
	// ** Props
	const {
		store,
		products,
		dispatch,
		addToCart,
		activeView,
		getProducts,
		getCartItems,
		addToWishlist,
		deleteWishlistItem,
		loading,
	} = props;

	// ** Handle Move/Add to cart
	const handleCartBtn = (id, val) => {
		if (val === false) {
			dispatch(addToCart(id));
		}
		dispatch(getCartItems());
		dispatch(getProducts(store.params));
	};

	// ** Handle Wishlist item toggle
	const handleWishlistClick = (id, val) => {
		if (val) {
			dispatch(deleteWishlistItem(id));
		} else {
			dispatch(addToWishlist(id));
		}
		dispatch(getProducts(store.params));
	};

	// ** Renders products
	const renderProducts = () => {
		return (
			<>
				{products.map((item) => {
					const image = item.attachment.filter((att) => att.type == 0);
					return (
						<>
							{!showDetails && (
								<Card
									className='ecommerce-card'
									onClick={() => {
										setShowDetails(true);
										setSingleProdcuct(item);
									}}
									key={item.id}>
									<div className='item-img text-center mx-auto'>
										<img
											className=''
											height={300}
											width={300}
											src={
												item.featured_image
													? `https://upload.its.com.pk/v1/fetch/file/${item.featured_image}`
													: ProductImage
											}
											alt={item.name}
										/>
									</div>
									<CardBody>
										<div className='item-wrapper'>
											<div className='item-rating'>
												<ul className='unstyled-list list-inline'>
													{new Array(5).fill().map((listItem, index) => {
														return (
															<li
																key={index}
																className='ratings-list-item me-25'>
																<Star
																	className={classnames({
																		"filled-star": index + 1 <= item.reviews,
																		"unfilled-star": index + 1 > item.reviews,
																	})}
																/>
															</li>
														);
													})}
												</ul>
											</div>
											<div className='item-cost'>
												<h6 className='item-price'>${item.price}</h6>
											</div>
										</div>
										<h6 className='item-name'>
											<Link
												className='text-body'
												to={`/apps/ecommerce/product-detail/${item.slug}`}>
												{item.name}
											</Link>
											<CardText
												tag='span'
												className='item-company'>
												By{" "}
												<a
													className='company-name'
													href='/'
													onClick={(e) => e.preventDefault()}>
													{item.brand}
												</a>
											</CardText>
										</h6>
										<CardText className='item-description'>
											{item.description}
										</CardText>
									</CardBody>
									<div className='item-options text-center'>
										<div className='item-wrapper'>
											<div className='item-cost'>
												<h4 className='item-price'>${item.price}</h4>
												{item.hasFreeShipping ? (
													<CardText className='shipping'>
														<Badge color='light-success'>Free Shipping</Badge>
													</CardText>
												) : null}
											</div>
										</div>
									</div>
								</Card>
							)}
						</>
					);
				})}
			</>
		);
	};

	return (
		<>
			{showDetails && (
				<ProductDetails
					data={singleProduct}
					setShowDetails={setShowDetails}
				/>
			)}
			{!loading && products && (
				<div
					className={classnames({
						"grid-view": activeView === "grid",
						"list-view": activeView === "list",
					})}>
					{renderProducts()}
				</div>
			)}

			<div className='text-center'>
				<Loader loading={loading} />
			</div>
			{!loading && !products?.length && <DataNotFound />}
		</>
	);
};

export default ProductCards;

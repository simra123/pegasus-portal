// ** React Imports
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductDetails from "./ProductDetails";
// ** Third Party Components\
import classnames from "classnames";
import { Star, ShoppingCart, Heart } from "react-feather";
import {
	Loader,
	DataNotFound,
	ProductImage,
	ToastAlertError,
	ToastAlertSuccess,
} from "../../../reuseable";
// ** Reactstrap Imports
import parse from "html-react-parser";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Card, CardBody, CardText, Button, Badge } from "reactstrap";
import "@styles/react/apps/app-ecommerce.scss";
import CoreHttpHandler from "../../../../../http/services/CoreHttpHandler";
const ProductCards = (props) => {
	const [showDetails, setShowDetails] = useState(false);
	const [singleProduct, setSingleProdcuct] = useState({});
	// ** Props

	const { products, activeView, getProducts, loading } = props;
	const MySwal = withReactContent(Swal);

	const deleteProduct = (item) => {
		MySwal.fire({
			title: "Are you sure?",
			icon: "warning",
			padding: "50px",
			showCancelButton: true,
			customClass: {
				confirmButton: "btn btn-primary",
				cancelButton: "btn btn-outline-danger ms-1",
			},
			background: "#020202",
			buttonsStyling: false,
			confirmButtonText: "Yes",
		}).then(
			(result) => {
				if (result.value) {
					CoreHttpHandler.request(
						"products",
						"delete",
						{
							product_id: item.id,
						},
						(response) => {
							ToastAlertSuccess("Product has been Deleted");
							getProducts();
						},
						(err) =>
							ToastAlertError(
								err?.response?.data?.message
									? err?.response.data.message
									: "something went wrong"
							)
					);
				}
			},
			(error) => {}
		);
	};
	// ** Renders products
	const renderProducts = () => {
		console.log(products, "pros");
		return (
			<>
				{products.map((item) => {
					return (
						<>
							{!showDetails && (
								<Card
									className='ecommerce-card'
									key={item.id}>
									<div className='item-img text-center mx-auto'>
										<img
											onClick={() => {
												setShowDetails(true);
												setSingleProdcuct(item);
											}}
											className=''
											height={300}
											width={300}
											src={
												item.featured_image
													? `https://upload.its.com.pk/v1/fetch/file/${item.featured_image}`
													: item.hot_deal_featured_image
													? `https://upload.its.com.pk/v1/fetch/file/${item.hot_deal_featured_image}`
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
												{item.sale_price ? (
													item.sale_price > 0 ? (
														<h6 className='item-price'>
															<span style={{ textDecoration: "line-through" }}>
																${item.price}
															</span>
															<span style={{ marginLeft: "5px" }}>
																${item.sale_price}
															</span>
														</h6>
													) : (
														<h6 className='item-price  me-1'>${item.price}</h6>
													)
												) : (
													<h6 className='item-price'>
														<span style={{ textDecoration: "line-through" }}>
															${item.regular_price}
														</span>
														<span style={{ marginLeft: "5px" }}>
															${item.deal_price}
														</span>
													</h6>
												)}
											</div>
										</div>
										<h6 className='item-name'>
											<Link
												className='text-body'
												onClick={() => {
													setShowDetails(true);
													setSingleProdcuct(item);
												}}
												to={`/apps/sellers/details`}>
												{item.name ? item.name : item.hot_deal_name}
											</Link>
											<CardText
												tag='span'
												className='item-company'>
												By
												<a
													className='company-name'
													href='/'
													onClick={(e) => e.preventDefault()}>
													{item.store_name
														? item.store_name
														: item.products[0].store_name}
												</a>
											</CardText>
										</h6>
										<CardText
											className='item-description'
											style={{ marginBottom: "0px" }}>
											{item.description
												? parse(item.description.substring(0, 60))
												: item.description}
										</CardText>
										<CardText
											tag='span'
											className='text-primary'
											style={{ float: "right" }}>
											{/* <RiDeleteBin7Line
												style={{ cursor: "pointer" }}
												size={20}
												onClick={() => deleteProduct(item)}
											/> */}
											{item?.qty}
										</CardText>
										<div className=''>
											<h6 className=''>
												By{" "}
												{item.store_name
													? item.store_name
													: item.products[0].store_name}
											</h6>
										</div>
									</CardBody>
									<div className='item-options text-center'>
										<div className='item-wrapper'>
											<div className='item-cost'>
												<h4 className='item-price'>$ {item.price}</h4>
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

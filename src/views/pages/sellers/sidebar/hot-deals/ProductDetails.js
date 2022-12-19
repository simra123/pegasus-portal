import { useState, useEffect } from "react";
import {
	Card,
	Col,
	Row,
	CardBody,
	CardText,
	Button,
	Badge,
	CardHeader,
} from "reactstrap";
import { Star, ShoppingCart, X, DollarSign } from "react-feather";
import classnames from "classnames";
import "@styles/base/pages/app-ecommerce-details.scss";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { Pagination } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { ProductImage } from "../../../reuseable";
const ProductDetails = ({ data, setShowDetails }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [attachment, setAttachment] = useState(null);
	// useEffect(() => {
	// 	let allImage = [];
	// 	if (data?.products) {
	// 		data?.products?.map((e) => {
	// 			e.attachment.map((val) => {
	// 				allImage.push(val);
	// 			});
	// 		});
	// 	}
	// 	setAttachment(allImage);
	// }, [data]);
	return (
		<Card className='app-ecommerce-details mt-2'>
			<CardHeader style={{ marginLeft: "auto" }}>
				<X
					size='12'
					color='white'
					className='cursor-pointer'
					onClick={() => setShowDetails(false)}
				/>
			</CardHeader>
			<CardBody>
				<Row className='my-2 ecommerce-application'>
					<Col
						className=' align-items-center justify-content-center mb-2 mb-md-0'
						md='5'
						xs='12'>
						<div className='slider_wrap align-items-center justify-content-center'>
							<Swiper
								style={{
									"--swiper-navigation-color": "#fff",
									"--swiper-pagination-color": "#fff",
								}}
								loop={false}
								spaceBetween={10}
								navigation={true}
								thumbs={{ swiper: thumbsSwiper }}
								modules={[FreeMode, Navigation, Thumbs, Pagination]}
								className='mySwiper2'>
								{data?.featured_image ? (
									<SwiperSlide>
										<img
											loading='lazy'
											style={{ width: "100%", height: "300px" }}
											alt='featured image'
											src={`https://upload.its.com.pk/${data?.featured_image}`}
										/>
									</SwiperSlide>
								) : null}
								{attachment?.length
									? attachment?.map((val) => {
											return (
												<>
													{val.url && (
														<SwiperSlide key={val.id}>
															<img
																loading='lazy'
																style={{ width: "100%", height: "300px" }}
																alt='featured image'
																src={`https://upload.its.com.pk/${val.url}`}
															/>
														</SwiperSlide>
													)}
												</>
											);
									  })
									: null}
							</Swiper>
							{attachment?.length
								? attachment[0].url && (
										<Swiper
											onSwiper={setThumbsSwiper}
											loop={false}
											spaceBetween={1}
											slidesPerView={4}
											freeMode={true}
											style={{ marginTop: "10px" }}
											modules={[FreeMode, Navigation, Thumbs]}
											className='mySwiper'>
											{deal?.featured_image && (
												<SwiperSlide>
													<img
														loading='lazy'
														className='prod-pagi'
														alt='featured image'
														src={`https://upload.its.com.pk/${deal?.featured_image}`}
													/>
												</SwiperSlide>
											)}
											{attachment
												? attachment.map((val) => {
														return (
															<>
																{val.url && (
																	<SwiperSlide key={val.id}>
																		<img
																			loading='lazy'
																			className='prod-pagi'
																			alt='featured image'
																			src={`https://upload.its.com.pk/${val.url}`}
																		/>
																	</SwiperSlide>
																)}
															</>
														);
												  })
												: null}
										</Swiper>
								  )
								: null}
						</div>
					</Col>
					<Col
						md='7'
						xs='12'>
						<h4 style={{ textTransform: "capitalize", fontSize: "20px" }}>
							{data.name ? data.name : data.hot_deal_name}
						</h4>

						<div className='ecommerce-details-price d-flex flex-wrap mt-1'>
							{data.sale_price ? (
								data.sale_price > 0 ? (
									<h6
										className='item-price'
										style={{ fontSize: "18px", margin: "3px 8px 3px 4px" }}>
										<span style={{ textDecoration: "line-through" }}>
											${data.price}
										</span>
										<span style={{ marginLeft: "5px" }}>
											${data.sale_price}
										</span>
									</h6>
								) : (
									<h6 className='item-price  me-1'>${data.price}</h6>
								)
							) : (
								<h6
									className='item-price'
									style={{ fontSize: "18px", margin: "3px 8px 3px 4px" }}>
									<span style={{ textDecoration: "line-through" }}>
										${data.regular_price}
									</span>
									<span style={{ marginLeft: "5px" }}>${data.deal_price}</span>
								</h6>
							)}
							<ul className='unstyled-list list-inline'>
								{new Array(5).fill().map((listItem, index) => {
									return (
										<li
											key={index}
											className='ratings-list-item me-25'>
											<Star
												className={classnames({
													"filled-star": index + 1 <= data.reviews,
													"unfilled-star": index + 1 > data.reviews,
												})}
											/>
										</li>
									);
								})}
							</ul>
						</div>
						{data?.stock > 0 && (
							<CardText>
								Available -<span className='text-success ms-25'>In stock</span>
							</CardText>
						)}
						<CardText>
							{data?.description ? parse(data.description) : data?.description}
						</CardText>
						{data?.size && <CardText> Size : {data?.size}</CardText>}

						{data.product_category && (
							<CardText> Category : {data?.product_category}</CardText>
						)}
						<ul className='product-features list-unstyled'>
							{data.hasFreeShipping ? (
								<li>
									<ShoppingCart size={19} />
									<span>Free Shipping</span>
								</li>
							) : null}
							{/* <li>
								<DollarSign size={19} />
								<span>EMI options available</span>
							</li> */}
						</ul>
						<h5>Deal Products</h5>

						{data?.products
							? data?.products.map((p) => {
									return (
										<>
											<Row style={{ marginTop: "10px" }}>
												<Col sm={4}>
													<img
														style={{
															width: "100px",
															height: "auto",
															marginRight: "10px",
														}}
														src={`https://upload.its.com.pk/v1/fetch/file/${p.featured_image}`}
													/>
												</Col>
												<Col sm={8}>
													<CardText></CardText>
													<CardText>Name: {p.name}</CardText>
													<CardText>Category: {p.product_category}</CardText>
												</Col>
											</Row>
										</>
									);
							  })
							: null}
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};
export default ProductDetails;

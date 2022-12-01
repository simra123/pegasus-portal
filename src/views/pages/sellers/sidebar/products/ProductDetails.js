import { useState } from "react";
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
import draftToHtml from "draftjs-to-html";
import { ProductImage } from "../../../reuseable";
const ProductDetails = ({ data, setShowDetails }) => {
	//	const image = data?.attachment.filter((att) => att.type == 0);
	//	console.log(data, " new product");
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	console.log(data, "data");
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
								loop={true}
								spaceBetween={10}
								navigation={true}
								thumbs={{ swiper: thumbsSwiper }}
								//	pagination={pagination}
								modules={[FreeMode, Navigation, Thumbs, Pagination]}
								className='mySwiper2'>
								{data?.featured_image && (
									<SwiperSlide>
										<img
											style={{ width: "100%", height: "auto" }}
											alt='featured image'
											src={
												data?.featured_image
													? `https://upload.its.com.pk/v1/fetch/file/${data?.featured_image}`
													: ProductImage
											}
										/>
									</SwiperSlide>
								)}
								{data?.attachment
									? data?.attachment.map((val) => {
											return (
												<SwiperSlide>
													<img
														style={{ width: "100%", height: "auto" }}
														alt='featured image'
														src={
															val?.url
																? `https://upload.its.com.pk/v1/fetch/file/${val?.url}`
																: ProductImage
														}
													/>
												</SwiperSlide>
											);
									  })
									: null}
							</Swiper>
							<Swiper
								onSwiper={setThumbsSwiper}
								loop={true}
								spaceBetween={10}
								slidesPerView={4}
								freeMode={true}
								style={{ marginTop: "10px" }}
								watchSlidesProgress={true}
								modules={[FreeMode, Navigation, Thumbs]}
								className='mySwiper'>
								{data?.featured_image && (
									<SwiperSlide>
										<img
											style={{ width: "100%", height: "auto" }}
											alt='featured image'
											src={
												data?.featured_image
													? `https://upload.its.com.pk/v1/fetch/file/${data?.featured_image}`
													: ProductImage
											}
										/>
									</SwiperSlide>
								)}
								{data?.attachment?.length > 0
									? data?.attachment.map((val) => {
											return (
												<SwiperSlide key={val.id}>
													<img
														style={{ width: "100%", height: "auto" }}
														alt='featured image'
														src={
															val?.url
																? `https://upload.its.com.pk/v1/fetch/file/${val?.url}`
																: ProductImage
														}
													/>
												</SwiperSlide>
											);
									  })
									: null}
							</Swiper>
							{/* <img
								className='img-fluid product-img'
								src={
									data.featured_image
										? `https://upload.its.com.pk/v1/fetch/file/${data.featured_image}`
										: ProductImage
								}
								alt={data.name}
							/> */}
						</div>
					</Col>
					<Col
						md='7'
						xs='12'>
						<h4>{data.name}</h4>

						<div className='ecommerce-details-price d-flex flex-wrap mt-1'>
							<h4 className='item-price me-1'>${data.price}</h4>
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
						<CardText>
							Available -<span className='text-success ms-25'>In stock</span>
						</CardText>
						<CardText>
							{data?.description ? parse(data.description) : data?.description}
						</CardText>
						<CardText>{data?.size}</CardText>
						<ul className='product-features list-unstyled'>
							{data.hasFreeShipping ? (
								<li>
									<ShoppingCart size={19} />
									<span>Free Shipping</span>
								</li>
							) : null}
							<li>
								<DollarSign size={19} />
								<span>EMI options available</span>
							</li>
						</ul>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
};
export default ProductDetails;

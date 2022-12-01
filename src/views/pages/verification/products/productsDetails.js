import { useState } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Row,
	Col,
	CardText,
} from "reactstrap";
import parse from "html-react-parser";

import { Star, ShoppingCart, X, DollarSign } from "react-feather";
import classnames from "classnames";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import { ProductImage } from "../../reuseable";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Pagination } from "swiper";
const ProductDetails = ({ modal, setModal, data }) => {
	console.log(data, "data");
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return (
		<Modal
			isOpen={modal === true}
			toggle={() => setModal(!modal)}
			className='modal-dialog-centered'
			modalClassName={data.modalColor}
			size='lg'
			key={data.id}>
			<ModalHeader toggle={() => setModal(!modal)}>Product Details</ModalHeader>
			<ModalBody>
				<Row className='my-2 ecommerce-application'>
					<Col
						className=' align-items-center justify-content-center mb-2 mb-md-0'
						md='5'
						xs='12'>
						<div className=' align-items-center justify-content-center'>
							<Swiper
								style={{
									"--swiper-navigation-color": "#fff",
									"--swiper-pagination-color": "#fff",
								}}
								loop={true}
								spaceBetween={10}
								navigation={true}
								//thumbs={{ swiper: thumbsSwiper }}
								//	pagination={pagination}
								modules={[FreeMode, Navigation,  Pagination]}
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
									? data?.attachment.map((val, index) => {
											return (
												<SwiperSlide key={index}>
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
								//onSwiper={setThumbsSwiper}
								loop={true}
								spaceBetween={10}
								slidesPerView={4}
								freeMode={true}
								style={{ marginTop: "10px" }}
								watchSlidesProgress={true}
								modules={[FreeMode, Navigation]}
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
			</ModalBody>
			{/* <ModalFooter>
				<Button
					color={"primary"}
					onClick={() => setModal(!modal)}>
					OK
				</Button>
			</ModalFooter> */}
		</Modal>
	);
};
export default ProductDetails;

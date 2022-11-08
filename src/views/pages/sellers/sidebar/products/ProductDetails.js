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

const ProductDetails = ({ data, setShowDetails }) => {
	//	const image = data?.attachment.filter((att) => att.type == 0);
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
						className='d-flex align-items-center justify-content-center mb-2 mb-md-0'
						md='5'
						xs='12'>
						<div className='d-flex align-items-center justify-content-center'>
							<img
								className='img-fluid product-img'
								src={`https://upload.its.com.pk/v1/fetch/file/${data.featured_image}`}
								alt={data.name}
							/>
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
						<CardText>{data.description}</CardText>
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

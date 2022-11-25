// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { Star, ShoppingCart, Heart } from "react-feather";

// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from "reactstrap";

const ProductCards = (props) => {
	// ** Props
	const { productsData, activeView } = props;
	console.log(productsData, "product dataz");
	// ** Renders products
	const renderProducts = () => {
		if (productsData?.length) {
			return productsData?.map((item) => {
				// const CartBtnTag = item.isInCart ? Link : 'button'

				return (
					<Card
						className='ecommerce-card'
						key={item.name}>
						<div className='item-img text-center mx-auto'>
							{/* <Link to={`/apps/ecommerce/product-detail/${item.slug}`}> */}
							<img
								width='300'
								height='300'
								className='img-fluid'
								src={item.featured_image}
							/>
							{/* </Link> */}
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
								<p className='text-body'>{item.name}</p>
								<CardText
									tag='span'
									className='item-company'>
									By{" "}
									<p className='company-name'>
										{item.enabled ? "active" : "inactive"}
									</p>
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
									{/* {item.hasFreeShipping ? (
                    <CardText className='shipping'>
                      <Badge color='light-success'>Free Shipping</Badge>
                    </CardText>
                  ) : null} */}
								</div>
							</div>
							{/* <Button
                className='btn-wishlist'
                color='light'
                onClick={() => handleWishlistClick(item.id, item.isInWishlist)}
              >
                <Heart
                  className={classnames('me-50', {
                    'text-danger': item.isInWishlist
                  })}
                  size={14}
                />
                <span>Wishlist</span>
              </Button>
              <Button
                color='primary'
                tag={CartBtnTag}
                className='btn-cart move-cart'
                onClick={() => handleCartBtn(item.id, item.isInCart)}

                {...(item.isInCart
                  ? {
                      to: '/apps/ecommerce/checkout'
                    }
                  : {})}
               
              >
                <ShoppingCart className='me-50' size={14} />
                <span>{item.isInCart ? 'View In Cart' : 'Add To Cart'}</span>
              </Button> */}
						</div>
					</Card>
				);
			});
		}
	};
	return <div className='grid-view m-0 p-0'>{renderProducts()}</div>;
};

export default ProductCards;

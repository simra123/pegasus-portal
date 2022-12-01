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
import { Star, ShoppingCart, X, DollarSign } from "react-feather";
import classnames from "classnames";
import { ProductImage } from "../../reuseable";
import productCategories from "../../../../http/apis/productCategories";
import { url } from "../../../../image-service-url";

const ProductDetails = ({ modal, setModal, data }) => {
	const image = data?.attachment?.filter((att) => att.type == 0);

	return (
    <Modal
      isOpen={modal === true}
      style={{ width: "70%" }}
      toggle={() => setModal(!modal)}
      className="modal-dialog-centered"
      modalClassName={data.modalColor}
      size="lg"
      key={data.id}
    >
      <ModalHeader toggle={() => setModal(!modal)}>Product Details</ModalHeader>
      <ModalBody>
        <Row className="my-2 ecommerce-application">
          <Col
            // className="d-flex align-items-center justify-content-center mb-2 mb-md-0"
            md="6"
            xs="12"
          >
            <div className="d-flex align-items-center justify-content-center">
              <img
                className="img-fluid product-img"
                src={
                  data.featured_image
                    ? `https://upload.its.com.pk/v1/fetch/file/${data.featured_image}`
                    : ProductImage
                }
                alt={data.name}
              />
            </div>
          </Col>
          <Col md="6" xs="12">
            <h4>{data.name}</h4>

            <div className="ecommerce-details-price d-flex flex-wrap mt-1">
              <h4 className="item-price me-1">${data.price}</h4>
              <ul className="unstyled-list list-inline">
                {new Array(5).fill().map((listItem, index) => {
                  return (
                    <li key={index} className="ratings-list-item me-25">
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
              Available -
              <span className="text-success ms-25">In stock {data?.stock}</span>
            </CardText>
            <CardText>Description: {data.description}</CardText>
            <CardText>Size: {data?.size}</CardText>
            <CardText>Deal Price: {data?.deal_price}</CardText>
            <CardText>Regular Price: {data?.regular_price}</CardText>
            
            <DollarSign size={19} />
            <span>USD</span>

            <hr />
            <h5>Deal Products</h5>

            {data?.products?.map((p) => {
              return (
                <>

                  <Row>
                    <Col sm={6}>
                      <img style={{width: "150px", margin: "10px"}} src={`${url}${p.featured_image}`} />
                    </Col>
                    <Col sm={6}>
                      <CardText></CardText>
                      <CardText>Name: {p.name}</CardText>
                      <CardText>Category: {p.product_category}</CardText>
                    </Col>
                  </Row>
                </>
              );
            })}

            <ul className="product-features list-unstyled">
              {data.hasFreeShipping ? (
                <li>
                  <ShoppingCart size={19} />
                  <span>Free Shipping</span>
                </li>
              ) : null}
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

// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Third Party Components

import CoreHttpHandler from "../../../../../../http/services/CoreHttpHandler";

// ** Reactstrap Imports
import { Card, div, CardText, Row, Col, Table, CardHeader } from "reactstrap";
import { X } from "react-feather";
// ** Styles
import "@styles/base/pages/app-invoice.scss";
import logo from "@src/assets/images/logo/logo.png";
import { Loader } from "../../../../reuseable";
import moment from "moment";
const InvoicePreview = ({ data, setShowDetails }) => {
	// ** HooksVars
	const { id } = useParams();

	// ** States
	const [sendSidebarOpen, setSendSidebarOpen] = useState(false);
	const [addPaymentOpen, setAddPaymentOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [orderDetails, setOrdersDetails] = useState(null);
	// ** Functions to toggle add & send sidebar
	const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen);
	const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen);

	// ** Get invoice on mount based on id
	useEffect(() => {
		if (data) {
			console.log(data,'suuuuss')
			setLoading(true);
			CoreHttpHandler.request(
				"orders",
				"fetchById",
				{
					rider_id: data?.rider_id,
					product_ids: data.product_ids == null ? [] : [data?.product_ids],
					order_id: data?.order_id,
					hot_deal_ids: data?.hot_deal_ids == null ? [] : [data?.hot_deal_ids],
					store_id: data?.store_id
				},
				(response) => {
					setLoading(false);
					setOrdersDetails(response.data.data.orders);
				},
				(failure) => {
					setLoading(false);
					console.log(failure);
				}
			);
		}
	}, []);
	return (
    <div className="invoice-preview-wrapper">
      {orderDetails !== null ? (
        <>
          <Row className="invoice-preview">
            <Col sm={12}>
              <div className="invoice-preview-card">
                <div style={{ textAlign: "right", marginBottom: "30px" }}>
                  <X
                    size="15"
                    color="white"
                    className="cursor-pointer"
                    onClick={() => setShowDetails(false)}
                  />
                </div>
                <div className="invoice-padding pb-0">
                  {/* Header */}
                  <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
                    <div>
                      <div className="logo-wrapper">
                        <img
                          className="fallback-logo"
                          src={logo}
                          alt="logo"
                          height={80}
                        />
                      </div>
                      <CardText className="mb-25">
                        Office 149, 450 South Brand Brooklyn
                      </CardText>
                      <CardText className="mb-25">
                        San Diego County, CA 91905, USA
                      </CardText>
                      <CardText className="mb-0">
                        +1 (123) 456 7891, +44 (876) 543 2198
                      </CardText>
                    </div>
                    <div className="mt-md-0 mt-2">
                      {/* <h4 className='invoice-title'>
										Order id <span className='invoice-number'>#{data.id}</span>
									</h4>
									<div className='invoice-date-wrapper'>
										<p className='invoice-date-title'>Date Issued:</p>
										<p className='invoice-date'>{data?.invoice?.issuedDate}</p>
									</div>
									<div className='invoice-date-wrapper'>
										<p className='invoice-date-title'>Due Date:</p>
										<p className='invoice-date'>{data?.invoice?.dueDate}</p>
									</div> */}
                    </div>
                  </div>
                  {/* /Header */}
                </div>

                <hr className="invoice-spacing" />

                {/* Address and Contact */}
                <div className="invoice-padding pt-0">
                  <Row className="invoice-spacing">
                    <Col className="p-0" xl="8">
                      {orderDetails.rider ? (
                        <>
                          <h3>Rider Details</h3>
                          <br></br>
                          <h6 className="mb-2">Assigned To:</h6>
                          <h6 className="mb-25">
                            {orderDetails.rider.firstname}{" "}
                            {orderDetails.rider.lastname}
                          </h6>
                          <CardText className="mb-25">
                            {orderDetails.rider.email}
                          </CardText>
                          <CardText className="mb-25">
                            {orderDetails.rider.number}
                          </CardText>
                          <CardText className="mb-25">
                            {data?.invoice?.client.contact}
                          </CardText>
                          <CardText className="mb-0">
                            {data?.invoice?.client.companyEmail}
                          </CardText>
                        </>
                      ) : (
                        <h6 className="mb-2">No rider has accepted yet</h6>
                      )}
                    </Col>
                    {/* <Col
									className='p-0 mt-xl-0 mt-2'
									xl='4'>
									<h6 className='mb-2'>Payment Details:</h6>
									<table>
										<tbody>
											<tr>
												<td className='pe-1'>Total Due:</td>
												<td>
													<span className='fw-bold'>paymentDetails</span>
												</td>
											</tr>
											<tr>
												<td className='pe-1'>Bank name:</td>
												<td>odisyfn98</td>
											</tr>
											<tr>
												<td className='pe-1'>Country:</td>
												<td>{data?.paymentDetails?.country}</td>
											</tr>
											<tr>
												<td className='pe-1'>IBAN:</td>
												<td>{data?.paymentDetails?.iban}</td>
											</tr>
											<tr>
												<td className='pe-1'>SWIFT code:</td>
												<td>{data?.paymentDetails?.swiftCode}</td>
											</tr>
										</tbody>
									</table>
								</Col> */}
                  </Row>
                </div>
                {/* /Address and Contact */}

                {/* Invoice Description */}
                <br></br>
                <div className="invoice-padding pt-0">
                  <Row>
                    <Col>
                      <h3>Order Details</h3>
                    </Col>
                  </Row>

                  <br></br>
                </div>
                <Table responsive>
                  <thead>
                    <tr>
                      <th className="py-1">Name</th>
                      <th className="py-1">Price</th>
                      <th className="py-1">quantity</th>
                      <th className="py-1">Date</th>
                      <th className="py-1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails?.hotDeals?.map((val) => {
                      return (
                        <tr key={val?.hot_deal_id}>
                          <td className="py-1">
                            <p className="card-text fw-bold mb-25">
                              {val.hot_deal_name}
                            </p>
                            {/* <p className='card-text text-nowrap'>
													Developed a full stack native app using React Native,
													Bootstrap & Python
												</p> */}
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">${val.deal_price}</span>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">{val.quantity}</span>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">
                              {moment(val.dt).format("YYYY-MM-DD")}
                            </span>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">
                              {val.quantity * val.deal_price}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {orderDetails?.product?.map((val) => {
                      return (
                        <tr key={val.id}>
                          <td className="py-1">
                            <p className="card-text fw-bold mb-25">
                              {val.name}
                            </p>
                            {/* <p className='card-text text-nowrap'>
													Developed a full stack native app using React Native,
													Bootstrap & Python
												</p> */}
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">${val.price}</span>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">{val.quantity}</span>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">
                              {moment(val.dt).format("YYYY-MM-DD")}
                            </span>
                          </td>
                          <td className="py-1">
                            <span className="fw-bold">
                              {val.sale_price == 0
                                ? val.quantity * val.price
                                : val.quantity * val.sale_price}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                {/* /Invoice Description */}

                {/* Total & Sales Person */}

                {/* /Total & Sales Person */}

                <hr />
                <br />
                <div className="invoice-padding pb-0">
                  <Row className="invoice-sales-total-wrapper">
                    <Col
                      className="mt-md-3 mt-3"
                      md="6"
                      order={{ md: 1, lg: 2 }}
                    >
                      {/* <CardText className='mb-0'>
												<span className='fw-bold'>Salesperson:</span>{" "}
												<span className='ms-75'>Alfie Solomons</span>
											</CardText> */}
                    </Col>
                    <Col
                      className="d-flex justify-content-end"
                      md="6"
                      order={{ md: 2, lg: 1 }}
                    >
                      <div className="invoice-total-wrapper">
                        <div className="invoice-total-item">
                          <p className="invoice-total-title">Subtotal:</p>
                          <p className="invoice-total-amount">{data?.amount}</p>
                        </div>
                        <div className="invoice-total-item">
                          <p className="invoice-total-title">
                            Delivery Charges:
                          </p>
                          <p className="invoice-total-amount">
                            {data?.delivery_fees}
                          </p>
                        </div>

                        {/* <div className='invoice-total-item'>
													<p className='invoice-total-title'>Discount:</p>
													<p className='invoice-total-amount'>$28</p>
												</div>
												<div className='invoice-total-item'>
													<p className='invoice-total-title'>Tax:</p>
													<p className='invoice-total-amount'>21%</p>
												</div> */}
                        <hr className="my-50" />
                        <div className="invoice-total-item">
                          <p className="invoice-total-title">Total:</p>
                          <p className="invoice-total-amount">
                            $
                            {parseInt(data?.delivery_fees) +
                              parseInt(data?.amount)}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col className="d-flex justify-content-start" md="8">
                      <div className="invoice-total-wrapper">
                        <div className="invoice-total-item">
                          <p className="invoice-total-title">
                            Delivery Percent:
                          </p>
                        </div>
                        <div className="invoice-total-item">
                          <p className="invoice-total-title">Pegasus:</p>
                          <p className="invoice-total-amount">
                            {data?.delivery_fees * 0.6}
                          </p>
                        </div>
                        <div className="invoice-total-item">
                          <p className="invoice-total-title">Rider:</p>
                          <p className="invoice-total-amount">
                            {data?.delivery_fees * 0.4}
                          </p>
                        </div>

                        {/* <div className='invoice-total-item'>
													<p className='invoice-total-title'>Discount:</p>
													<p className='invoice-total-amount'>$28</p>
												</div>
												<div className='invoice-total-item'>
													<p className='invoice-total-title'>Tax:</p>
													<p className='invoice-total-amount'>21%</p>
												</div> */}
                        <hr className="my-50" />
                        <div className="invoice-total-item">
                          <p className="invoice-total-title">Total:</p>
                          <p className="invoice-total-amount">
                            $
                            {parseInt(data?.delivery_fees)}
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                {/* Invoice Note */}
                {/* <div className='invoice-padding pt-0'>
									<Row>
										<Col sm='12'>
											<span className='fw-bold'>Note: </span>
											<span>
												It was a pleasure working with
											</span>
										</Col>
									</Row>
								</div> */}
                {/* /Invoice Note */}
              </div>
            </Col>
          </Row>

          {/* <SendInvoiceSidebar
      toggleSidebar={toggleSendSidebar}
      open={sendSidebarOpen}
    /> */}
          {/* <AddPaymentSidebar
      toggleSidebar={toggleAddSidebar}
      open={addPaymentOpen}
    /> */}
        </>
      ) : (
        <Loader loading={loading} />
      )}
    </div>
  );
};

export default InvoicePreview;

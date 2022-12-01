// ** Custom Hooks
import { useRTL } from "@hooks/useRTL";

// ** Third Party Components
import wNumb from "wnumb";
import classnames from "classnames";
import { Star, Mail } from "react-feather";
import Nouislider from "nouislider-react";

// ** Reactstrap Imports
import {
	Card,
	CardBody,
	CardTitle,
	CardHeader,
	ListGroup,
	ListGroupItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { MdProductionQuantityLimits } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiBox } from "react-icons/fi";
import { BiStoreAlt } from "react-icons/bi";
// ** Styles
import "@styles/react/libs/noui-slider/noui-slider.scss";

const Sidebar = (props) => {
	// ** Props
	const { sidebarOpen, setActiveTab, activeTab } = props;

	return (
		<div
			className='sidebar-detached sidebar-left'
			style={{ float: "inherit" }}>
			<div className='sidebar'>
				<div
					className={classnames("sidebar-shop", {
						show: sidebarOpen,
					})}>
					{/* <Row>
            <Col sm='12'>
              <h6 className='filter-heading d-none d-lg-block'>Filters</h6>
            </Col>
          </Row> */}
					<Card className='seller-sidebar'>
						<CardHeader className='border-bottom'>
							<CardTitle tag='h4'>Rider Menu</CardTitle>
						</CardHeader>
						<div style={{ height: "100vh", marginTop: "20px" }}>
							<ListGroup
								tag='div'
								className='list-group-filters'>
								{/* <ListGroupItem
									action
									tag={Link}
									to={"/apps/sellers/details"}
									active={activeTab == "products"}
									onClick={() => setActiveTab("products")}>
									<MdProductionQuantityLimits
										className='me-75'
										size={18}
									/>
									<span className='align-middle'>Products</span>
								</ListGroupItem> */}
								<ListGroupItem
									action
									tag={Link}
									to={"/apps/rider/details"}
									active={activeTab == "profile"}
									onClick={() => setActiveTab("profile")}>
									<CgProfile
										className='me-75'
										size={18}
									/>
									<span className='align-middle'>Profile</span>
								</ListGroupItem>
								<ListGroupItem
									action
									tag={Link}
									to={"/apps/rider/details"}
									active={activeTab == "wallet"}
									onClick={() => setActiveTab("wallet")}>
									<BiStoreAlt
										className='me-75'
										size={18}
									/>
									<span className='align-middle'>Wallet</span>
								</ListGroupItem>
								<ListGroupItem
									action
									tag={Link}
									to={"/apps/rider/details"}
									active={activeTab == "order"}
									onClick={() => setActiveTab("order")}>
									<FiBox
										className='me-75'
										size={18}
									/>
									<span className='align-middle'>Orders</span>
								</ListGroupItem>
							</ListGroup>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;

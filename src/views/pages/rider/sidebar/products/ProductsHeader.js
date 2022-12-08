// ** Third Party Components
import classnames from "classnames";
import { Menu, Grid, List } from "react-feather";

// ** Reactstrap Imports
import {
	Row,
	Col,
	Button,
	ButtonGroup,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledButtonDropdown,
} from "reactstrap";

const ProductsHeader = (props) => {
	// ** Props
	const {
		activeView,
		setActiveView,
		dispatch,
		getProducts,
		store,
		setSidebarOpen,
	} = props;

	// ** Sorting obj

	return (
		<div className='ecommerce-header'>
			<Row>
				<Col sm='12'>
					<div className='ecommerce-header-items'>
						<div className='result-toggler'>
							<button
								className='navbar-toggler shop-sidebar-toggler'
								onClick={() => setSidebarOpen(true)}>
								<span className='navbar-toggler-icon d-block d-lg-none'>
									<Menu size={14} />
								</span>
							</button>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default ProductsHeader;

// ** Icons Imports
import { Search } from "react-feather";

// ** Reactstrap Imports
import {
	Row,
	Col,
	InputGroup,
	Input,
	InputGroupText,
	Button,
} from "reactstrap";
import { MdAddCircle } from "react-icons/md";
const ProductsSearchbar = (props) => {
	// ** Props
	const { setShowCreate, getProducts } = props;

	return (
		<div
			id='ecommerce-searchbar'
			className='ecommerce-searchbar'>
			<Row className='mt-1'>
				<Col sm='11'>
					<InputGroup className='input-group-merge'>
						<Input
							className='search-product'
							placeholder='Search Product'
						/>
						<InputGroupText>
							<Search
								className='text-muted'
								size={14}
							/>
						</InputGroupText>
					</InputGroup>
				</Col>
				<Col
					sm='1'
					className='text-primary '>
					{/* onClick={() => setShowCreate(true)} */}

					<MdAddCircle
						color='primary'
						size='35'
						style={{ marginTop: "7px", cursor: "pointer" }}
						onClick={() => setShowCreate(true)}
					/>
					{/* </Button> */}
				</Col>
			</Row>
		</div>
	);
};

export default ProductsSearchbar;

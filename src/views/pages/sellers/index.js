// ** React Imports
import { Fragment } from "react";

// ** Roles Components
import Table from "./Table";

const Roles = () => {
	return (
		<Fragment>
			<h3 className='mt-50'>Total Sellers</h3>
			{/* <p className='mb-2'>
				Find all of your company’s administrator accounts and their associate
				roles.
			</p> */}
			<div className='app-user-list'>
				<Table />
			</div>
		</Fragment>
	);
};

export default Roles;

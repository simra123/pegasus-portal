// ** React Imports
import { Fragment } from "react";

// ** Roles Components
import Table from "./Table";

const Roles = () => {
	return (
		<Fragment>
			{/* <h3>Roles List</h3>
      <p className='mb-2'>
        A role provides access to predefined menus and features depending on the assigned role to an administrator that
        can have access to what he needs.
      </p>
      <RoleCards /> */}
			
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

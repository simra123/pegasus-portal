import { useState, Fragment } from "react";
import { Card, CardBody } from "reactstrap";
import Table from "./Table";

const orders = (props) => {
	return (
		<Fragment>
			<Card>
				<CardBody className='p-0'>
					{/* <p className='mb-2'>
				Find all of your company’s administrator accounts and their associate
				roles.
			</p> */}
					<div className='app-user-list'>
						<Table storeId={props?.data?.store_id} />
					</div>
				</CardBody>
			</Card>
		</Fragment>
	);
};

export default orders;

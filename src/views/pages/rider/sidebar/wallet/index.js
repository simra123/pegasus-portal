import { useState, Fragment, useEffect } from "react";
import { Card, CardBody, CardHeader, Row, Col, CardFooter } from "reactstrap";
import Table from "./Table";
import moment from "moment";
import CoreHttpHandler from "../../../../../http/services/CoreHttpHandler";
const orders = ({ id }) => {
	const [totalOrder, setTotalOrders] = useState(0);
	const [riderWallet, setRiderWallet] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [loading, setLoading] = useState(false);
	const [tempTotal, setTempTotal] = useState(0);
	const [data2, setData2] = useState([]);
	const [picker, setPicker] = useState(new Date());
	const [filter, setFilter] = useState("");
	const [searchVal, setSearchVal] = useState("");
	const [data, setData] = useState([]);
	const [currentParams, setCurrentParams] = useState({
		limit: 10,
		page: 0,
	});
	const getOrders = (start, end, val, page) => {
		setLoading(true);
		CoreHttpHandler.request(
			"riders",
			"fetchOrders",
			{
				status: "delieverd",
				limit: currentParams.limit,
				page: page ? 0 : currentParams.page,
				filter: val == undefined ? filter : val,
				searchValue: searchVal,
				startDate: start,
				endDate: end,
				rider_id: id,
			},
			(response) => {
				setLoading(false);
				const res = response.data.data.riders;
				setTotalPages(res.totalPages);
				setTotalOrders(res.totalItems);
				setRiderWallet(res.wallet.total);
				if (filter == "all" || filter == "") {
					setData2(res.orders);
					setTempTotal(res.totalPages);
				}
				setData(res.orders);
			},
			(failure) => {
				setLoading(false);
			}
		);
	};

	useEffect(() => {
		getOrders();
	}, [currentParams]);
	const handleFilter = () => {
		if (picker[0] && picker[1]) {
			getOrders(
				`${moment(picker[0]).format("YYYY-MM-DD")} 00:00:00`,
				`${moment(picker[1]).format("YYYY-MM-DD")} 00:00:00`
			);
		} else {
			getOrders(null, null, null, true);
		}
	};
	return (
		<Fragment>
			<Row>
				<Col xs='6'>
					<Card>
						<CardBody
							className='text-primary'
							style={{ textAlign: "center", fontSize: "24px" }}>
							$ {riderWallet ? riderWallet : 0}
						</CardBody>

						<CardFooter style={{ padding: "10px", textAlign: "center" }}>
							{" "}
							Wallet
						</CardFooter>
					</Card>
				</Col>
				<Col xs='6'>
					<Card>
						<CardBody
							className='text-primary'
							style={{ textAlign: "center", fontSize: "24px" }}>
							{totalOrder ? totalOrder : 0}
						</CardBody>
						<CardFooter style={{ padding: "10px", textAlign: "center" }}>
							Total Orders
						</CardFooter>
					</Card>
				</Col>
			</Row>

			<Card>
				<CardBody className='p-0'>
					{/* <p className='mb-2'>
				Find all of your company’s administrator accounts and their associate
				roles.
			</p> */}
					<div className='app-user-list'>
						<Table
							data={data}
							totalPages={totalPages}
							setCurrentParams={setCurrentParams}
							loading={loading}
							setTempTotal={setTempTotal}
							tempTotal={tempTotal}
							setTotalPages={setTotalPages}
							setData={setData}
							getOrders={getOrders}
							filter={filter}
							setFilter={setFilter}
							setSearchVal={setSearchVal}
							searchVal={searchVal}
							data2={data2}
							handleFilter={handleFilter}
							setPicker={setPicker}
							picker={picker}
						/>
					</div>
				</CardBody>
			</Card>
		</Fragment>
	);
};

export default orders;

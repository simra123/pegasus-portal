// ** React Imports
import { useState, useEffect, forwardRef } from "react";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import {
	Loader,
	Pagination,
	DatePicker,
	ToastAlertError,
	SearchFilters,
} from "../../../reuseable";
import {
	Card,
	Input,
	Row,
	Col,
	Button,
	Badge,
	Table,
	CardBody,
	Label,
	InputGroup,
	InputGroupText,
} from "reactstrap";
import Avatar from "@components/avatar";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import CoreHttpHandler from "../../../../../http/services/CoreHttpHandler";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
	<div className='form-check'>
		<Input
			type='checkbox'
			ref={ref}
			{...props}
		/>
	</div>
));

const OrderTable = (props) => {
	console.log(props,'storor')
	const handleDetails = (e) => {
		history.push({
			pathname: "/apps/sellers/details",
			state: { id: e.store_id, data: e },
		});
	};

	const [data, setData] = useState([]);
	const [tempTotal, setTempTotal] = useState(0);
	const [data2, setData2] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalPages, setTotalPages] = useState(0);
	const [picker, setPicker] = useState(new Date());
	const [filter, setFilter] = useState("all");
	const [searchVal, setSearchVal] = useState("");
	const [currentParams, setCurrentParams] = useState({
		limit: 10,
		page: 0,
	});

	const history = useHistory();
	const getOrders = (start, end, val, page) => {
    setLoading(true);
    CoreHttpHandler.request(
      "sellers",
      "fetchSellerOrders",
      {
        ...currentParams,
        filter: val == undefined ? filter : val,
        searchValue: searchVal,
        startDate: start,
        endDate: end,
        store_id: props.storeId,
      },
      (response) => {
        setLoading(false);
        console.log(response.data.data.orders, "dtete");
        const res = response.data.data.orders;
        setTotalPages(res.totalPages);
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

	const orderStatus = (status) => {
      switch (status) {
        case "accepted":
          return (
            <Badge pill color="light-primary" className="mr-1">
              Accepted
            </Badge>
          );
        case "order_placed":
          return (
            <Badge pill color="dark" className="mr-1">
              Order Placed
            </Badge>
          );
        case "delieverd":
          return (
            <Badge pill color="light-success" className="mr-1">
              Delivered
            </Badge>
          );
        case "picked":
          return (
            <Badge pill color="light-secondary" className="mr-1">
              Picked
            </Badge>
          );

        default:
          return (
            <Badge pill color="light-primary" className="mr-1">
              Accepted
            </Badge>
          );
      }
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
		<>
			<Card>
				<CardBody>
					<SearchFilters
						filter={filter}
						setFilter={setFilter}
						setSearchVal={setSearchVal}
						searchVal={searchVal}
						getData={getOrders}
						data2={data2}
						handleFilter={handleFilter}
						setPicker={setPicker}
						picker={picker}
						setData={setData}
						setTotalPages={setTotalPages}
						tempTotal={tempTotal}
						options={[
							{
								name: "Order no",
								value: "order_no",
							},
							{
								name: "Status",
								value: "status",
							},
							{
								name: "Date",
								value: "date",
							},
						]}
					/>
					{!loading && data ? (
						<Table
							striped
							responsive
							className='border-none'>
							<thead>
								<tr style={{ fontSize: "11px" }}>
									<th>Order Number</th>
									<th>City</th>
									<th>Amount</th>
									<th>Date</th>
									<th>Status</th>
									<th>Details</th>
								</tr>
							</thead>
							<tbody>
								{data?.map((order, index) => {
									return (
										<tr key={order.id}>
											<td>{order.order_no}</td>

											<td>{order.city}</td>
											<td>{order.amount}</td>
											<td>{moment(order.dt).format("YYYY-MM-DD")}</td>
											<td>{orderStatus(order.status)}</td>
											<td>
												{" "}
												<Button
													color='primary'
													size='sm'
													onClick={() => handleDetails(order)}>
													view
												</Button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					) : null}
					{!loading && !data?.length && (
						<div className='text-ceter'>No Data Found</div>
					)}
					<Loader loading={loading} />
				</CardBody>
			</Card>
			<Pagination
				total={totalPages}
				handlePagination={(e) =>
					setCurrentParams({ limit: 10, page: e.selected })
				}
			/>
		</>
	);
};

export default OrderTable;

// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Product components
import ProductCards from "./ProductCards";
import CoreHttpHandler from "../../../../../http/services/CoreHttpHandler";
// ** Third Party Components
import classnames from "classnames";
// ** Reactstrap Imports

import { CardHeader, Card } from "reactstrap";
import { Pagination } from "../../../reuseable";
const Carts = (props) => {
	const [carts, setCarts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showCreate, setShowCreate] = useState(false);
	const [currentParams, setCurrentParams] = useState({
		limit: 6,
		page: 0,
	});
	const [totalPages, setTotalPages] = useState(0);

	const { id, sidebarOpen, getProducts, getCartItems, setSidebarOpen } = props;

	// ** Handles pagination
	const handlePageChange = (val) => {
		if (val === "next") {
			dispatch(getProducts({ ...store.params, page: store.params.page + 1 }));
		} else if (val === "prev") {
			dispatch(getProducts({ ...store.params, page: store.params.page - 1 }));
		} else {
			dispatch(getProducts({ ...store.params, page: val }));
		}
	};
	const getCarts = () => {
		setLoading(true);
		CoreHttpHandler.request(
			"customers",
			"cart",
			{
				key: ":customer_id",
				value: id,
			},
			(response) => {
				const res = response.data.data.data;
				// setTotalPages(res.totalPages);
				setCarts(res);
				setLoading(false);
				// setTotalPages(res.totalPages);
			},
			(failure) => {
				setLoading(false);
			}
		);
	};
	useEffect(() => {
		getCarts();
	}, [currentParams]);

	return (
		<>
			<div
				className={classnames("body-content-overlay", {
					show: sidebarOpen,
				})}
				onClick={() => setSidebarOpen(false)}></div>

			<Fragment>
				<Card>
					<CardHeader>Carts</CardHeader>
				</Card>
				<ProductCards
					loading={loading}
					products={carts}
					getProducts={getCarts}
					getCartItems={getCartItems}
					activeView={"grid"}
				/>
				<Pagination
					total={totalPages}
					//currentPage={currentParams.page}
					handlePagination={(e) =>
						setCurrentParams({ limit: 6, page: e.selected })
					}
				/>
			</Fragment>
		</>
	);
};

export default Carts;

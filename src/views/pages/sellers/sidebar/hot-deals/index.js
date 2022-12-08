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
const Deals = (props) => {
	const [deals, setDeals] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentParams, setCurrentParams] = useState({
		limit: 6,
		page: 0,
	});
	const [totalPages, setTotalPages] = useState(0);

	const { data, sidebarOpen, getProducts, getCartItems, setSidebarOpen } =
		props;

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
	const getDeals = () => {
		setLoading(true);
		CoreHttpHandler.request(
			"sellers",
			"deals",
			{
				...currentParams,
				store_id: Number(data?.store_id),
			},
			(response) => {
				const res = response.data.data.data;
				// setTotalPages(res.totalPages);
				setDeals(res.hotDeals);
				console.log(res, "deal");
				setLoading(false);
				// setTotalPages(res.totalPages);
			},
			(failure) => {
				setLoading(false);
			}
		);
	};
	useEffect(() => {
		getDeals();
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
					<CardHeader>Deals</CardHeader>
				</Card>
				<ProductCards
					loading={loading}
					products={deals}
					getProducts={getDeals}
					getCartItems={getCartItems}
					activeView={"grid"}
				/>
				<Pagination
					total={totalPages}
					handlePagination={(e) =>
						setCurrentParams({ limit: 6, page: e.selected })
					}
				/>
			</Fragment>
		</>
	);
};

export default Deals;

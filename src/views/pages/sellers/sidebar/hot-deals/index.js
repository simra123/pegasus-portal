// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Product components
import ProductCards from "./ProductCards";
import CoreHttpHandler from "../../../../../http/services/CoreHttpHandler";
// ** Third Party Components
import classnames from "classnames";
// ** Reactstrap Imports
import CreateDeal from "./AddDeal";

import { MdAddCircle } from "react-icons/md";

import { CardHeader, Card } from "reactstrap";
import { Pagination } from "../../../reuseable";
const Deals = (props) => {
	const [deals, setDeals] = useState([]);
	const [singleDeal, setSingleDeal] = useState(null);

	const [loading, setLoading] = useState(true);
	const [showCreate, setShowCreate] = useState(false);
	const [currentParams, setCurrentParams] = useState({
		limit: 6,
		page: 0,
	});
	const [totalPages, setTotalPages] = useState(0);
	const [productsData, setProductsData] = useState([]);

	const { data, sidebarOpen, getCartItems, setSidebarOpen } = props;

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
	const getProducts = () => {
		CoreHttpHandler.request(
			"products",
			"fetch_id_name",
			{
				store_id: Number(data?.store_id),
			},
			(response) => {
				let p = [];
				response.data.data.data.product.map((r) => {
					p.push({ label: r.name, value: r.id });
				});
				setProductsData(p);
			},
			(failure) => {}
		);
	};
	useEffect(() => {
		getDeals();
		getProducts();
	}, [currentParams]);
	console.log(Number(data?.store_id), "id");
	return (
		<>
			<div
				className={classnames("body-content-overlay", {
					show: sidebarOpen,
				})}
				onClick={() => setSidebarOpen(false)}></div>

			<Fragment>
				<Card>
					<CardHeader>
						Deals
						{!showCreate && (
							<div>
								<MdAddCircle
									color='primary'
									size='30'
									style={{ marginTop: "0px", cursor: "pointer" }}
									onClick={() => setShowCreate(true)}
								/>
							</div>
						)}
					</CardHeader>
				</Card>
				{!showCreate ? (
					<>
						<ProductCards
							loading={loading}
							products={deals}
							getProducts={getDeals}
							getCartItems={getCartItems}
							activeView={"grid"}
							setData={setSingleDeal}
							setShowCreate={setShowCreate}
						/>
						<Pagination
							total={totalPages}
							handlePagination={(e) =>
								setCurrentParams({ limit: 6, page: e.selected })
							}
						/>
					</>
				) : (
					<CreateDeal
						//	storeId={storeId}
						setShowCreate={setShowCreate}
						showCreate={showCreate}
						productsData={productsData}
						data={singleDeal}
						//	setShowCreate={setShowCreate}
						//	getProducts={getStoreProducts}
						//	type={type}
						//	sellerData={props.sellerData.id}
						//	productItem={productItem}
						//	setProductItem={setProductItem}
						//	setType={setType}
					/>
				)}
			</Fragment>
		</>
	);
};

export default Deals;

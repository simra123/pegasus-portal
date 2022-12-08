import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "reactstrap";
import CoreHttpHandler from "../../../../http/services/CoreHttpHandler";
import ProductCards from "./ProductCards";
import UserInfoCard from "./UserInfoCard";
import "@styles/react/apps/app-ecommerce.scss";
import { Pagination } from "../../reuseable";
const Store = () => {
	const [storesData, setStoresData] = useState([]);
	const [productsData, setProductsData] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [currentParams, setCurrentParams] = useState({
		limit: 6,
		page: 0,
	});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		getStores();
	}, []);

	useEffect(() => {
		if (storesData) {
			getProducts();
		}
	}, [storesData, currentParams]);

	const getStores = () => {
		CoreHttpHandler.request(
			"stores",
			"fetch",
			{},
			(response) => {
				setStoresData(response.data.data);
			},
			(failure) => {}
		);
	};

	const getProducts = () => {
		setLoading(true);
		CoreHttpHandler.request(
			"products",
			"fetch",
			{
				...currentParams,
				storeId: storesData?.data?.data?.id,
			},
			(response) => {
				setLoading(false);
				setProductsData(response.data.data.data.product);
				setTotalPages(response.data.data.data.totalPages);
			},
			(failure) => {
				setLoading(false);
			}
		);
	};

	return (
		<div className='app-user-view'>
			<Row>
				<Col
					xl='4'
					lg='4'
					xs='12'
					md={{ order: 0, size: 4 }}>
					<UserInfoCard
						storeData={storesData?.data?.data}
						orders={storesData?.data?.orders}
						getStores={getStores}
					/>
				</Col>
				<Col
					xl='8'
					lg='8'
					xs='12'
					md={{ order: 1, size: 3 }}>
					<ProductCards
						products={productsData}
						totalPages={totalPages}
						activeView={"grid"}
						loading={loading}
					/>
					<Pagination
						total={totalPages}
						handlePagination={(e) =>
							setCurrentParams({ limit: 6, page: e.selected })
						}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default Store;

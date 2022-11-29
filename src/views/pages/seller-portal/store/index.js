import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "reactstrap";
import CoreHttpHandler from "../../../../http/services/CoreHttpHandler";
import PlanCard from "./PlanCard";
import ProductCards from "./ProductCards";
import UserInfoCard from "./UserInfoCard";
import "@styles/react/apps/app-ecommerce.scss";

const Store = () => {
	const [storesData, setStoresData] = useState([]);
	const [productsData, setProductsData] = useState([]);

	useEffect(() => {
		getStores();
		
	}, []);
	
	useEffect(() => {
		if (storesData) {
      		getProducts();
    	}
	}, [storesData]);

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
		CoreHttpHandler.request(
			"products",
			"fetch",
			{
				limit: 100,
				page: 0,
				storeId: storesData?.data?.data?.id,
			},
			(response) => {
				setProductsData(response.data.data.data.product);
			},
			(failure) => {}
		);
	};

	return (
    //   <div className="ecommerce-application">
    //     <div className="content-detached content-right">
    //       <div className="content-body">
    //         <Fragment>
    //           <ProductCards
    //             productsData={productsData?.data}
    //             activeView={"grid"}
    //           />
    //         </Fragment>
    //       </div>
    //     </div>
    //   </div>

    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs="12" md={{ order: 0, size: 4 }}>
          <UserInfoCard
            storeData={storesData?.data?.data}
            orders={storesData?.data?.orders}
            getStores={getStores}
          />
        </Col>
        <Col xl="8" lg="7" xs="12" md={{ order: 1, size: 3 }}>
          <ProductCards productsData={productsData} activeView={"grid"} />
        </Col>
      </Row>
    </div>
  );
};

export default Store;

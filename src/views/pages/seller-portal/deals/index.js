import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "reactstrap";
import CoreHttpHandler from "../../../../http/services/CoreHttpHandler";
import Table from "./Table"

import "@styles/react/apps/app-ecommerce.scss";

const Store = () => {
	const [storesData, setStoresData] = useState([]);
	const [productsData, setProductsData] = useState([]);

	useEffect(() => {
		getStores();
		getProducts();
	}, []);

	useEffect(() => {
		if(storesData){
      		getProducts();

		}
    }, [storesData]);

	const getStores = () => {
		CoreHttpHandler.request(
			"stores",
			"fetch",
			{
				limit: 1,
				page: 0
			},
			(response) => {
				setStoresData(response.data.data);
			},
			(failure) => {}
		);
	};
	console.log(storesData?.data?.data)
	const getProducts = () => {
      CoreHttpHandler.request(
        "products",
        "fetch_id_name",
        {
			store_id: storesData?.data?.data?.id
		},
        (response) => {
			let p =[]
			response.data.data.data.product.map(r =>{
				p.push({label: r.name,value: r.id})
			})
          setProductsData(p);
        },
        (failure) => {}
      );
    };
	return (
    <Fragment>
      <h3 className="mt-50">All Deals</h3>
      {/* <p className='mb-2'>
				Find all of your company’s administrator accounts and their associate
				roles.
			</p> */}
      <div className="app-user-list">
        <Table storeData={storesData?.data?.data} productsData={productsData}/>
      </div>
    </Fragment>
  );
};

export default Store;

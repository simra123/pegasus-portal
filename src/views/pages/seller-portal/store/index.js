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

const Store = () =>{

    const [storesData,setStoresData] = useState([])
    const [productsData, setProductsData] = useState([]);


    useEffect(() => {
        getStores();
        getProducts()
    }, []);

    const getStores = () => {
    CoreHttpHandler.request(
        'stores',
        'fetch',
        {},
        (response) => {
            setStoresData(response.data.data)
        },
        (failure)=>{}
    );
    };

    const getProducts = () => {
        CoreHttpHandler.request(
        "products",
        "fetchSeller",
        {},
        (response) => {
            setProductsData(response.data.data);
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
            <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
              <UserInfoCard storeData={storesData?.data} />
            </Col>
            <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 3 }}>
              <ProductCards productsData={productsData?.data} activeView={"grid"}/>
            </Col>
          </Row>
        </div>
    );
}

export default Store
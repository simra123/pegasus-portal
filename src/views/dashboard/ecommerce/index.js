// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Reactstrap Imports

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import {
  UserPlus,
  UserCheck,
  UserX,
  TrendingUp,
  User,
  Box,
  DollarSign,
} from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";

// ** Demo Components
import CompanyTable from './CompanyTable'
import StatsCard from "./Statisticts/StatsCard";
import OrdersBarChart from './Statisticts/OrdersBarChart'
import ProfitLineChart from "./Statisticts/ProfitLineChart";

import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/charts/recharts.scss";
// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import LineChart  from '../../charts/recharts/LineChart';
import PieChart from "./Charts/PieChart";
import BarChart from "../../charts/chart-js/ChartjsBarChart"

import CoreHttpHandler from '../../../http/services/CoreHttpHandler';


const EcommerceDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)
  const permissions = JSON.parse(localStorage.getItem("user_acl"));
  const [data,setData] = useState([])
  const [orderBardata,setOrderBarData] = useState()
  const [profileLinedata, setprofileLineData] = useState();
  const [statsData,setStatsData] = useState()
  const [pieData,setPieData] = useState()

  
   const donut = [
     {
       series: "#ffe700",
     },
     {
       series: "#00d4bd",
     },
     {
       series: "#826bf8",
     },
     {
       series: "#2b9bf4",
     },
     {
       series: "#FFA1A1",
     },
   ];
  // ** vars
  const trackBgColor = '#e9ecef'
   useEffect(() =>{
      getData()
   },[])

  const getData = () =>{
    
    CoreHttpHandler.request(
      "dashboard",
      "sellerDashboard",
      {
          startDate: "2022-10-01",
          endDate: "2022-11-14",
      },
      (response) => {
        
        setData(response.data.data);
        let _data = {
          title: "Order Recieved",
          statistics: response.data.data.order_recieved,
          series:[{"name": "2020","data": [45,85, 65,45,65]}]
        };
        setOrderBarData(_data);
        _data = {
          "title": "Earning",
          "statistics": `$ ${Math.round(response.data.data.earning)}`,
          "series": [{"data": [0,20,5,30,15,45]}]
        }
        setprofileLineData(_data);
        _data = [
          {
            title: response.data.data.sales,
            subtitle: "Sales",
            color: "light-primary",
            icon: <TrendingUp size={24} />,
          },
          {
            title: response.data.data.customers,
            subtitle: "Customers",
            color: "light-info",
            icon: <User size={24} />,
          },
          {
            title: response.data.data.products,
            subtitle: "Products",
            color: "light-danger",
            icon: <Box size={24} />,
          },
          {
            title: response.data.data.gross_sales,
            subtitle: "Gross Sales",
            color: "light-success",
            icon: <DollarSign size={24} />,
          },
        ];
        setStatsData(_data)
        _data = []
        response.data.data.sales_graph.map((s,i)=>{
          _data.push({name: s.name, value: parseInt(s.percent,10), color: donut[i].series})
        })
      //   _data = [
      //       { name: "R&D", value: 50, color: props.series2 },
      //       { name: "Operational", value: 85, color: props.series1 },
      //       { name: "Networking", value: 16, color: props.series5 },
      //       { name: "Hiring", value: 50, color: props.series3 },
      //     ];
      // },
      setPieData(_data)
      },
      (failure)=>{}
    );
  }

  return (
    <div id="dashboard-ecommerce">
      {permissions["FRONT:/seller-dashboard"] ? null
      : <div className="app-user-list">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="Total Sellers"
              icon={<User size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="Total Orders"
              icon={<UserPlus size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="Total Riders"
              icon={<UserCheck size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="Pending Requests"
              icon={<UserX size={20} />}
              renderStats={<h3 className="fw-bolder mb-75">237</h3>}
            />
          </Col>
        </Row>
      </div> }
      
      <Row className="match-height">
        <Col lg="4" md="12">
          <Row className="match-height">
            <Col lg="6" md="3" xs="6">
              <OrdersBarChart warning={colors.warning.main} _data={orderBardata} />
            </Col>
            <Col lg="6" md="3" xs="6">
              <ProfitLineChart info={colors.info.main} _data={profileLinedata} />
            </Col>
          </Row>
        </Col>
        <Col lg="8" md="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} _data={statsData} />
        </Col>
      </Row>
      <Row>
        <Col xl="6" lg="12">
          {pieData != undefined ? 
          <PieChart
            data={pieData}
            series={donut}
          />
          : null}
          
        </Col>
        <Col xl="6" lg="12">
          <BarChart
            success={"#ffe800"}
            labelColor={"#b4b7bd"}
            gridLineColor={"rgba(200, 200, 200, 0.2)"}
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col sm="12">
          <LineChart warning={colors.warning.main} />
        </Col>
      </Row>
      {permissions["FRONT:/seller-dashboard"] ? 
      null :       
      <Row className="match-height">
        <Col lg="12" xs="12">
          <CompanyTable />
        </Col>
      </Row>}
    </div>
  );
}

export default EcommerceDashboard

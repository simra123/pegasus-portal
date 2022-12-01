// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Reactstrap Imports

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

import { Row, Col, CardBody, Card } from "reactstrap";

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
import LineChart  from './Charts/LineChart';
import PieChart from "./Charts/PieChart";
import BarChart from "./Charts/ChartjsBarChart"

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
  const [barData, setBarData] = useState()
  const [lineData, setLineData] = useState();
  const [sellers,setSellers] = useState("")
  const [riders, setRiders] = useState("");
  const [orders, setOrders] = useState("");
  const [pending, setPending] = useState("");


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
    console.log(permissions["FRONT:/seller-dashboard"], "ppspsps");
    permissions["FRONT:/seller-dashboard"] != undefined
      ? CoreHttpHandler.request(
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
              series: [{ name: "2020", data: [45, 85, 65, 45, 65] }],
            };
            setOrderBarData(_data);
            _data = {
              title: "Earning",
              statistics: `$ ${Math.round(response.data.data.earning)}`,
              series: [{ data: [0, 20, 5, 30, 15, 45] }],
            };
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
            setStatsData(_data);
            _data = [];
            response.data.data.sales_graph.map((s, i) => {
              _data.push({
                name: s.name,
                value: parseInt(s.percent, 10),
                color: donut[i].series,
              });
            });
            setPieData(_data);
            let labels = [];
            let total = [];
            let highbar = 0;
            response.data.data.product_delieverd.map((s, i) => {
              if (highbar == 0) {
                highbar = s.total;
              } else if (highbar < parseInt(s.total)) {
                highbar = s.total;
              }
              labels.push(s.date);
              total.push(s.total);
            });
            _data = {
              labels: labels,
              highbar,
              datasets: [
                {
                  maxBarThickness: 35,
                  backgroundColor: "#ffe800",
                  borderColor: "transparent",
                  borderRadius: { topRight: 0, topLeft: 0 },
                  data: total,
                },
              ],
            };
            setBarData(_data);
            _data = response.data.data.earning_weekly;
            _data["sum"] = {
              total: response.data.data.total_earning_weekly,
            };
            setLineData(_data);
          },
          (failure) => {}
        )
      : CoreHttpHandler.request(
          "dashboard",
          "adminDashboard",
          {
            startDate: "2022-10-01",
            endDate: "2022-11-14",
          },
          (response) => {
            setData(response.data.data);
            let _data = {
              title: "Order Recieved",
              statistics: response.data.data.order_recieved,
              series: [{ name: "2020", data: [45, 85, 65, 45, 65] }],
            };
            setOrderBarData(_data);
            _data = {
              title: "Earning",
              statistics: `$ ${Math.round(response.data.data.earning)}`,
              series: [{ data: [0, 20, 5, 30, 15, 45] }],
            };
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
            setStatsData(_data);
            _data = [];
            response.data.data.sales_graph.map((s, i) => {
              _data.push({
                name: s.name,
                value: parseInt(s.percent, 10),
                color: donut[i].series,
              });
            });
            setPieData(_data);
            let labels = [];
            let total = [];
            let highbar = 0;
            response.data.data.product_delieverd.map((s, i) => {
              if (highbar == 0) {
                highbar = s.total;
              } else if (highbar < parseInt(s.total)) {
                highbar = s.total;
              }
              labels.push(s.date);
              total.push(s.total);
            });
            _data = {
              labels: labels,
              highbar,
              datasets: [
                {
                  maxBarThickness: 35,
                  backgroundColor: "#ffe800",
                  borderColor: "transparent",
                  borderRadius: { topRight: 0, topLeft: 0 },
                  data: total,
                },
              ],
            };
            setBarData(_data);
            _data = response.data.data.earning_weekly;
            _data["sum"] = {
              total: response.data.data.total_earning_weekly,
            };
            setLineData(_data);
            setSellers(response.data.data.sellers.sellers)
            setRiders(response.data.data.riders.riders);
            setOrders(response.data.data.orders.orders);
            setPending(response.data.data.pending_seller.sellers);

          },
          (failure) => {}
        ); 
  }
        console.log(data,'dosoos');

  return (
    <div id="dashboard-ecommerce">
      {permissions["FRONT:/seller-dashboard"] ? null : (
        <div className="app-user-list">
          <Row>
            <Col lg="3" sm="6">
              <StatsHorizontal
                color="primary"
                statTitle="Total Sellers"
                icon={<User size={20} />}
                renderStats={<h3 className="fw-bolder mb-75">{sellers}</h3>}
              />
            </Col>
            <Col lg="3" sm="6">
              <StatsHorizontal
                color="danger"
                statTitle="Total Orders"
                icon={<UserPlus size={20} />}
                renderStats={<h3 className="fw-bolder mb-75">{riders}</h3>}
              />
            </Col>
            <Col lg="3" sm="6">
              <StatsHorizontal
                color="success"
                statTitle="Total Riders"
                icon={<UserCheck size={20} />}
                renderStats={<h3 className="fw-bolder mb-75">{orders}</h3>}
              />
            </Col>
            <Col lg="3" sm="6">
              <StatsHorizontal
                color="warning"
                statTitle="Seller Pending Requests"
                icon={<UserX size={20} />}
                renderStats={<h3 className="fw-bolder mb-75">{pending}</h3>}
              />
            </Col>
          </Row>
        </div>
      )}

      <Row className="match-height">
        <Col lg="4" md="12">
          <Row className="match-height">
            {orderBardata == undefined && profileLinedata == undefined ? (
              <Card style={{height: "120px"}}>
                <CardBody> No Data Found</CardBody>
              </Card>
            ) : (
              <>
                <Col lg="6" md="3" xs="6">
                  <OrdersBarChart
                    warning={colors.warning.main}
                    _data={orderBardata}
                  />
                </Col>
                <Col lg="6" md="3" xs="6">
                  <ProfitLineChart
                    info={colors.info.main}
                    _data={profileLinedata}
                  />
                </Col>
              </>
            )}
          </Row>
        </Col>
        <Col lg="8" md="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} _data={statsData} />
        </Col>
      </Row>
      <Row>
        <Col xl="6" lg="12">
          <PieChart data={pieData} series={donut} />
        </Col>
        <Col xl="6" lg="12">
          <BarChart
            barData={barData}
            success={"#ffe800"}
            labelColor={"#b4b7bd"}
            gridLineColor={"rgba(200, 200, 200, 0.2)"}
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col sm="12">
          <LineChart warning={colors.warning.main} lineData={lineData} />
        </Col>
      </Row>
      {/* {permissions["FRONT:/seller-dashboard"] ? 
      null :       
      <Row className="match-height">
        <Col lg="12" xs="12">
          <CompanyTable />
        </Col>
      </Row>} */}
    </div>
  );
}

export default EcommerceDashboard

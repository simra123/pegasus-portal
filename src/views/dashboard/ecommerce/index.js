// ** React Imports
import { useContext } from 'react'

// ** Reactstrap Imports

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";

// ** Demo Components
import CompanyTable from './CompanyTable'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import OrdersBarChart from '@src/views/ui-elements/cards/statistics/OrdersBarChart'
import ProfitLineChart from '@src/views/ui-elements/cards/statistics/ProfitLineChart'
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/charts/recharts.scss";
// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import LineChart  from '../../charts/recharts/LineChart';
import PieChart from "../../charts/recharts/PieChart";
import BarChart from "../../charts/chart-js/ChartjsBarChart"


const EcommerceDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)
  const permissions = JSON.parse(localStorage.getItem("user_acl"));
  
   const donut = {
     series1: "#ffe700",
     series2: "#00d4bd",
     series3: "#826bf8",
     series4: "#2b9bf4",
     series5: "#FFA1A1",
   };

  // ** vars
  const trackBgColor = '#e9ecef'

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
              <OrdersBarChart warning={colors.warning.main} />
            </Col>
            <Col lg="6" md="3" xs="6">
              <ProfitLineChart info={colors.info.main} />
            </Col>
          </Row>
        </Col>
        <Col lg="8" md="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} />
        </Col>
      </Row>
      <Row>
        <Col xl="6" lg="12">
          <PieChart
            series1={donut.series1}
            series2={donut.series2}
            series3={donut.series3}
            series5={donut.series5}
          />
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

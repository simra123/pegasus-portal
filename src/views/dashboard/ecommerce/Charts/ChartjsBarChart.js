// ** Third Party Components
import { Bar } from 'react-chartjs-2'
import Flatpickr from 'react-flatpickr'
import { Calendar } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

const ChartjsBarChart = ({ success, gridLineColor, labelColor, barData }) => {
  // ** Chart Options

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        grid: {
          color: gridLineColor,
          borderColor: gridLineColor,
        },
        ticks: { color: labelColor },
      },
      y: {
        min: 0,
        max: Math.ceil((parseInt(barData?.highbar) + 35) / 10) * 10,
        grid: {
          color: gridLineColor,
          borderColor: gridLineColor,
        },
        ticks: {
          stepSize: Math.floor(
            (parseInt(barData?.highbar) + 35) / barData?.labels.length
          ),
          color: labelColor,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <CardTitle tag="h4">Products Delieverd</CardTitle>
        <div className="d-flex align-items-center">
          {/* <Calendar size={14} />
          <Flatpickr
            className="form-control flat-picker bg-transparent border-0 shadow-none"
            options={{
              mode: "range",
              // eslint-disable-next-line no-mixed-operators
              defaultDate: [
                new Date(),
                new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
              ],
            }}
          /> */}
        </div>
      </CardHeader>
      <CardBody>
        <div style={{ height: "400px" }}>
          {barData ? <Bar data={barData} options={options} height={400} /> : <></> }
          
        </div>
      </CardBody>
    </Card>
  );
};

export default ChartjsBarChart

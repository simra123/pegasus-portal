// ** Reactstrap Imports
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

// ** Third Party Components
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const SimplePieChart = props => {
  // ** Chart Data
  const { data } = props;
  const [datas,setDatas] = useState()

  useEffect(()=>{
    if(data){
      setDatas(data);
    }
  },[data]);
  
  /*eslint-disable */
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    fill,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    /*eslint-enable */
    return (
      <text
        x={x}
        y={y}
        fill={fill === props.secondary ? "#000" : "#fff"}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle tag="h4">Sales Ratio</CardTitle>
          <small className="text-muted">Spending on various categories</small>
        </div>
      </CardHeader>

      <CardBody>
        <div className="recharts-wrapper">
          <ResponsiveContainer>
            <PieChart width={400} height={400}>
              <Pie
                data={datas}
                innerRadius={80}
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {data?.map((entry, index) => (
                  <>
                    <Cell key={`cell-${index}`} fill={entry.color} label />
                  </>
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-wrap">
          {data?.map((entry, index) => (
            <>
              <div className="me-2">
                <span
                  className="bullet bullet-sm bullet-bordered me-50"
                  style={{ backgroundColor: entry.color }}
                ></span>
                <span className="align-middle me-75">{entry.name}</span>
              </div>
            </>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
export default SimplePieChart

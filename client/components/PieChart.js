import React, { useState } from "react";
import { VictoryPie, VictoryLabel } from "victory";

const PieChart = (props) => {
  const [showChart, setShowChart] = useState(false);

  const data = Object.entries(props.treatCals).map(([treatName, cals]) => {
    return { x: treatName, y: cals };
  });

  const data2 = Object.entries(props.treatNumber).map(([treatName, cals]) => {
    return { x: treatName, y: cals };
  });

  const totalCals = Object.values(props.treatCals).reduce(
    (acc, cals) => acc + cals,
    0
  );
  const totalNumber = Object.values(props.treatNumber).reduce(
    (acc, number) => acc + number,
    0
  );

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div
        className="chart-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px", // add this to reduce vertical space
        }}
      >
        <VictoryPie
          data={data}
          colorScale={[            "#FFC947",            "#FF4B4B",            "#4AABAF",            "#A8D8B9",            "#F9D5E5",          ]}
          style={{ labels: { fill: "white", fontSize: 10 } }}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labelRadius={({ innerRadius }) => innerRadius + 30}
          labelPlacement="perpendicular"
          labelComponent={<VictoryLabel />}
          height={200}
          width={200}
        />
        <div style={{ fontSize: "20px" }}>Total Cals= {totalCals}</div>
      </div>
      <div
        className="chart-wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px", // add this to reduce vertical space
        }}
      >
        <VictoryPie
          data={data2}
          colorScale={[            "#6C63FF",            "#FF6F91",            "#28C4D9",            "#FFB997",            "#B2FFD6",          ]}
          style={{ labels: { fill: "white", fontSize: 10 } }}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labelRadius={({ innerRadius }) => innerRadius + 30}
          labelPlacement="perpendicular"
          labelComponent={<VictoryLabel />}
          height={200}
          width={200}
        />
        <div style={{ fontSize: "20px" }}>Total Treats= {totalNumber}</div>
      </div>
    </div>
  );
};

export default PieChart;


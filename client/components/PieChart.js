// import React, {useState} from 'react';
// import { VictoryPie } from 'victory';

// const PieChart = props => {
//   const [showChart, setShowChart] = useState(false)

//   console.log('entries:', props.treatCals);

//   const data = Object.entries(props.treatCals).map(([treatName, cals]) => {
//     return { x: treatName, y: cals };
//   });

//   const data2 = Object.entries(props.treatNumber).map(([treatName, cals]) => {
//     return { x: treatName, y: cals };
//   });



//   return (
//     <div>
//       <div>

//     <VictoryPie
//       data={data}
//       labels={({ datum }) => `${datum.x}: ${datum.y}`}
//       labelRadius={({ innerRadius }) => innerRadius + 30}
//     />
//     </div>
//      <div>

//      <VictoryPie
//        data={data2}
//        labels={({ datum }) => `${datum.x}: ${datum.y}`}
//        labelRadius={({ innerRadius }) => innerRadius + 30}
//      />
//      </div>
//      </div>
//   );
// };

// export default PieChart;

import React, { useState } from "react";
import { VictoryPie, VictoryLabel } from "victory";

const PieChart = (props) => {
  const [showChart, setShowChart] = useState(false);

  console.log("entries:", props.treatCals);

  const data = Object.entries(props.treatCals).map(([treatName, cals]) => {
    return { x: treatName, y: cals };
  });

  const data2 = Object.entries(props.treatNumber).map(([treatName, cals]) => {
    return { x: treatName, y: cals };
  });

  return (
    <div>
      <div className="chart-wrapper">
        <VictoryPie
          data={data}
          colorScale={[
            "#FFC947",
            "#FF4B4B",
            "#4AABAF",
            "#A8D8B9",
            "#F9D5E5",
          ]}
          // labels={({ datum }) => `${datum.x}: ${datum.y}`}
          // labelRadius={({ innerRadius }) => innerRadius + 30}
          style={{ labels: { fill: "white", fontSize: 10 } }}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labelRadius={({ innerRadius }) => innerRadius + 30}
          labelPlacement="perpendicular"
          labelComponent={<VictoryLabel />}
          height={200}
          width={200}
        />
      </div>
      <div className="chart-wrapper">
        <VictoryPie
          data={data2}
          colorScale={[
            "#6C63FF",
            "#FF6F91",
            "#28C4D9",
            "#FFB997",
            "#B2FFD6",
          ]}
          style={{ labels: { fill: "white", fontSize: 10 } }}
          labels={({ datum }) => `${datum.x}: ${datum.y}`}
          labelRadius={({ innerRadius }) => innerRadius + 30}
          labelPlacement="perpendicular"
          labelComponent={<VictoryLabel />}
          height={200}
          width={200}
        />
      </div>
    </div>
  );
};

export default PieChart;

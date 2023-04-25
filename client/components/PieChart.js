import React, {useState} from 'react';
import { VictoryPie } from 'victory';

const PieChart = props => {
  const [showChart, setShowChart] = useState(false)
  // Transform data into format expected by VictoryPie
  // const data = entries.reduce((acc, entry) => {
  //   const existingEntry = acc.find((e) => e.x === entry.treatName);
  //   if (existingEntry) {
  //     existingEntry.y += entry.cals;
  //   } else {
  //     acc.push({ x: entry.treatName, y: entry.cals });
  //   }
  //   return acc;
  // }, []);
  console.log('entries:', props.treatCals);

  const data = Object.entries(props.treatCals).map(([treatName, cals]) => {
    return { x: treatName, y: cals };
  });

  const data2 = Object.entries(props.treatNumber).map(([treatName, cals]) => {
    return { x: treatName, y: cals };
  });



  return (
    <div>
      <div>

    <VictoryPie
      data={data}
      labels={({ datum }) => `${datum.x}: ${datum.y}`}
      labelRadius={({ innerRadius }) => innerRadius + 30}
    />
    </div>
     <div>

     <VictoryPie
       data={data2}
       labels={({ datum }) => `${datum.x}: ${datum.y}`}
       labelRadius={({ innerRadius }) => innerRadius + 30}
     />
     </div>
     </div>
  );
};

export default PieChart;

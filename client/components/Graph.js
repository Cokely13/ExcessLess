import React, { useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../store/singleUserStore';
import { format } from 'date-fns';

const Graph = () => {
  const dispatch = useDispatch();
  const {id} = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchSingleUser(id));
    }

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    if (user && user.entries && Array.isArray(user.entries)) {
      const formattedData = user.entries.reduce((acc, entry) => {
        const existingData = acc.find(d => d.date === entry.date);
        if (existingData) {
          existingData.treats += entry.number;
        } else {
          acc.push({
            date: entry.date,
            treats: entry.number
          })
        }
        return acc;
      }, []).map((entry) => ({
        date: new Date(entry.date + 'T00:00:00-08:00'),
        treats: entry.treats,
      }));
      setData(formattedData);
    }
  }, [user]);

  return (
    <VictoryChart >
      <VictoryAxis
        tickValues={data.map((entry) => entry.date)}
        tickFormat={(date) => format(date, 'MMM d')}
        style={{
          tickLabels: {
            fontSize: 10, // change this value to adjust the font size of the x-axis labels
          },
        }}
      />
<VictoryAxis dependentAxis
  style={{
    axis: { transform: "translateX(-25px)", dx: "100px" },
    tickLabels: { fill: "red", dx: "115px", textAnchor: "end"  },
  }}
/>
      <VictoryBar
        data={data}
        x="date"
        y="treats"
        labels={({ datum }) => datum.treats}
        labelComponent={<VictoryLabel dy={10} />}
        style={{
          data: {
            fill: "#6C63FF",
            stroke: "#6C63FF",
            strokeWidth: 2
          },
          labels: {
            fontSize: 10,
            fill: "white"
          }
        }}
      />
    </VictoryChart>
  );
};

export default Graph;

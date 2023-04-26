import React, { useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryGroup } from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';
import { format, parseISO } from 'date-fns';

const Graph2 = () => {
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
          const existingBeer = existingData.treats.find(t => t.name === 'Beer');
          const existingCandy = existingData.treats.find(t => t.name === 'Candy');
          if (existingBeer) {
            existingBeer.count += entry.number;
          } else if (existingCandy) {
            existingCandy.count += entry.number;
          } else {
            existingData.treats.push({
              name: entry.treatName,
              count: entry.number
            });
          }
        } else {
          acc.push({
            date: parseISO(entry.date),
            treats: [{
              name: entry.treatName,
              count: entry.number
            }]
          })
        }
        return acc;
      }, []).map((entry) => ({
        date: entry.date,
        beer: entry.treats.find(t => t.name === 'Beer')?.count || 0,
        candy: entry.treats.find(t => t.name === 'Candy')?.count || 0
      }));
      setData(formattedData);
    }
  }, [user]);

  const beerColor = '#6C63FF';
  const candyColor = '#FF6F91';

  return (
    <VictoryChart>
      <VictoryAxis
        tickValues={data.map((entry) => entry.date)}
        tickFormat={(date) => format(date, 'MMM d')}
        style={{
          tickLabels: {
            fontSize: 10,
          },
        }}
      />
      <VictoryAxis dependentAxis />
      <VictoryGroup offset={20}>
        <VictoryBar
          data={data}
          x="date"
          y="beer"
          style={{ data: { fill: beerColor } }}
          labels={({ datum }) => datum.beer === 0 ? '' : datum.beer}
          labelComponent={<VictoryLabel dy={10} />}
        />
        <VictoryBar
          data={data}
          x="date"
          y="candy"
          style={{ data: { fill: candyColor } }}
          labels={({ datum }) => datum.candy === 0 ? '' : datum.candy}
          labelComponent={<VictoryLabel dy={10} />}
        />
      </VictoryGroup>
    </VictoryChart>
  );
};

export default Graph2;

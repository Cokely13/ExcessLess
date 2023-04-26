import React, { useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryGroup } from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';
import { format, parseISO } from 'date-fns';
import { noData } from 'pg-protocol/dist/messages';

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
        candy: entry.treats.find(t => t.name === 'Candy')?.count || 0,
        wine: entry.treats.find(t => t.name === 'Wine')?.count || 0,
        donut: entry.treats.find(t => t.name === 'Donut')?.count || 0,
        soda: entry.treats.find(t => t.name === 'Soda')?.count || 0,
        cake: entry.treats.find(t => t.name === 'Cake')?.count || 0,
        hardliquor: entry.treats.find(t => t.name === 'Hard Liquor')?.count || 0,
        potatochips: entry.treats.find(t => t.name === 'Potato Chips')?.count || 0,

      }));
      setData(formattedData);
    }
  }, [user]);

  const beerColor = '#6C63FF';
  const candyColor = '#FF6F91';
  const sodaColor = '#00FF00';
  const hardLiquorColor = '#8A2BE2'
  const cakeColor = '#FFA500'
  const donutColor = '#FFFF00'
  const potatoChipsColor = '#40E0D0'
  const wineColor = '#00008B'

  console.log('data', data)

  return (
    <VictoryChart
>
      <VictoryAxis
        tickValues={data.map((entry) => entry.date).sort((a, b) => a - b)}
        tickFormat={(date) => format( date, 'M/d')}
        style={{
          tickLabels: {
            fontSize: 5,
          },
        }}
      />
      <VictoryAxis dependentAxis />
      <VictoryGroup offset={5} >
        <VictoryBar
          data={data}
          x="date"
          y="beer"
          style={{ data: { fill: beerColor, width: 4, alignment: "middle" } }}
          labels={({ datum }) => datum.beer === 0 ? '' : datum.beer}
          labelComponent={<VictoryLabel dy={0} style={{ fontSize: 4 }} />}
        />
        <VictoryBar
          data={data}
          x="date"
          y="candy"
          style={{ data: { fill: candyColor, width: 4, alignment: "middle" } }}
          labels={({ datum }) => datum.candy === 0 ? '' : datum.candy}
          labelComponent={<VictoryLabel dy={0} style={{ fontSize: 4 }}/>}
        />
        <VictoryBar
          data={data}
          x="date"
          y="wine"
          style={{ data: { fill: wineColor, width: 4, alignment: "middle" } }}
          labels={({ datum }) => datum.wine === 0 ? '' : datum.wine}
          labelComponent={<VictoryLabel dy={0} style={{ fontSize: 4 }} />}
        />
        <VictoryBar
          data={data}
          x="date"
          y="cake"
          style={{ data: { fill: cakeColor, width: 4, alignment: "middle" } }}
          labels={({ datum }) => datum.cake === 0 ? '' : datum.cake}
          labelComponent={<VictoryLabel dy={0} style={{ fontSize: 4 }} />}
        />
        <VictoryBar
          data={data}
          x="date"
          y="donut"
          style={{ data: { fill: donutColor, width: 4, alignment: "middle" } }}
          labels={({ datum }) => datum.donut === 0 ? '' : datum.donut}
          labelComponent={<VictoryLabel dy={0} style={{ fontSize: 4 }} />}
        />
        <VictoryBar
          data={data}
          x="date"
          y="soda"
          style={{ data: { fill: sodaColor, width: 5, alignment: "middle" } }}
          labels={({ datum }) => datum.soda === 0 ? '' : datum.soda}
          labelComponent={<VictoryLabel dy={0} style={{ fontSize: 4 }} />}
        />
      </VictoryGroup>
    </VictoryChart>
  );
};

export default Graph2;

import React, { useState, useEffect } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
      const formattedData = user.entries.map((entry) => ({
        date: new Date(entry.date),
        treats: entry.number,
      }));
      setData(formattedData);
    }
  }, [user]);

  return (
    <VictoryChart>
      <VictoryAxis
        tickValues={data.map((entry) => entry.date)}
        tickFormat={(date) => format(date, 'MMM d')}
        style={{
          tickLabels: {
            fontSize: 10, // change this value to adjust the font size of the x-axis labels
          },
        }}
      />
      <VictoryAxis dependentAxis />
      <VictoryBar data={data} x="date" y="treats" />
    </VictoryChart>
  );
};

export default Graph;

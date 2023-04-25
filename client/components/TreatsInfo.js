import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PieChart from './PieChart';
import { fetchSingleUser } from '../store/singleUserStore';

const TreatsInfo = () => {
  const dispatch = useDispatch();
  const {id} = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);
  const [showChart, setShowChart] = useState(false)

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])

  const handleShowChart = () => {
    setShowChart(true)
  }



    console.log("user", user)

    const entries = user.entries

    return (
      <div>
        <h1>{user && user.username}'s Treats</h1>
        <button onClick={handleShowChart
    }>Show Chart</button>
    <div>
   {showChart ?
         <PieChart entries={entries} total={user.entries
    .reduce(
      (acc, curr) =>
        acc + parseFloat((curr.cals * curr.number) / 3500),
      0
    )
    .toFixed(2)} names=  {[...new Set(user.entries.map(entry => entry.treatName))]} treatCals = {entries.reduce((acc, entry) => {
      if (entry.treatName in acc) {
        acc[entry.treatName] += entry.cals;
      } else {
        acc[entry.treatName] = entry.cals;
      }
      return acc;
    }, {})} treatNumber = {entries.reduce((acc, entry) => {
      if (entry.treatName in acc) {
        acc[entry.treatName] += entry.number;
      } else {
        acc[entry.treatName] = entry.number;
      }
      return acc;
    }, {})}   /> :<div></div>}
      </div>
      </div>
    );
};

export default TreatsInfo;

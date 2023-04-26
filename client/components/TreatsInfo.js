import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PieChart from './PieChart';
import { fetchSingleUser } from '../store/singleUserStore';

const TreatsInfo = () => {
  const dispatch = useDispatch();
  const {id} = useSelector((state) => state.auth);
  const user = useSelector((state) => state.singleUser);
  const [showChart, setShowChart] = useState(false)
  const [showDate, setShowDate] = useState("")

  useEffect(() => {
    dispatch(fetchSingleUser(id))
    // Safe to add dispatch to the dependencies array
  }, [])

  const handleShowChart = () => {
    setShowChart(true)
  }

  const handleShowDate = (event) => {
    setShowDate(event.target.value)

    // console.log("value", showDate)
  }


    const entries = user.entries
    console.log("entries", entries)



    return (
      <div>
        <h1>{user && user.username}'s Treats</h1>
        <button onClick={handleShowChart
    }>Show Chart</button>
    <div>

   {showChart ?
   <div>
     <select onChange={handleShowDate}>
     <option  value="">All</option>
     {[...new Set(entries.map(entry => entry.date))].map(date => (
       <option key={date} value={date}>{date}</option>
     ))}
   </select>
   <h1>{showDate? showDate : "All"}</h1>
         <PieChart  treatCals = {showDate? entries.filter(entry => entry.date == showDate).reduce((acc, entry) => {
          if (entry.treatName in acc) {
            acc[entry.treatName] += entry.cals * entry.number;
          } else {
            acc[entry.treatName] = entry.cals * entry.number;
          }
          return acc;
        }, {}) : entries.reduce((acc, entry) => {
          if (entry.treatName in acc) {
            acc[entry.treatName] += entry.cals * entry.number;
          } else {
            acc[entry.treatName] = entry.cals * entry.number;
          }
          return acc;
        }, {})}
        treatNumber = {showDate? entries.filter(entry => entry.date == showDate).reduce((acc, entry) => {
      if (entry.treatName in acc) {
        acc[entry.treatName] += entry.number;
      } else {
        acc[entry.treatName] = entry.number;
      }
      return acc;
    }, {}):entries.reduce((acc, entry) => {
      if (entry.treatName in acc) {
        acc[entry.treatName] += entry.number;
      } else {
        acc[entry.treatName] = entry.number;
      }
      return acc;
    }, {}) }  /> </div>:<div></div>}
      </div>
      </div>
    );
};

export default TreatsInfo;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTreats } from '../store/allTreatsStore';
import { createWeek } from '../store/allWeeksStore';

function Treats() {
  const dispatch = useDispatch();
  const allTreats = useSelector((state) => state.allTreats);
  const {id} = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTreats());
  }, []);

  const [dailyValues, setDailyValues] = useState({});

  const handleDailyChange = (event, id) => {
    const value = event.target.value;
    setDailyValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  console.log('daily', dailyValues)
  console.log('id', id)

  const calculateDailyLbs = (cals, daily) => {
    const dailyLbs = (cals * daily) / 3500;
    return dailyLbs.toFixed(2);
  };

  const calculateWeeklyLbs = (dailyLbs) => {
    const weeklyLbs = dailyLbs / 7;
    return weeklyLbs.toFixed(2);
  };

  const dailyValuesArray = Object.values(dailyValues);
  const dailyLbsArray = allTreats.map(
    (treat) => dailyValues[treat.id] * (treat.cals / 3500)
  );
  const weeklyLbsArray = dailyLbsArray.map((dailyLbs) => dailyLbs / 7);

  const totalDaily = dailyValuesArray.reduce((acc, curr) => {
    return acc + parseFloat(curr);
  }, 0);
  const totalDailyLbs = dailyLbsArray.reduce((acc, curr) => {
    return isNaN(curr) ? acc : acc + parseFloat(curr);
  }, 0);
  const totalWeeklyLbs = weeklyLbsArray.reduce((acc, curr) => {
    return isNaN(curr) ? acc : acc + parseFloat(curr);
  }, 0);

  const handleSubmit = async () => {
    allTreats.forEach((treat) => {
      const quantity = dailyValues[treat.id];
      if (quantity > 0) {
        dispatch(createWeek({ userId: id, treatId: treat.id, treatName: treat.name,cals: treat.cals,
          size: treat.size,  number: quantity }));
      }
    });

    await dispatch(fetchTreats());
    setDailyValues({});
  };

  return (
    <div>
      <h2>Treats</h2>
      <table className="treats-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Calories</th>
            <th>Size</th>
            <th>Weekly</th>
            <th>WeeklyLbs</th>
            <th>DailyLbs</th>
          </tr>
        </thead>
        <tbody>
          {allTreats.map((treat) => (
            <tr key={treat.id}>
              <td className="table-cell">{treat.name}</td>
              <td className="table-cell">{treat.cals}</td>
              <td className="table-cell">{treat.size}</td>
              <td className="table-cell">
                <select
                  className="table-dropdown"
                  value={dailyValues[treat.id] || '0'}
                  onChange={(event) => handleDailyChange(event, treat.id)}
                >
                  <option value=""></option>
                  {Array.from({ length: 99 }, (_, i) => i).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </td>
              <td className="table-cell">
                {dailyValues[treat.id]
                  ? calculateDailyLbs(treat.cals, dailyValues[treat.id])
                  : '0.00'}
              </td>
              <td className="table-cell">
                {dailyValues[treat.id]
                  ? calculateWeeklyLbs(
                      calculateDailyLbs(treat.cals, dailyValues[treat.id])
                    )
                  : '0.00'}
              </td>
            </tr>
          ))}
          <tr>
            <td className="table-cell totals-cell">Totals:</td>
            <td className="table-cell totals-cell"></td>
            <td className="table-cell totals-cell"></td>
            <td className="table-cell totals-cell">
              {totalDaily.toFixed(2)}
            </td>
            <td className="table-cell totals-cell">
              {totalDailyLbs.toFixed(2)}
            </td>
            <td className="table-cell totals-cell">
              {totalWeeklyLbs.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
      <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
                  }


export default Treats

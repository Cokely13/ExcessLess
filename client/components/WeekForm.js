import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWeek } from '../store/allWeeksStore';
import { fetchTreats } from '../store/allTreatsStore';

function WeekForm() {
  const dispatch = useDispatch();
  const allTreats = useSelector((state) => state.allTreats);

  useEffect(() => {
    dispatch(fetchTreats());
  }, []);

  const [weeklyValues, setWeeklyValues] = useState(
    allTreats.reduce((acc, treat) => {
      acc[treat.id] = 0;
      return acc;
    }, {})
  );

  const handleWeeklyChange = (event, id) => {
    const value = event.target.value;
    setWeeklyValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const weeklyEntries = allTreats.map((treat) => ({
      treatId: treat.id,
      weeklyQuantity: weeklyValues[treat.id],
      weeklyWeightLoss: calculateWeeklyLbs(
        calculateDailyLbs(treat.cals, weeklyValues[treat.id])
      ),
    }));
    const totalWeeklyWeightLoss = weeklyEntries.reduce(
      (acc, entry) => acc + parseFloat(entry.weeklyWeightLoss),
      0
    );
    dispatch(
      createWeek({
        entries: weeklyEntries,
        totalWeeklyWeightLoss: totalWeeklyWeightLoss.toFixed(2),
      })
    );
  };

  const calculateDailyLbs = (cals, daily) => {
    const dailyLbs = (cals * daily) / 3500;
    return dailyLbs.toFixed(2);
  };

  const calculateWeeklyLbs = (dailyLbs) => {
    const weeklyLbs = dailyLbs / 7;
    return weeklyLbs.toFixed(2);
  };

  return (
    <div>
      <h2>Enter Weekly Treat Quantities</h2>
      <form onSubmit={handleSubmit}>
        <table className="treats-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {allTreats.map((treat) => (
              <tr key={treat.id}>
                <td className="table-cell">{treat.name}</td>
                <td className="table-cell">
                  <input
                    type="number"
                    value={weeklyValues[treat.id]}
                    onChange={(event) => handleWeeklyChange(event, treat.id)}
                    min="0"
                    max="99"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default WeekForm;

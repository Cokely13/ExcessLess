import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTreats } from '../store/allTreatsStore';
import { createEntry } from '../store/allEntriesStore';

function Treats() {
  const dispatch = useDispatch();
  const allTreats = useSelector((state) => state.allTreats);
  const { id } = useSelector((state) => state.auth);

  const [selectedWeek, setSelectedWeek] = useState('');

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
        dispatch(
          createEntry({
            userId: id,
            treatId: treat.id,
            treatName: treat.name,
            cals: treat.cals,
            size: treat.size,
            number: quantity,
            date: selectedWeek,
          })
        );
      }
    });

    await dispatch(fetchTreats());
    setDailyValues({});
  };

  function getWeekOptions() {
    const startDate = new Date('2023-04-23');
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0);
    const options = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      const sunday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
      options.push(sunday.toISOString().substring(0, 10));
      currentDate.setDate(currentDate.getDate() + 7);
    }
    return options;
  }

  const weekOptions = getWeekOptions();

  return (
    <div>
      <h2>Treats</h2>
      <label htmlFor="week-select">Select Week:</label>
      <select
        id="week-select"
        value={selectedWeek}
        onChange={(event) => setSelectedWeek(event.target.value)}
      >
        <option value=""></option>
        {weekOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
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

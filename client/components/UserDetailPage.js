import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';

function UserDetailPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.singleUser);
  const [showEntries, setShowEntries] = useState(false);
  const [showWeek, setShowWeek] = useState(false);
  const [showTotal, setShowTotal] = useState(false);


  console.log('user', user)

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch, userId]);

  const entries = user.entries

  const handleShowEntries = () => {
    setShowEntries(!showEntries);
    setShowWeek("")
  };

  const handleShowWeek = (date) => {
    setShowWeek(date)
  };

  const handleShowTotal = () => {
    setShowTotal(!showTotal)
  };

  return (
    <div className="user-detail-page">
      <div className="user-header">
        <div className="user-info">
          {user ? (
            <>
              <h1 className="user-name">{user.username}</h1>
              {user.entries ? (
                <div>
               <p className="user-entries">
                  Number of entries: {user.entries.length}
                </p>
                {!showTotal ? <button onClick={handleShowTotal}>Show Total</button> : <button onClick={handleShowTotal}>Hide Total</button>}
                {showTotal ? (     <div> Total Lbs:  {user.entries
                  .reduce(
                    (acc, curr) =>
                      acc + parseFloat((curr.cals * curr.number) / 3500),
                    0
                  )
                  .toFixed(2)}</div>) : <div></div>}
                  </div>
              ) : (
                <div></div>
              )}
              {!showEntries ? <button onClick={handleShowEntries}>Show Entries</button> : <button onClick={handleShowEntries}>Hide Entries</button>}
            </>
          ) : (
            <div className="loading-message">Loading...</div>
          )}
        </div>
      </div>
      {showEntries && (
          <div className="entry-date-list">
            <h3>Entries by Date</h3>
            { (Array.from(new Set(user.entries.map((entry => entry.date))))).map((date) => (
              <button key={date} onClick={() => handleShowWeek(date)}>{date}</button>
            ))}
          </div>
                )}
          {showWeek && (
          <div className="entries-container">
          <table className="entries-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Treat</th>
                <th>Quantity</th>
                <th>Cals</th>
                <th>DailyLbs</th>
                <th>WeeklyLbs</th>
              </tr>
            </thead>
            <tbody>
              {user.entries.filter(entry => entry.date == showWeek).map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.date}</td>
                  <td>{entry.treatName}</td>
                  <td>{entry.number}</td>
                  <td>{entry.cals}</td>
                  <td>{(((entry.cals * entry.number)/3500)/7).toFixed(2)}</td>
                  <td>{((entry.cals * entry.number)/3500).toFixed(2)}</td>
                </tr>
              ))}
              <tr>      <td>Totals</td>
                  <td></td>
                  <td>{user.entries.filter(entry => entry.date == showWeek).reduce(
    (acc, curr) => acc + parseFloat(curr.number),
   0)}</td>
                  <td> {user.entries.filter(entry => entry.date == showWeek).reduce(
    (acc, curr) => acc + parseFloat(curr.cals),
   0)}</td>
                  <td>   {user.entries
      .filter((entry) => entry.date === showWeek)
      .reduce(
        (acc, curr) =>
          acc + parseFloat(((curr.cals * curr.number) / 3500) / 7),
        0
      )
      .toFixed(2)}</td>
                  <td>   {user.entries
      .filter((entry) => entry.date === showWeek)
      .reduce(
        (acc, curr) =>
          acc + parseFloat((curr.cals * curr.number) / 3500),
        0
      )
      .toFixed(2)}</td>
                  </tr>
            </tbody>
          </table>
        </div>)}
    </div>
  );
}

export default UserDetailPage;

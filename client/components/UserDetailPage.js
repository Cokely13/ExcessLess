import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';

function UserDetailPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.singleUser);
  const [showEntries, setShowEntries] = useState(false);
  const [uniqueDates, setUniqueDates] = useState([]);

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch, userId]);

  const entries = user.entries
  // const uniqueIds = [...new Set(entries.map(item => item.date))];

  // const unique = user ? user.entries ? Array.from(new Set(user.entries.map(entry => entry.date))) : 0 : 0

  console.log('et', entries)

  console.log("check", typeof entries)

  // const unique = entries ? Array.from(new Set(entries.map(entry => entry.date))) : 0




  const handleShowEntries = () => {
    setShowEntries(!showEntries);
  };

  return (
    <div className="user-detail-page">
      <div className="user-header">
        <div className="user-info">
          {user ? (
            <>
              <h1 className="user-name">{user.username}</h1>
              {user.entries ? (
                <p className="user-entries">
                  Number of entries: {user.entries.length}
                </p>
              ) : (
                <div></div>
              )}
              <button onClick={handleShowEntries}>Show Entries</button>
            </>
          ) : (
            <div className="loading-message">Loading...</div>
          )}
        </div>
      </div>
      {showEntries && (
        <div className="entries-container">
          <div className="entry-date-list">
            <h3>Entries by Date</h3>
            { (Array.from(new Set(user.entries.map((entry => entry.date))))).map((date) => (
              <button key={date} onClick={() => console.log(date)}>{date}</button>
            ))}
          </div>
          <table className="entries-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Treat</th>
                <th>Quantity</th>
                <th>Cals</th>
              </tr>
            </thead>
            <tbody>
              {user.entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{new Date(entry.date).toISOString().substring(0, 10)}</td>
                  <td>{entry.treatName}</td>
                  <td>{entry.number}</td>
                  <td>{entry.cals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserDetailPage;

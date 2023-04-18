import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../store/singleUserStore';

function UserDetailPage() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.singleUser);
  const [showEntries, setShowEntries] = useState(false);

  useEffect(() => {
    dispatch(fetchSingleUser(userId));
  }, [dispatch, userId]);

  const handleShowEntries = () => {
    setShowEntries(!showEntries);
  };

  console.log("user", user)

  return (
    <div className="user-detail-page">
      <div className="user-header">
        <div className="user-info">
        {user ?
          <>
          <h1 className="user-name">{user.username}</h1>
         {user.entries ? <p className="user-entries">
            Number of entries: {user.entries.length}
          </p> : <div></div> }
          <button onClick={handleShowEntries}>Show Entries</button>
          </>
          : (
            <div className="loading-message">Loading...</div>
          )}
        </div>
      </div>
      {showEntries && (
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
                <td>{entry.date}</td>
                <td>{entry.treatName}</td>
                <td>{entry.number}</td>
                <td>{entry.cals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserDetailPage;

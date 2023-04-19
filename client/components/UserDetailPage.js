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
                  <td>{entry.number}</td>
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
                  <td>0</td>
                  <td>0</td>
                  <td>0</td></tr>
            </tbody>
          </table>
        </div>)}
    </div>
  );
// function UserDetailPage() {
//   const dispatch = useDispatch();
//   const { userId } = useParams();
//   const user = useSelector((state) => state.singleUser);
//   const [showEntries, setShowEntries] = useState(false);
//   const [showWeek, setShowWeek] = useState(false);

//   useEffect(() => {
//     dispatch(fetchSingleUser(userId));
//   }, [dispatch, userId]);

//   const entries = user.entries;

//   const handleShowEntries = () => {
//     setShowEntries(!showEntries);
//     setShowWeek("");
//   };

//   const handleShowWeek = (date) => {
//     setShowWeek(date);
//     console.log("date", date);
//   };

//   // calculate the total of Quantity and Cals columns
//   const totalQuantity = entries.reduce(
//     (acc, curr) => acc + parseFloat(curr.number),
//     0
//   );
//   const totalCals = entries.reduce(
//     (acc, curr) => acc + parseFloat(curr.cals),
//     0
//   );

//   // calculate the WeeklyLbs value for the selected week
//   const weeklyLbs =
//     (entries
//       .filter((entry) => entry.date === showWeek)
//       .reduce(
//         (acc, curr) => acc + parseFloat(curr.number) * parseFloat(curr.cals),
//         0
//       ) /
//       3500)
//       .toFixed(2) || 0;

//       return (
//         <div className="user-detail-page">
//           <div className="user-header">
//             <div className="user-info">
//               {user ? (
//                 <>
//                   <h1 className="user-name">{user.username}</h1>
//                   {user.entries ? (
//                     <p className="user-entries">
//                       Number of entries: {user.entries.length}
//                     </p>
//                   ) : (
//                     <div></div>
//                   )}
//                   {!showEntries ? (
//                     <button onClick={handleShowEntries}>Show Entries</button>
//                   ) : (
//                     <button onClick={handleShowEntries}>Hide Entries</button>
//                   )}
//                 </>
//               ) : (
//                 <div className="loading-message">Loading...</div>
//               )}
//             </div>
//           </div>
//           {showEntries && (
//             <div className="entries-container">
//               <div className="entry-date-list">
//                 <h3>Entries by Date</h3>
//                 {Array.from(new Set(entries.map((entry) => entry.date))).map(
//                   (date) => (
//                     <button
//                       key={date}
//                       onClick={() => handleShowWeek(date)}
//                     >{date}</button>
//                   )
//                 )}
//               </div>
//               <table className="entries-table">
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Treat</th>
//                     <th>Quantity</th>
//                     <th>Cals</th>
//                     <th>Totals</th>
//                     <th>WeeklyLbs</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {entries
//                     .filter((entry) => (showWeek ? entry.date === showWeek : true))
//                     .map((entry) => (
//                       <tr key={entry.id}>
//                         <td>{entry.date}</td>
//                         <td>{entry.treatName}</td>
//                         <td>{entry.number}</td>
//                         <td>{entry.cals}</td>
//                         <td></td>
//                         <td>
//                           {(parseFloat(entry.number) * parseFloat(entry.cals) / 3500).toFixed(2)}
//                         </td>
//                       </tr>
//                     ))}
//                   <tr>
//                     <td colSpan="2">Totals</td>
//                     <td>{totalQuantity}</td>
//                     <td>{totalCals}</td>
//                     <td></td>
//                     <td>{(weeklyLbs > 0 ? weeklyLbs : 0)}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       );

}

export default UserDetailPage;

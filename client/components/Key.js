import React from 'react';

const Key = ({ colors }) => {
  return (
    <div style={{ display: 'flex', marginBottom: '10px' }}>
      {Object.entries(colors).map(([treat, color]) => (
        <div key={treat} style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <div style={{ width: '10px', height: '10px', backgroundColor: color, marginRight: '5px' }}></div>
          <div>{treat}</div>
        </div>
      ))}
    </div>
  );
};

export default Key;

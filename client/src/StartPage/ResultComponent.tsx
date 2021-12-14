import React, { useState } from 'react';

import 'rsuite/dist/rsuite.min.css';

function ResultComponent() {
  let trains = [
    {
      time: '09:00 - 11:00',
      changes: '0',
      price: '200:-',
    },
    {
      time: '12:00 - 17:00',
      changes: '1',
      price: '350:-',
    },
    {
      time: '14:00 - 16:00',
      changes: '0',
      price: '400:-',
    },
    {
      time: '18:00 - 21:00',
      changes: '0',
      price: '500:-',
    },
    {
      time: '22:00 - 06:00',
      changes: '2',
      price: '800:-',
    },
  ];

  return (
    <div id='searchResults'>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th>Tid</th>
            <th>Byten</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {trains.map(({ time, changes, price }) => (
            <tr>
              <td>{time}</td>
              <td>{changes}</td>
              <td>{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultComponent;

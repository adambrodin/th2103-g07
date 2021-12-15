import React, { useState } from 'react';

import 'rsuite/dist/rsuite.min.css';

function ResultComponent() {
  let lastSelectedTrip: HTMLElement | null = null;

  let trains = [
    {
      time: '09:00 - 11:00',
      changes: '0',
      price: '200:-',
      id: '1',
    },
    {
      time: '12:00 - 17:00',
      changes: '1',
      price: '350:-',
      id: '2',
    },
    {
      time: '14:00 - 16:00',
      changes: '0',
      price: '400:-',
      id: '3',
    },
    {
      time: '18:00 - 21:00',
      changes: '0',
      price: '500:-',
      id: '4',
    },
    {
      time: '22:00 - 06:00',
      changes: '2',
      price: '800:-',
      id: '5',
    },
  ];

  function getTicket(id: string) {
    // Get train object from id

    let currentTrip = document.getElementById(id);
    if (lastSelectedTrip != null) {
      lastSelectedTrip.classList.remove('selectedTicket');
    }
    if (currentTrip != null) {
      currentTrip.classList.add('selectedTicket');
    }
    lastSelectedTrip = currentTrip;
  }

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
          {trains.map(({ time, changes, price, id }) => (
            <tr onClick={() => getTicket(id)} id={id}>
              <td>{time}</td>
              <td>{changes}</td>
              <td>{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='col'>
        <button id='continueButton' className='btn btn-success float-right'>
          Fortsätt
        </button>
      </div>
    </div>
  );
}

export default ResultComponent;

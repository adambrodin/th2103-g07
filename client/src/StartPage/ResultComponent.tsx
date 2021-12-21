import React, { useEffect } from "react";
import moment from "moment";
import "rsuite/dist/rsuite.min.css";

function ResultComponent(data: any) {
  let lastSelectedDepartTrip: HTMLElement | null = null;
  let lastSelectedReturnTrip: HTMLElement | null = null;
  // useEffect(() => {
  //   ToggleSearchContainer();
  // }, []);

  function ToggleSearchContainer() {
    let x = document.getElementById("SearchContainer");
    let y = document.getElementById("searchResults");
    let z = document.getElementById("backButton");
    if (x != null && y != null && z != null) {
      if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
        z.style.display = "none";
      } else {
        x.style.display = "none";
        y.style.display = "block";
        z.style.display = "block";
      }
    }
  }

  function getTicket(DepartId: string, returnId: string) {
    // Get train object from id

    let currentDepartTrip = document.getElementById(DepartId);
    let currentReturnTrip = document.getElementById(returnId);

    if (lastSelectedDepartTrip != null && currentDepartTrip != null) {
      lastSelectedDepartTrip.classList.remove("selectedTicket");
    }
    if (lastSelectedReturnTrip != null && currentReturnTrip != null) {
      lastSelectedReturnTrip.classList.remove("selectedTicket");
    }

    if (currentDepartTrip != null) {
      currentDepartTrip.classList.add("selectedTicket");
    }
    if (currentReturnTrip != null) {
      currentReturnTrip.classList.add("selectedTicket");
    }

    if (currentDepartTrip != null) {
      lastSelectedDepartTrip = currentDepartTrip;
    }
    if (currentReturnTrip != null) {
      lastSelectedReturnTrip = currentReturnTrip;
    }
  }

  return (
    <div id="searchResults">
      <h2>Utresa</h2>
      <p>
        {data.requestData.departure.location} -{" "}
        {data.requestData.arrival.location}
      </p>
      <p>{moment(data.requestData.departure.time).format("Do MMMM YYYY")}</p>
      <table id="departTrip" className="table">
        <thead className="thead-dark">
          <tr>
            <th>Tid</th>
            <th>Byten</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {data.trips[0].outboundTrip.map((trip: any) => (
            <tr
              onClick={() => getTicket(trip.train.id, "")}
              id={trip.train.id}
              key={trip.train.id}
            >
              <td>
                {moment(trip.departure.time).format("hh:mm")} -{" "}
                {moment(trip.arrival.time).format("hh:mm")}
              </td>
              <td>0</td>
              <td>Pris</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.returnTrip ? (
        <>
          <h2>Återresa</h2>
          <p>
            {data.requestData.returnDeparture.location} -{" "}
            {data.requestData.returnArrival.location}
          </p>
          <p>
            {moment(data.requestData.returnDeparture.time).format(
              "Do MMMM YYYY"
            )}
          </p>
          <table id="returnTrip" className="table">
            <thead className="thead-dark">
              <tr>
                <th>Tid</th>
                <th>Byten</th>
                <th>Pris</th>
              </tr>
            </thead>
            <tbody>
              {data.trips[0].returnTrip.map((trip: any) => (
                <tr
                  onClick={() => getTicket(trip.train.id, "")}
                  id={trip.train.id}
                  key={trip.train.id}
                >
                  <td>
                    {moment(trip.departure.time).format("hh:mm")} -{" "}
                    {moment(trip.arrival.time).format("hh:mm")}
                  </td>
                  <td>0</td>
                  <td>Pris</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <></>
      )}
      <div className="col">
        <button id="continueButton" className="btn btn-success float-right">
          Fortsätt
        </button>
      </div>
    </div>
  );
}

export default ResultComponent;

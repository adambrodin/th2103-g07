import "rsuite/dist/rsuite.min.css";

function ResultComponent(returnTrip: any) {
  let lastSelectedDepartTrip: HTMLElement | null = null;
  let lastSelectedReturnTrip: HTMLElement | null = null;

  let trains = [
    {
      time: "09:00 - 11:00",
      changes: "0",
      price: "200:-",
      id: "1",
    },
    {
      time: "12:00 - 17:00",
      changes: "1",
      price: "350:-",
      id: "2",
    },
    {
      time: "14:00 - 16:00",
      changes: "0",
      price: "400:-",
      id: "3",
    },
    {
      time: "18:00 - 21:00",
      changes: "0",
      price: "500:-",
      id: "4",
    },
    {
      time: "22:00 - 06:00",
      changes: "2",
      price: "800:-",
      id: "5",
    },
  ];

  let trains2 = [
    {
      time: "09:00 - 11:00",
      changes: "0",
      price: "200:-",
      id: "11",
    },
    {
      time: "12:00 - 17:00",
      changes: "1",
      price: "350:-",
      id: "22",
    },
    {
      time: "14:00 - 16:00",
      changes: "0",
      price: "400:-",
      id: "33",
    },
    {
      time: "18:00 - 21:00",
      changes: "0",
      price: "500:-",
      id: "44",
    },
    {
      time: "22:00 - 06:00",
      changes: "2",
      price: "800:-",
      id: "55",
    },
  ];

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
      <p>Station1 - station2</p>
      <p>Datum</p>
      <table id="departTrip" className="table">
        <thead className="thead-dark">
          <tr>
            <th>Tid</th>
            <th>Byten</th>
            <th>Pris</th>
          </tr>
        </thead>
        <tbody>
          {trains.map(({ time, changes, price, id }) => (
            <tr onClick={() => getTicket(id, "")} id={id}>
              <td>{time}</td>
              <td>{changes}</td>
              <td>{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {returnTrip ? (
        <>
          <h2>Återresa</h2>
          <p>Station1 - station2</p>
          <p>Datum</p>
          <table id="returnTrip" className="table">
            <thead className="thead-dark">
              <tr>
                <th>Tid</th>
                <th>Byten</th>
                <th>Pris</th>
              </tr>
            </thead>
            <tbody>
              {trains2.map(({ time, changes, price, id }) => (
                <tr onClick={() => getTicket("", id)} id={id}>
                  <td>{time}</td>
                  <td>{changes}</td>
                  <td>{price}</td>
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

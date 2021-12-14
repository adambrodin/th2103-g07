import { DatePicker } from 'rsuite';
import React, { useState } from 'react';
import SearchConponent from './SearchConponent';


import "rsuite/dist/rsuite.min.css";

function StartPage() {
  const [returnTrip, setReturnTrip] = useState(false);

  function submitForm(event: any){
    event.preventDefault();

    let data = {from: event.target[0].value,
    to: event.target[1].value,
    fromDate: event.target[3].value,
    toDate: event.target[4].value}

    fetch("POst URL",{
      method:'POST',
      headers: {'Content-Type': 'application/json'} ,
      body: JSON.stringify(data)
    }).then(res => {
      console.log("sucsess")
      ToggleSearchContainer();
    })
  }

  function ToggleSearchContainer() {
    let x = document.getElementById("SearchContainer");
    let y = document.getElementById("searchResults");
    if (x != null && y != null){
      if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "none";
      } else {
        x.style.display = "none";
        y.style.display = "block";
      }
    }
  }

  return (
      <div className='container text-center'>
        <div className='row'>
          <h1>Tåg bokningssystem - Group 7</h1>
        </div>
        <div id="SearchContainer" className="row mt-5">
            <h2>Hej, Vart vill du resa?</h2>
            <div className='justify-content-center'>
            <form action="post" onSubmit={(event) => submitForm(event)}>
              <div className='form-row'>
                <div className="form-group col-md-8 mx-auto">
                  <div id="startForm" className="input-group"> 
                    <label className="input-group-text" htmlFor="fromDestination">Från</label>
                    <input id="fromDestination" className="form-control" type="text" />
                    <label className="input-group-text" htmlFor="toDestination">Till</label>
                    <input id="toDestination" className="form-control" type="text" />
                  </div>
                </div>
              </div>
              <div className='form-row'>
                <div className="form-group col-md-8 mx-auto">
                  <div className="form-check form form-check-inline">
                  <label className="form-check-lable" htmlFor="returnTrip">Åter resa</label>
                  <input className="form-check-input"type="checkbox" name="returnTrip" id="returnTrip" onChange={() => setReturnTrip(!returnTrip)}/>
                  </div>
                  <div id="timeSelectContainer">
                    {returnTrip ? 
                      <>
                        <DatePicker format="yyyy-MM-dd HH:mm" placeholder="Avgångs tid"/> 
                        <DatePicker format="yyyy-MM-dd HH:mm" placeholder="Ankomst tid"/>
                      </>: 
                        <DatePicker format="yyyy-MM-dd HH:mm" placeholder="Avgångs tid"/>
                    }
                  </div>
                  <input className="btn btn-primary mt-2" type="submit" value="Sök" />
                </div>
              </div>
            </form>
            </div>
        </div>
        <SearchConponent />
      </div>
  );
}

export default StartPage;

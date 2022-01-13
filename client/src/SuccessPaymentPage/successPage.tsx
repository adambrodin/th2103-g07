import './SuccessPaymentPage.css';

import { useEffect, useRef } from "react";
function SuccessPage() {
  const API_URL =
    process.env.NODE_ENV === "production"
      ? "https://train-booking-function-app.azurewebsites.net/api"
      : process.env.REACT_APP_API_URL;

  // Fetch session_id from URL /success?session_id=${ID}
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );

  let checkoutReceipt = useRef();
  useEffect(() => {
    fetch(API_URL + "/payment/" + sessionId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        checkoutReceipt.current = data.data;
      });
  }, [API_URL, sessionId]);

  return (
      <div className="container">
        <div className="row mt-5">
          <h2 className="text-center font-color">Tack för din bokning!</h2>
        </div>
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="card dark-bg shadow">
              <div className="card-header">
                <h4 className="sec-font-color">Dina bokningsdetaljer</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <p className="sec-font-color"><strong>Datum och tid för avgång:</strong></p>
                    <p className="sec-font-color">2021-01-13 10:00</p>
                    <p className="sec-font-color"><strong>Från: </strong></p>
                    <p className="sec-font-color">Göteborg C</p>
                  </div>
                  <div className="col-lg-6">
                    <p className="sec-font-color"><strong>Datum och tid för ankomst:</strong></p>
                    <p className="sec-font-color">2021-01-13 13:00</p>
                    <p className="sec-font-color"><strong>Till:</strong></p>
                    <p className="sec-font-color">Stockholm Central</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mt-3">
                    <p className="sec-font-color"><strong>Bokningsnummer:</strong></p>
                    <p className="sec-font-color">b844585f-55b1-4000-a95c-e80c31e3e446</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mt-3">
                    <p className="sec-font-color"><strong>Antal platser:</strong></p>
                    <p className="sec-font-color">6 st</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 mt-3">
                    <p className="sec-font-color"><strong>Totalt pris:</strong></p>
                    <p className="sec-font-color">1450 kr</p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-lg-9 mt-3">
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 mt-3">
                    <h4 className="text-center mb-3 sec-font-color">Biljettspecifikation</h4>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-lg-6 mt-3">
                    <div className="card dark-bg shadow">
                      <div className="card-body">
                        <h5 className="text-center sec-font-color mb-3"><strong>Biljett 1</strong></h5>
                        <div className="row">
                          <div className="col-lg-3">
                            <p className="sec-font-color"><strong>Biljettyp:</strong></p>
                            <p className="sec-font-color"><strong>Vagn:</strong></p>
                            <p className="sec-font-color"><strong>Pris:</strong></p>
                          </div>
                          <div className="col-lg-3">
                            <p className="sec-font-color">Adult</p>
                            <p className="sec-font-color">Andra klass</p>
                            <p className="sec-font-color">540  kr</p>
                          </div>
                          <div className="col-lg-3">
                            <p className="sec-font-color"><strong>Förnamn:</strong></p>
                            <p className="sec-font-color"><strong>Efternamn:</strong></p>
                          </div>
                          <div className="col-lg-3">
                            <p className="sec-font-color">Jonas</p>
                            <p className="sec-font-color">Magnusson</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mt-3">
                    <div className="card dark-bg shadow">
                      <div className="card-body">
                        <h5 className="text-center sec-font-color mb-3"><strong>Biljett 1</strong></h5>
                        <div className="row">
                          <div className="col-lg-3">
                            <p className="sec-font-color"><strong>Biljettyp:</strong></p>
                            <p className="sec-font-color"><strong>Vagn:</strong></p>
                            <p className="sec-font-color"><strong>Pris:</strong></p>
                          </div>
                          <div className="col-lg-3">
                            <p className="sec-font-color">Adult</p>
                            <p className="sec-font-color">Andra klass</p>
                            <p className="sec-font-color">540 kr</p>
                          </div>
                          <div className="col-lg-3">
                            <p className="sec-font-color"><strong>Förnamn:</strong></p>
                            <p className="sec-font-color"><strong>Efternamn:</strong></p>
                          </div>
                          <div className="col-lg-3">
                            <p className="sec-font-color">Jonas</p>
                            <p className="sec-font-color">Magnusson</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default SuccessPage;

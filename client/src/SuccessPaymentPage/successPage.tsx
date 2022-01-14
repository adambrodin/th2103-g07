import './SuccessPaymentPage.css';

import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/sv';

const translatedTypes: { [englishType: string]: string } = {
  // Seat Types
  'First Class': 'Första Klass',
  'Second Class': 'Andra Klass',
  'Quiet Cart': 'Tystvagn',
  'Animal Friendly': 'Djurvagn',
  // Ticket Types
  Adult: 'Vuxen',
  Child: 'Barn',
  Student: 'Ungdom/Student',
  Senior: 'Pensionär',
};
function SuccessPage() {
  moment.locale('sv');

  const API_URL =
    process.env.NODE_ENV === 'production'
      ? 'https://train-booking-function-app.azurewebsites.net/api'
      : process.env.REACT_APP_API_URL;

  // Fetch session_id from URL /success?session_id=${ID}
  const sessionId = new URLSearchParams(window.location.search).get(
    'session_id'
  );

  const [receipt, setReceipt] = useState<any>();
  useEffect(() => {
    fetch(API_URL + '/payment/' + sessionId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReceipt(data.data);
      });
  }, [API_URL, sessionId]);

  return (
    <div className="container text-center">
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
                  <p className="sec-font-color">
                    <strong>Datum och tid för avgång:</strong>
                  </p>
                  <p className="sec-font-color">
                    {moment(
                      receipt?.outboundTrip.receipt.booking.departure.date
                    ).format('LLL')}
                  </p>
                  <p className="sec-font-color">
                    <strong>Från: </strong>
                  </p>
                  <p className="sec-font-color">
                    {
                      receipt?.outboundTrip.receipt.booking.arrival
                        .currentStation.locationName
                    }
                  </p>
                </div>
                <div className="col-lg-6">
                  <p className="sec-font-color">
                    <strong>Datum och tid för ankomst:</strong>
                  </p>
                  <p className="sec-font-color">
                    {moment(
                      receipt?.outboundTrip.receipt.booking.arrival.date
                    ).format('LLL')}
                  </p>
                  <p className="sec-font-color">
                    <strong>Till:</strong>
                  </p>
                  <p className="sec-font-color">
                    {
                      receipt?.outboundTrip.receipt.booking.departure
                        .currentStation.locationName
                    }
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 mt-3">
                  <p className="sec-font-color">
                    <strong>Bokningsnummer:</strong>
                  </p>
                  <p className="sec-font-color">
                    {receipt?.outboundTrip.receipt.booking.id}
                  </p>
                </div>
                <div className="col-lg-12 mt-3">
                  <p className="sec-font-color">
                    <strong>Antal platser:</strong>
                  </p>
                  <p className="sec-font-color">
                    {receipt?.outboundTrip.receipt.booking.tickets.length} st
                  </p>
                </div>
              </div>
              <div className="col-lg-12 mt-3">
                <p className="sec-font-color lead">
                  <strong>Totalt pris:</strong>
                </p>
                <p className="sec-font-color lead">
                  {receipt?.outboundTrip.receipt.totalPrice} kr
                </p>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-9 mt-3">
                  <hr />
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12 mt-3">
                  <h4 className="text-center mb-3 sec-font-color">
                    Biljettspecifikation
                  </h4>
                </div>
              </div>

              <div className="tickets">
                {receipt?.outboundTrip.receipt.booking.tickets.map(
                  (ticket, key) => {
                    return (
                      <div
                        className="col-lg-6 mt-3"
                        key={'ticket-' + ticket.id}
                      >
                        <div className="card dark-bg shadow">
                          <div className="card-body">
                            <h5 className="text-center sec-font-color mb-3">
                              <strong>Biljett {key + 1}</strong>
                            </h5>
                            <div className="row">
                              <div className="col-lg-3">
                                <p className="sec-font-color">
                                  <strong>Biljettyp:</strong>
                                </p>
                                <p className="sec-font-color">
                                  <strong>Vagn:</strong>
                                </p>
                                <p className="sec-font-color">
                                  <strong>Pris:</strong>
                                </p>
                              </div>
                              <div className="col-lg-3">
                                <p className="sec-font-color">
                                  {translatedTypes[ticket.type]}
                                </p>
                                <p className="sec-font-color">
                                  {translatedTypes[ticket.seatType]}
                                </p>
                                <p className="sec-font-color">
                                  {ticket.price} kr
                                </p>
                              </div>
                              <div className="col-lg-3">
                                <p className="sec-font-color">
                                  <strong>Förnamn:</strong>
                                </p>
                                <p className="sec-font-color">
                                  <strong>Efternamn:</strong>
                                </p>
                              </div>
                              <div className="col-lg-3">
                                <p className="sec-font-color">
                                  {ticket.firstName}
                                </p>
                                <p className="sec-font-color">
                                  {ticket.lastName}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;

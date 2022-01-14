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
    <div className="container">
      <div className="row mt-5">
        <h2 className="text-center font-color">Tack för din bokning!</h2>
      </div>
      <div className="row mt-5">
        <div className="col-lg-12">
          <div className="card dark-bg shadow">
            <div className="card-header">
              <h4 className="sec-font-color text-center">
                Dina bokningsdetaljer
              </h4>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-lg-4">
                  <h4 className="font-color mb-3">Utresa</h4>
                  <p className="sec-font-color">
                    <strong>Datum och tid för avgång:</strong>
                  </p>
                  <p className="sec-font-color">
                    {moment(
                      receipt?.outboundTrip.receipt.booking.departure.date
                    ).format('LLL')}
                  </p>
                  <p className="sec-font-color">
                    {
                      receipt?.outboundTrip.receipt.booking.arrival
                        .currentStation.locationName
                    }
                  </p>
                </div>
                <div className="col-lg-4">
                  <h4 className="font-color mb-3">Detaljer</h4>
                  <p className="sec-font-color">
                    <strong>Bokningsnummer:</strong>
                  </p>
                  <p className="sec-font-color">
                    {receipt?.outboundTrip.receipt.booking.id}
                  </p>
                  <p className="sec-font-color">
                    <strong>Antal biljetter:</strong>
                  </p>
                  <p className="sec-font-color">
                    {receipt?.outboundTrip.receipt.booking.tickets.length} st
                  </p>
                  <p className="sec-font-color">
                    <strong>Totalt pris:</strong>
                  </p>
                  <p className="sec-font-color">
                    {receipt?.outboundTrip.receipt.totalPrice} kr
                  </p>
                </div>
                <div className="col-lg-4">
                  <h4 className="font-color mb-3">
                    {receipt?.returnTrip != null ? 'Återresa' : ''}
                  </h4>
                  <p className="sec-font-color">
                    <strong>
                      {' '}
                      {receipt?.returnTrip != null
                        ? 'Datum och tid för avgång'
                        : ''}
                    </strong>
                  </p>
                  <p className="sec-font-color">
                    {receipt?.returnTrip != null
                      ? moment(
                          receipt?.returnTrip?.receipt?.booking?.arrival?.date
                        ).format('LLL')
                      : ''}
                  </p>
                  <p className="sec-font-color">
                    {
                      receipt?.returnTrip?.receipt?.booking?.arrival
                        ?.currentStation.locationName
                    }
                  </p>
                </div>
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
                <div className="row mb-4">
                  {receipt?.outboundTrip.receipt.booking.tickets.map(
                    (ticket: any, key: number) => {
                      return (
                        <div className="col-lg-12 mt-3">
                          <div className="card dark-bg shadow">
                            <div className="card-body">
                              <h5 className="text-center sec-font-color mb-3">
                                <strong>
                                  {ticket.firstName} {ticket.lastName}
                                </strong>
                              </h5>
                              <div className="row">
                                <div className="col-lg-6 text-center">
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
                                <div className="col-lg-6 text-center">
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
    </div>
  );
}

export default SuccessPage;

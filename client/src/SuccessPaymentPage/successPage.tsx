function SuccessPage() {
  return (
    <div className="container">
      <div className="row mt-5">
        <h2 className="text-center">Tack för din bokning!</h2>
      </div>
      <div className="row mt-5">
        <div className="col-lg-12">
          <div className="card shadow">
            <div className="card-header">
              <h4>Dina bokningsdetaljer</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <p><strong>Datum och tid för avgång:</strong></p>
                  <p>2021-01-13 10:00</p>
                </div>
                <div className="col-lg-6">
                  <p><strong>Datum och tid för ankomst:</strong></p>
                  <p>2021-01-13 13:00</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mt-3">
                  <p><strong>Bokningsnummer:</strong></p>
                  <p>b844585f-55b1-4000-a95c-e80c31e3e446</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mt-3">
                  <p><strong>Antal platser:</strong></p>
                  <p>6 st</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mt-3">
                  <p><strong>Totalt pris:</strong></p>
                  <p>1450 kr</p>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-9 mt-3">
                  <hr />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 mt-3">
                  <h4 className="text-center mb-3">Biljettspecifikation</h4>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-lg-6 mt-3">
                  <div className="card shadow">
                    <div className="card-body">
                      <h5 className="text-center mb-3"><strong>Biljett 1</strong></h5>
                      <div className="row">
                        <div className="col-lg-3">
                          <p><strong>Biljettyp:</strong></p>
                          <p><strong>Vagn:</strong></p>
                          <p><strong>Pris:</strong></p>
                        </div>
                        <div className="col-lg-3">
                          <p>Adult</p>
                          <p>Andra klass</p>
                          <p>540 kr</p>
                        </div>
                        <div className="col-lg-3">
                          <p><strong>Förnamn:</strong></p>
                          <p><strong>Efternamn:</strong></p>
                        </div>
                        <div className="col-lg-3">
                          <p>Jonas</p>
                          <p>Magnusson</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="card shadow">
                    <div className="card-body">
                      <h5 className="text-center mb-3"><strong>Biljett 1</strong></h5>
                      <div className="row">
                        <div className="col-lg-3">
                          <p><strong>Biljettyp:</strong></p>
                          <p><strong>Vagn:</strong></p>
                          <p><strong>Pris:</strong></p>
                        </div>
                        <div className="col-lg-3">
                          <p>Adult</p>
                          <p>Andra klass</p>
                          <p>540 kr</p>
                        </div>
                        <div className="col-lg-3">
                          <p><strong>Förnamn:</strong></p>
                          <p><strong>Efternamn:</strong></p>
                        </div>
                        <div className="col-lg-3">
                          <p>Jonas</p>
                          <p>Magnusson</p>
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

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
    <div className="container text-center">
      <div className="row">
        <h2>Success</h2>
      </div>
    </div>
  );
}

export default SuccessPage;

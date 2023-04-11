import React from "react";
import { Form, Link, Navigate, useOutletContext } from "react-router-dom";
import Dialog from "../../components/Dialog";

const ReturnSummary = () => {
  if (!useOutletContext().authenticated) return <Navigate to="/user/signin" />;

  const [show, setShow] = React.useState(false);
  const handlePrint = () => {
    setShow(true);
  };

  return (
    <>
      <Dialog
        show={show}
        setShow={setShow}
        title="Demo"
        message="This is a demo. No return label will be printed."
        confirmText="OK"
        handleConfirm={() => {}}
        handleCancel={() => {}}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-4">
            <h1>Return Summary</h1>
            <p>
              Please review your return details. Return to your{" "}
              <Link to="/orders">orders</Link>.
            </p>
            <div className="card p-3">
              <h2>Prepare Your Return</h2>
              <p>
                Please print the prepaid return label below and attach it to
                your package. <br />
                <br />
                <strong>Include all items you wish to return.</strong>
                <br /> You will receive a partial refund for the items we
                receive.
              </p>
              <button
                className="btn btn-primary m-4 mt-2"
                onClick={handlePrint}
              >
                Print Return Label
              </button>
              <p>
                Drop your package off at your nearest UPS location. You can find
                the nearest location{" "}
                <a href="https://www.ups.com/dropoff" target="_blank">
                  here
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnSummary;

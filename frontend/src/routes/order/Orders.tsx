import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Order from "../../components/order/Order";

const Orders = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const message = state?.message || "";
  return (
    <>
      {message && (
        <div className="alert alert-primary" role="alert">
          {message}
        </div>
      )}
      <div className="container">
        <div className="row mt-4">
          <h1>Orders</h1>
          <p>Browse the orders you've placed with us.</p>
          <div className="card p-5">
            <div
              className="accordion accordion-flush rounded"
              id="orderAccordion"
            >
              <Order cartId={1} expanded />
              <Order cartId={2} />
              <Order cartId={3} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;

import React from "react";
import OrderSummary from "./OrderSummary";

interface Props {
  cartId: number;
  expanded?: boolean;
  setReturningOrder: (cartId: number) => void;
  order: Object;
}

const Order = ({ cartId, expanded = false, setReturningOrder, order }: Props) => {
  const handleReturn = () => {
    setReturningOrder(cartId);
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`cartPanelHeader_${cartId}`}>
        <button
          className={`accordion-button ${expanded ? "" : "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#cartPanel_${cartId}`}
          aria-expanded={expanded}
          aria-controls={`cartPanel_${cartId}`}
        >
          {/* If order has an order_status == 2, strikethrough the text */}
          {order.order_status === 2 ? (
            <del>
              <span className="text-muted">Order #{cartId}</span>
            </del>
          ) : (
            <span>Order #{cartId}</span>
          )}
        </button>
      </h2>
      <div
        id={`cartPanel_${cartId}`}
        className={`accordion-collapse collapse ${expanded ? "show" : ""}`}
        aria-labelledby={`cartPanelHeader_${cartId}`}
      >
        <div className="accordion-body">
          {order.order_status === 2 && (
            <span className="badge bg-danger text-light">Returned</span>
          )}
          <OrderSummary cartId={cartId} />
          <ul className="nav justify-content-end gap-2">
            {/* <li className="nav-item">
              <a className="nav-link btn" href="#">
                Get Support
              </a>
            </li> */}
            <li className="nav-item">
              
              {
                order.order_status === 2 ? <></> : (
                  <button className="nav-link btn" onClick={handleReturn}>
                    Return Items
                  </button>
                )
              }
            </li>
            {/* <li className="nav-item">
              <a
                className="nav-link btn btn-danger text-light"
                aria-current="page"
                href="#"
              >
                Cancel Order
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Order;

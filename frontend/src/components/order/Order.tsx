import React from "react";
import OrderSummary from "./OrderSummary";

interface Props {
  cartId: number;
  expanded?: boolean;
}

const Order = ({ cartId, expanded = false }: Props) => {
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
          Order #{cartId}
        </button>
      </h2>
      <div
        id={`cartPanel_${cartId}`}
        className={`accordion-collapse collapse ${expanded ? "show" : ""}`}
        aria-labelledby={`cartPanelHeader_${cartId}`}
      >
        <div className="accordion-body">
          <OrderSummary cartId={cartId} />
          <ul className="nav justify-content-end gap-2">
            {/* <li className="nav-item">
              <a className="nav-link btn" href="#">
                Get Support
              </a>
            </li> */}
            <li className="nav-item">
              <a className="nav-link btn" href="#">
                Return Items
              </a>
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

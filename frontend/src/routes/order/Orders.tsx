import React, { useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Order from "../../components/order/Order";
import Skeleton from "react-loading-skeleton";
import Spinner from "../../components/Spinner";
import { BsCartFill } from "react-icons/bs";
import Dialog from "../../components/Dialog";
import Axios from "axios";

const Orders = () => {
  if (!useOutletContext().authenticated) return <Navigate to="/user/signin" />;

  const navigate = useNavigate();

  const { id } = useParams();
  const { state } = useLocation();
  const message = state?.message || "";

  const [simulatedLoad, setSimulatedLoad] = React.useState(true);

  if (message.length > 0) {
    React.useEffect(() => {
      setTimeout(() => {
        setSimulatedLoad(false);
      }, 1500);
    }, []);
  } else {
    React.useEffect(() => {
      setSimulatedLoad(false);
    }, []);
  }

  // Return items
  const [returningOrder, setReturningOrder] = React.useState(-1);
  const [show, setShow] = React.useState(false); // For dialog

  const handleReturn = () => {
    // Send return request to server
    Axios.post(`/order/return/${returningOrder}`, {
      cartId: returningOrder,
    })
      .then((res) => {
        navigate(`/order/return/summary/${res.data.cartId}`);
      })
      .catch((err) => {
        alert(
          "There was an error returning your items. Please try again later."
        );
      });
    setReturningOrder(-1);
  };

  // If returningOrder is set, show dialog
  useEffect(() => {
    if (returningOrder > -1) {
      setShow(true);
    }
  }, [returningOrder]);

  return (
    <>
      <Dialog
        show={show}
        setShow={setShow}
        handleConfirm={handleReturn}
        handleCancel={() => setReturningOrder(-1)}
        title="Confirm Return"
        message={`Are you sure you want to return the items in Order #${returningOrder}?`}
        confirmText={"Return Items"}
      />
      <div className="container">
        <div className="row mt-4">
          <h1>Orders</h1>
          <p>Browse the orders you've placed with us.</p>
          <div className="card p-5">
            {simulatedLoad && (
              <>
                <h2 className="text-center text-primary">
                  <BsCartFill />
                </h2>
                <Spinner />
              </>
            )}
            {message && !simulatedLoad && (
              <div className="alert alert-success" role="alert">
                <strong>{message}</strong> Your order details are archived
                below. You may cancel your order for a limited time.
              </div>
            )}
            {!simulatedLoad && (
              <div
                className="accordion accordion-flush rounded"
                id="orderAccordion"
              >
                <Order
                  cartId={1}
                  expanded
                  setReturningOrder={setReturningOrder}
                />
                <Order cartId={2} setReturningOrder={setReturningOrder} />
                <Order cartId={3} setReturningOrder={setReturningOrder} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;

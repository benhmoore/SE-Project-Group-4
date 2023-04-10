import React from "react";
import {
  Navigate,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Order from "../../components/order/Order";
import Skeleton from "react-loading-skeleton";
import Spinner from "../../components/Spinner";
import { BsCartFill } from "react-icons/bs";

const Orders = () => {
  if (!useOutletContext().authenticated) return <Navigate to="/user/signin" />;

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

  return (
    <>
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
                <Order cartId={1} expanded />
                <Order cartId={2} />
                <Order cartId={3} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;

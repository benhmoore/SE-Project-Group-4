import React, { useEffect } from "react";
import { Link, Form } from "react-router-dom";
import { useOutletContext, useNavigate, Navigate } from "react-router-dom";

import Axios from "axios";
import { MdLocationOn, MdPayments } from "react-icons/md";
import { priceFormatter } from "../../utils/PriceFormatter";
import { JSONCartItem } from "../../utils/props/JSONCartItem";
import OrderSummary from "../../components/order/OrderSummary";

const Checkout = () => {
  if (!useOutletContext().authenticated) return <Navigate to="/user/signin" />;

  const { setShouldUpdateCartBadge } = useOutletContext();

  // Get user token from useOutletContext
  const token = useOutletContext().user.token;

  const navigate = useNavigate();

  const [cartItems, setCartItems] = React.useState(Array<JSONCartItem>);
  const [subtotal, setSubtotal] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [orderButtonDisabled, setOrderButtonDisabled] = React.useState(false);

  const handlePlaceOrder = () => {
    setOrderButtonDisabled(true);
    Axios.post(
      "http://127.0.0.1:8000/cart/order",
      {},
      { params: { token } }
    )
      .then((response) => {
        setShouldUpdateCartBadge(true);
        navigate(`/orders/${response.data.cartId}`, {
          state: { message: "Order placed!" },
        });
      })
      .catch((error) => {
        alert("There was an error placing your order. Please try again.");
      });
  };

  // Use useEffect to update the cart subtotal after rendering
  useEffect(() => {
    // Calculate the running subtotal from the cart items
    let running_subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      running_subtotal += cartItems[i].price * cartItems[i].quantity;
    }

    // Update the cart subtotal only if it is different from the running subtotal
    if (running_subtotal !== subtotal) {
      setSubtotal(running_subtotal);
      setTotal(running_subtotal + 15 + 0.07 * running_subtotal);
    }
  }, [cartItems]); // Pass the cart items as a dependency array

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col mt-4">
            <h1>Ready to Checkout?</h1>
            <p>
              Please confirm that your payment and shipping information is
              correct and up-to-date.
            </p>
            <div className="card p-5">
              <h3>
                <MdPayments /> Payment Information
              </h3>
              <table className="col-lg-4 mb-4">
                <thead>
                  <tr>
                    <th>Identifier</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1245 2333 2312 3212</td>
                  </tr>
                </tbody>
              </table>
              <h3>
                <MdLocationOn /> Shipping Information
              </h3>
              <table className="col-lg-4">
                <thead>
                  <tr>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1245 10th St</td>
                    <td>Starkville</td>
                    <td>MS</td>
                    <td>39759</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card p-5 mt-2">
              <div className="col-lg-6">
                <h2>Here's what you're ordering</h2>
                <p>
                  {" "}
                  Please confirm that your order is correct. If you need to make
                  changes, please{" "}
                  <Link to={"../cart"}>return to your cart</Link>.
                </p>
                <OrderSummary />
                <hr />
                <div className="d-grid gap-2 mt-4">
                  <button
                    className="btn btn-lg btn-primary"
                    style={{ borderRadius: "2em" }}
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={orderButtonDisabled}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

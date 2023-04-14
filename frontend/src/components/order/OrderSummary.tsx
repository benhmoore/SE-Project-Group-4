import { useEffect, useState } from "react";
import { JSONCartItem } from "../../utils/props/JSONCartItem";
import { priceFormatter } from "../../utils/PriceFormatter";
import Axios from "axios";
import { useOutletContext } from "react-router-dom";

interface Props {
  cartId?: number;
}

const OrderSummary = ({ cartId = -1 }: Props) => {
  // Get user token from useOutletContext
  const token = useOutletContext().user.token;

  const [cartItems, setCartItems] = useState(Array<JSONCartItem>);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // If a cart ID is provided, use it to fetch the cart items
  if (cartId != -1) {
    Axios.get(`/cart/${cartId}`, {
      params: {
        token,
      },
    })
      .then((response) => {
        // Store the cart items in state
        setCartItems(response.data.cartItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Otherwise, fetch the current cart items from the server
  if (cartId == -1) {
    useEffect(() => {
      Axios.get("http://127.0.0.1:8000/cart", {
        params: {
          token,
        },
      })
        .then((response) => {
          // Store the cart items in state
          setCartItems(response.data.cartItems);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  }

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
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.cartItemId}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{priceFormatter.format(item.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>{/* Item */}</th>
            <th className="text-end ps-3">{/* Price */}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-end fw-bold">Subtotal</td>
            <td className="text-end ps-3">{priceFormatter.format(subtotal)}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Shipping</td>
            <td className="text-end ps-3">{priceFormatter.format(15)}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Tax</td>
            <td className="text-end ps-3">
              {priceFormatter.format(0.07 * subtotal)}
            </td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Total</td>
            <td className="text-end ps-3 fw-bold">
              {priceFormatter.format(total)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderSummary;

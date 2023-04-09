import { useState, useEffect } from "react";
import Dialog from "../../components/Dialog";
import CartSummary from "../../components/cart/CartSummary";
import CartItems from "../../components/cart/CartItems";
import { JSONCartItem } from "../../utils/props/JSONCartItem";
import Axios from "axios";

const Cart = () => {
  const [show, setShow] = useState(false);

  // Create states for quantity changes
  const [cartItems, setCartItems] = useState(Array<JSONCartItem>);

  const [subtotal, setSubtotal] = useState(
    cartItems.reduce((a, b) => a + b.price * b.quantity, 0)
  );

  useEffect(() => {
    Axios.get("/cart")
      .then((response) => {
        // Store the cart items in state
        setCartItems(response.data.cartItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleQuantityChange = (cartItemId: number, newQuantity: number) => {
    Axios.put(`/cart/items/${cartItemId}`, {
      quantity: newQuantity,
    })
      .then((response) => {
        // Update quantity in cartItems
        const itemQuantity = response.data.quantity;
        let newCartItems = cartItems.map((item) => {
          if (item.cartItemId === cartItemId) {
            item.quantity = itemQuantity;
          }
          return item;
        });
        setCartItems(newCartItems);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteCartItem = (cartItemId: number) => {
    // Remove item from cartItems
    let newCartItems = cartItems.filter(
      (item) => item.cartItemId !== cartItemId
    );
    setCartItems(newCartItems);

    // Recalculate subtotal
    let running_subtotal = 0;
    for (let i = 0; i < newCartItems.length; i++) {
      running_subtotal += newCartItems[i].price * newCartItems[i].quantity;
    }
    setSubtotal(running_subtotal);
  };

  return (
    <>
      <Dialog show={show} setShow={setShow} />
      <div className="container">
        <div className="row">
          <h1 className="mt-4">Cart</h1>
          <div className="col-md-8 mt-4 border-bottom">
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "100px" }}>
                    {/* Delete Button */}
                  </th>
                  <th scope="col">{/*Name*/}</th>
                  <th scope="col" className="text-center">
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="text-end"
                    style={{ width: "300px" }}
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <CartItems
                  cartItems={cartItems}
                  handleDeleteCartItem={handleDeleteCartItem}
                  handleQuantityChange={handleQuantityChange}
                  cartSubtotal={subtotal}
                  setCartSubtotal={setSubtotal}
                />
              </tbody>
            </table>
          </div>
          <div className="col-md-4 mt-4 border-start border-bottom p-4 bg-white">
            <CartSummary subtotal={subtotal} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

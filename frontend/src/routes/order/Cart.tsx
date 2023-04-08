import { useState } from "react";
import Dialog from "../../components/Dialog";
import CartSummary from "../../components/cart/CartSummary";
import CartItems from "../../components/cart/CartItems";
import { JSONCartItem } from "../../utils/props/JSONCartItem";

const Cart = () => {
  const [show, setShow] = useState(false);

  var serverItems: Array<JSONCartItem> = [
    {
      productId: 1,
      cartItemId: 1,
      price: 5,
      quantity: 1,
      name: "Cat Food",
    },
    {
      productId: 2,
      cartItemId: 2,
      price: 10.0,
      quantity: 1,
      name: "Dog Food",
    },
    {
      productId: 3,
      cartItemId: 3,
      price: 20,
      quantity: 1,
      name: "Fish Food",
    },
  ];

  // Create states for quantity changes
  const [cartItems, setCartItems] = useState(serverItems);

  const [subtotal, setSubtotal] = useState(
    cartItems.reduce((a, b) => a + b.price * b.quantity, 0)
  );

  const handleQuantityChange = (cartItemId: number, newQuantity: number) => {
    // Update quantity in cartItems
    let newCartItems = cartItems.map((item) => {
      if (item.cartItemId === cartItemId) {
        item.quantity = newQuantity;
      }
      return item;
    });
    setCartItems(newCartItems);
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

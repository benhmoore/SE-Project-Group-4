import { useEffect, useState } from "react";
import { JSONCartItem } from "../../utils/props/JSONCartItem";
import CartItem from "./CartItem";
import Axios from "axios";

interface Props {
  cartItems: Array<JSONCartItem>;
  cartSubtotal: number;
  setCartSubtotal: (subtotal: number) => void;
  handleQuantityChange: (cartItemId: number, newQuantity: number) => void;
  handleDeleteCartItem: (cartItemId: number) => void;
}

const CartItems = ({
  cartItems,
  handleQuantityChange,
  handleDeleteCartItem,
  cartSubtotal,
  setCartSubtotal,
}: Props) => {
  const rows = [];

  // Use useEffect to update the cart subtotal after rendering
  useEffect(() => {
    // Calculate the running subtotal from the cart items
    let running_subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      running_subtotal += cartItems[i].price * cartItems[i].quantity;
    }

    // Update the cart subtotal only if it is different from the running subtotal
    if (running_subtotal !== cartSubtotal) setCartSubtotal(running_subtotal);
  }, [cartItems]); // Pass the cart items as a dependency array

  let running_subtotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    running_subtotal += cartItems[i].price * cartItems[i].quantity;
    rows.push(
      <CartItem
        key={cartItems[i].id}
        productId={cartItems[i].productId}
        cartItemId={cartItems[i].id}
        price={cartItems[i].price}
        name={cartItems[i].name}
        quantity={cartItems[i].quantity}
        handleQuantityChange={handleQuantityChange}
        handleDeleteCartItem={handleDeleteCartItem}
      />
    );
  }

  useEffect(() => {
    Axios.get("/cart")
      .then((response) => {
        // Convert list of JSON cart items to a list of CartItem objects
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {cartItems.length > 0 ? (
        rows
      ) : (
        <td colSpan={4} className="text-center">
          <p>Your cart is empty.</p>
        </td>
      )}
    </>
  );
};

export default CartItems;

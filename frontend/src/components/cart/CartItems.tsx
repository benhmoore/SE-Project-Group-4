import React from "react";
import { useEffect } from "react";
import CartItem from "./CartItem";

interface Props {
  cartItems: Array<Object>;
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
        key={cartItems[i].cartItemId}
        productId={cartItems[i].productId}
        cartItemId={cartItems[i].cartItemId}
        price={cartItems[i].price}
        name={cartItems[i].name}
        quantity={cartItems[i].quantity}
        setQuantity={cartItems[i].setQuantity}
        handleQuantityChange={handleQuantityChange}
        handleDeleteCartItem={handleDeleteCartItem}
      />
    );
  }

  return <>{rows}</>;
};

export default CartItems;

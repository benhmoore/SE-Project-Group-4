import { useState } from "react";
import CartItem from "../components/cart/CartItem";

export interface CartItemObject {
  productId: number;
  cartItemId: number;
  price: number;
  name: string;
  quantity: number;
  setQuantity?: (quantity: number) => void;
}

const CatItemFactory = (cartItems: Array<CartItemObject>) => {
  const cartItemRows = [];

  // Add a setQuantity property to each item
  for (let i = 0; i < cartItems.length; i++) {
    const [quantity, setQuantity] = useState(cartItems[i].quantity);
    cartItems[i].quantity = quantity;
    cartItems[i].setQuantity = setQuantity;
  }

  return cartItems;
};

export default CatItemFactory;

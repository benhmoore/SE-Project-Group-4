import React from "react";
import { priceFormatter } from "../../utils/PriceFormatter";
import { Link } from "react-router-dom";

interface Props {
  subtotal: number;
}

const CartSummary = ({ subtotal }: Props) => {
  const [shipping, setShipping] = React.useState(15);

  return (
    <>
      <h3 className="mb-3">Cart Summary</h3>
      <table>
        <thead>
          <tr>
            <th>{/* Item */}</th>
            <th className="text-end ps-3">{/* Price */}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-end">Subtotal</td>
            <td className="text-end ps-3">{priceFormatter.format(subtotal)}</td>
          </tr>
          <tr>
            <td className="text-end">Shipping</td>
            <td className="text-end ps-3">{priceFormatter.format(shipping)}</td>
          </tr>
          <tr>
            <td className="text-end">Tax</td>
            <td className="text-end ps-3">
              {priceFormatter.format(subtotal * 0.07)}
            </td>
          </tr>
          <tr>
            <td className="text-end">Total</td>
            <td className="text-end ps-3">
              {priceFormatter.format(subtotal + shipping + subtotal * 0.07)}
            </td>
          </tr>
        </tbody>
      </table>
      <Link to={"/cart/checkout"} className="btn btn-primary w-100 mt-4">
        Checkout
      </Link>
    </>
  );
};

export default CartSummary;

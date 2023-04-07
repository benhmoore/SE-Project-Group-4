import { useState } from "react";

import QuantityPill from "./QuantityPill";
import { MdClose } from "react-icons/md";
import { priceFormatter } from "../../utils/PriceFormatter";

interface Props {
  productId: number;
  cartItemId: number;
  price: number;
  name: string;
  quantity: number;
  handleQuantityChange: (cartItemId: number, newQuantity: number) => void;
  handleDeleteCartItem: (cartItemId: number) => void;
}
const CartItem = ({
  productId,
  cartItemId,
  price,
  quantity,
  name,
  handleQuantityChange,
  handleDeleteCartItem,
}: Props) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <tr
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <td className="align-middle">
        {showDelete && (
          <button
            className="btn btn-sm btn-danger"
            style={{ borderRadius: "2em" }}
            onClick={() => handleDeleteCartItem(cartItemId)}
          >
            <MdClose />
          </button>
        )}
      </td>
      <td className="align-middle">{name}</td>
      <td className="text-center align-middle">
        <QuantityPill
          cartItemId={cartItemId}
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
        />
      </td>
      <td className="text-end align-middle">
        {priceFormatter.format(price * quantity)}
        <br />
        <small className="text-secondary ms-2">
          {quantity > 1 && <span> {priceFormatter.format(price)} each</span>}
        </small>
      </td>
    </tr>
  );
};

export default CartItem;

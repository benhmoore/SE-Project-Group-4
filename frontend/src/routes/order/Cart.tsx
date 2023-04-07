import React from "react";
import { BsFillBagPlusFill } from "react-icons/bs";
import { BiMinus, BiPlusCircle, BiMinusCircle, BiPlus } from "react-icons/bi";
import QuantityPill from "../../components/cart/QuantityPill";
import Dialog from "../../components/Dialog";
import CartItem from "../../components/cart/CartItem";

const Cart = () => {
  const [show, setShow] = React.useState(false);

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
                <CartItem name="Cat Food" price={12.5} />
                <CartItem price={100.99} />
                <CartItem price={599.99} />
              </tbody>
            </table>
          </div>
          <div className="col-md-4 mt-4 border-start border-bottom p-4 bg-white">
            <h2>Cart Summary</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

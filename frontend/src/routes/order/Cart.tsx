import { useState, useEffect } from "react";
import Dialog from "../../components/Dialog";
import CartSummary from "../../components/cart/CartSummary";
import CartItems from "../../components/cart/CartItems";
import { JSONCartItem } from "../../utils/props/JSONCartItem";
import Axios from "axios";
import { Navigate, useOutletContext } from "react-router-dom";

const Cart = () => {
  if (!useOutletContext().authenticated) return <Navigate to="/user/signin" />;

  const { setShouldUpdateCartBadge } = useOutletContext();

  // Get user token from useOutletContext
  const token = useOutletContext().token;

  const [show, setShow] = useState(false);

  // Create states for quantity changes
  const [cartItems, setCartItems] = useState(Array<JSONCartItem>);

  const [subtotal, setSubtotal] = useState(
    cartItems.reduce((a, b) => a + b.price * b.quantity, 0)
  );

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

  const handleQuantityChange = (cartItemId: number, newQuantity: number) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("id", String(cartItemId));
    formData.append("quantity", String(newQuantity));
    Axios.post(`http://127.0.0.1:8000/cart/items/quantity`, formData)
      .then((response) => {
        // Update quantity in cartItems
        const itemQuantity = response.data.quantity;
        console.log("NEW Q:", itemQuantity);
        let newCartItems = cartItems.map((item) => {
          if (item.id === cartItemId) {
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
    // // Remove item from cartItems
    // let newCartItems = cartItems.filter(
    //   (item) => item.cartItemId !== cartItemId
    // );
    // setCartItems(newCartItems);

    let formData = new FormData();
    formData.append("token", token);
    formData.append("item_id", String(cartItemId));
    Axios.post(`http://127.0.0.1:8000/cart/remove`, formData)
      .then((response) => {
        // Update cartItems
        setCartItems(response.data.cartItems);
        setShouldUpdateCartBadge(true);
      })
      .catch((error) => {
        console.log(error);
      });

    // Recalculate subtotal
    let running_subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
      running_subtotal += cartItems[i].price * cartItems[i].quantity;
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
            <CartSummary subtotal={subtotal} cartItems={cartItems} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

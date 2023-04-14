import React from "react";
import { BsCartPlus } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import Axios from "axios";
import { useOutletContext, useNavigate } from "react-router-dom";

interface Props {
  price: number;
  productId: number;
}

const PricePill = ({ price, productId = -1 }: Props) => {
  const { authenticated, setShouldUpdateCartBadge } = useOutletContext();

  // Get user token from useOutletContext
  const token = useOutletContext().user.token;

  const navigate = useNavigate();

  const handleAddToCart = () => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("item_id", productId);
    Axios.post("http://127.0.0.1:8000/cart/add", formData)
      .then((response) => {
        console.log(response);
        setShouldUpdateCartBadge(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="product-card-menu price-pill input-group me-md-2 justify-content-end">
      <div
        className="input-group-text"
        style={{
          borderTopLeftRadius: "2em",
          borderBottomLeftRadius: "2em",
        }}
        id="btnGroupAddon2"
      >
        ${price || <Skeleton width={30} />}
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          if (authenticated) {
            handleAddToCart();
          } else {
            navigate("/user/signin");
          }
        }}
      >
        {/* <BsCartPlus style={{ marginBottom: 5 }} className="me-2" /> */}
        {authenticated ? "Add to Cart" : "Sign in to buy"}
      </button>
    </div>
  );
};

export default PricePill;

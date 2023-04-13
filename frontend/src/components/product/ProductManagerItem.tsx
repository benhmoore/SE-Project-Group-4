import React from "react";

import { useOutletContext } from "react-router";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

interface Props {
  productId: number;
}

const ProductManagerItem = ({ productId }: Props) => {
  // Get user token from useOutletContext
  const token = useOutletContext().user.token;

  const [productName, setProductName] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productQuantity, setProductQuantity] = React.useState(0);

  // Load product data from API
  React.useEffect(() => {
    Axios.get("/products", {
      params: {
        token,
        id: productId,
      },
    })
      .then((res) => {
        setProductName(res.data.name);
        setProductPrice(res.data.price);
        setProductQuantity(res.data.inventory);
      })
      .catch((err) => {
        alert(
          "There was an error fetching your product. Please try again later."
        );
      });
  }, []);

  return (
    <tr>
      <td>Product 1</td>
      <td>$10</td>
      <td>10</td>
      <td>
        <button className="btn btn-primary">Edit</button>
        <button className="btn btn-danger ms-2">Archive</button>
      </td>
    </tr>
  );
};

export default ProductManagerItem;

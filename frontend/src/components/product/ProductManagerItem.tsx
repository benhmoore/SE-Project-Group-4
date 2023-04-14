import React from "react";

import { useOutletContext } from "react-router";
import { useNavigate } from "react-router-dom";

import { loadProduct } from "../../utils/ProductLoader";

import Axios from "axios";
import { priceFormatter } from "../../utils/PriceFormatter";
import Dialog from "../Dialog";
import EditProductDialog from "./EditProductDialog";

interface Props {
  productId: number;
}

const ProductManagerItem = ({ productId }: Props) => {
  // Get user token from useOutletContext
  const token = useOutletContext().user.token;

  const [productName, setProductName] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productQuantity, setProductQuantity] = React.useState(0);
  const [productRevenue, setProductRevenue] = React.useState(0);

  const [showDialog, setShowDialog] = React.useState(false);

  // Load product data from API
  React.useEffect(() => {
    loadProduct(productId, token)
      .then((res) => {
        console.log("RES: ", res);
        setProductName(res.name);
        setProductPrice(res.price);
        setProductQuantity(res.inventory);
        setProductRevenue(res.num_sales * res.price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <EditProductDialog
        productId={productId}
        show={showDialog}
        setShow={setShowDialog}
      />
      <tr>
        <td>{productName}</td>
        <td>{priceFormatter.format(parseInt(productPrice))}</td>
        <td>{productQuantity}</td>
        <td>{priceFormatter.format(productRevenue)}</td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => setShowDialog(true)}
          >
            Edit
          </button>
          <button className="btn btn-danger ms-2">Archive</button>
        </td>
      </tr>
    </>
  );
};

export default ProductManagerItem;

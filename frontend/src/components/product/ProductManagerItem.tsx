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
  shouldRefreshProducts: boolean;
  setShouldRefreshProducts: (shouldRefresh: boolean) => void;
}

const ProductManagerItem = ({
  productId,
  setShouldRefreshProducts,
  shouldRefreshProducts,
}: Props) => {
  // Get user token from useOutletContext
  const token = useOutletContext().user.token;

  const navigate = useNavigate();

  const [productName, setProductName] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productQuantity, setProductQuantity] = React.useState(0);
  const [productSales, setProductSales] = React.useState(0);
  const [productRevenue, setProductRevenue] = React.useState(0);
  const [productStatus, setProductStatus] = React.useState(0);

  const [showDialog, setShowDialog] = React.useState(false);

  const handleDeleteProduct = () => {
    let form = new FormData();
    form.append("token", token);
    form.append("product_id", productId.toString());
    Axios.post("http://127.0.0.1:8000/seller/products/delete", form)
      .then((res) => {
        setShouldRefreshProducts(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Load product data from API
  React.useEffect(() => {
    Axios.get("http://127.0.0.1:8000/seller/products", {
      params: {
        product_id: productId,
        token,
      },
    })
      .then((res) => {
        const product = res.data.products[0];
        setProductName(product.name);
        setProductPrice(product.price);
        setProductQuantity(product.inventory);
        setProductSales(product.num_sales);
        setProductRevenue(product.revenue);
        setProductStatus(product.approval_status);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [shouldRefreshProducts]);

  return (
    <>
      <EditProductDialog
        productId={productId}
        show={showDialog}
        setShow={setShowDialog}
        setShouldRefreshProducts={setShouldRefreshProducts}
      />
      <tr>
        <td>{productName}</td>
        <td>{priceFormatter.format(parseInt(productPrice))}</td>
        <td>{productQuantity}</td>
        <td>{productSales}</td>
        <td>{priceFormatter.format(productRevenue)}</td>
        <td>
          {productStatus === 0 ? (
            <span className="badge bg-warning text-dark">Pending</span>
          ) : (
            <span className="badge bg-success">Approved</span>
          )}
        </td>
        <td>
          <button
            className="btn btn-primary"
            onClick={() => setShowDialog(true)}
          >
            Edit
          </button>
          <button className="btn btn-danger ms-2" onClick={handleDeleteProduct}>
            Archive
          </button>
        </td>
      </tr>
    </>
  );
};

export default ProductManagerItem;

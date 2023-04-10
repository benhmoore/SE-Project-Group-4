import React from "react";
import PricePill from "../../components/product/PricePill";
import ProductMenu from "../../components/product/ProductMenu";
import Skeleton from "react-loading-skeleton";
import { BsFillInfoCircleFill, BsInfo, BsQuote } from "react-icons/bs";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import Axios from "axios";
import Product from "../../components/product/Product";

const ProductPage = () => {
  const navigate = useNavigate();
  // Get the product ID from the URL
  const { id, compareId } = useParams();

  let compareProductId = -1;
  if (compareId !== undefined) compareProductId = parseInt(compareId);

  if (id === undefined) return navigate("/");
  const productId = parseInt(id);

  const productSkeleton = {
    name: "",
    price: 0,
    description: "",
    image: "",
    id: -1,
  };

  const [product, setProduct] = React.useState(productSkeleton);
  const [compareProduct, setCompareProduct] = React.useState(productSkeleton);

  if (compareProductId !== -1) {
    React.useEffect(() => {
      Axios.get(`/products/${compareProductId}`)
        .then((response) => {
          if (response.data.products.length === 0) {
            return navigate("/");
          }
          setCompareProduct(response.data.products[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  }

  // Get products from server
  React.useEffect(() => {
    Axios.get(`/products/${productId}`)
      .then((response) => {
        if (response.data.products.length === 0) {
          return navigate("/");
        }
        setProduct(response.data.products[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col">
            <Product product={product} />
          </div>
          {compareProductId !== -1 && (
            <div className="col">
              <Product product={compareProduct} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;

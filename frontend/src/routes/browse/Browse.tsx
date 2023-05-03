import React from "react";

import ProductCard from "../../components/product/ProductCard";
import Spinner from "../../components/Spinner";
import Axios from "axios";
import {
  useLocation,
  useParams,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import ProductCardFetcher from "../../components/product/ProductCardFetcher";
import { BiGitCompare } from "react-icons/bi";

interface Props {
  compareProduct?: boolean; // If this is true, check url for product id
}

const Browse = ({ compareProduct = false }: Props) => {
  const navigate = useNavigate();
  let { state } = useLocation();

  // Get product id from url params
  const { compareProductId } = useParams();

  let searchQuery = state?.searchQuery || "";

  const [products, setProducts] = React.useState([]);

  // Display spinner while loading
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Axios.get("http://127.0.0.1:8000/products/list")
      .then((response) => {
        // Remove any products that have an approval_status of 0
        response.data.products = response.data.filter((product: any) => {
          return product.approval_status === 1;
        });
        response.data.products = response.data.products.filter(
          (product: any) => {
            return product.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          }
        );
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchQuery]);

  return (
    <>
      {compareProductId !== undefined && (
        <div className="p-5 pt-1 bg-white border-bottom">
          <div className="row mt-4 ms-4">
            <div className="col-lg-3" style={{ minWidth: "300px" }}>
              <ProductCardFetcher productId={parseInt(compareProductId)} />
            </div>
            <div className="col-lg-6">
              <div className="card product-view p-4 mt-4 ms-2">
                <h1>
                  <BiGitCompare className="mb-1 me-1" />
                </h1>
                <h2>Search or select another product below to compare.</h2>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        {products.length === 0 ? (
          <div className="row mt-4">
            <p>No products found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="row mt-4">
            {products.map((product: Object) => (
              <div className="col-sm" key={product.id}>
                <ProductCard
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  productId={product.id}
                  image={product.image_id}
                  compareProductId={compareProductId}
                />
              </div>
            ))}
          </div>
        )}
        <div className="row mt-4">{loading && <Spinner />}</div>
      </div>
    </>
  );
};

export default Browse;

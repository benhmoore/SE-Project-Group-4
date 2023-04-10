import React from "react";

import ProductCard from "../../components/product/ProductCard";
import Spinner from "../../components/Spinner";
import Axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";

interface Props {
  compareProduct?: boolean; // If this is true, check url for product id
}

const Browse = ({ compareProduct = false }: Props) => {
  const navigate = useNavigate();
  let { state } = useLocation();

  // Get product id from url params
  const { compareProductId } = useParams();
  console.log(compareProductId, "ADAD");

  let searchQuery = state?.searchQuery || "";

  const [products, setProducts] = React.useState([]);

  // Display spinner while loading
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Axios.get("/products")
      .then((response) => {
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
        <div className="container pt-4">
          <h1>Comparing</h1>
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
                  image={product.image}
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

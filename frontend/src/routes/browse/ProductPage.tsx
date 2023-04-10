import React from "react";
import PricePill from "../../components/product/PricePill";
import ProductMenu from "../../components/product/ProductMenu";
import Skeleton from "react-loading-skeleton";
import { BsQuote } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

const ProductPage = () => {
  const navigate = useNavigate();
  // Get the product ID from the URL
  const { id } = useParams();
  if (id === undefined) return navigate("/");
  const productId = parseInt(id);

  const [product, setProduct] = React.useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    productId: -1,
  });

  // Get products from server
  React.useEffect(() => {
    Axios.get(`/products/${productId}`)
      .then((response) => {
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
          <div className="card product-view p-4">
            <div className="card-header">
              <ProductMenu
                name={product.name}
                price={product.price}
                productId={product.productId}
              />
              <div className="container text-center">
                <div className="row align-items-start">
                  <div className="col">
                    <div className="text-center">
                      <img
                        src={product.image}
                        className="card-img rounded"
                        alt={product.name}
                      />
                    </div>
                  </div>
                  <div className="col text-start mt-3">
                    <p>{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer bg-white mt-3">
              <div className="row">
                <div className="col-6 mt-4">
                  <h2>Reviews</h2>
                  <p>
                    <Skeleton count={3} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;

import React from "react";

import ProductCard from "../../components/product/ProductCard";
import Spinner from "../../components/Spinner";
import Axios from "axios";

const Browse = () => {
  // Get products from server

  const [products, setProducts] = React.useState([]);

  // Display spinner while loading
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Axios.get("/products")
      .then((response) => {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container">
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

          {/* <div className="col-sm">
            <ProductCard
              name="Product"
              description="This is a very detailed description of what this product is and who it's for."
              price={100}
              productId={123}
            />
          </div> */}
        </div>
        <div className="row mt-4">{loading && <Spinner />}</div>
      </div>
    </>
  );
};

export default Browse;

import React from "react";

import ProductCard from "../../components/product/ProductCard";
import Spinner from "../../components/Spinner";

const Browse = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-sm">
            <ProductCard
              name="Product"
              description="This is a very detailed description of what this product is and who it's for."
              price={100}
            />
          </div>
          <div className="col-sm">
            <ProductCard />
          </div>
          <div className="col-sm">
            <ProductCard
              name="Product"
              description="This is a very detailed description of what this product is and who it's for."
              price={100}
            />
          </div>
        </div>
        <div className="row mt-4">
          <Spinner />
        </div>
      </div>
    </>
  );
};

export default Browse;

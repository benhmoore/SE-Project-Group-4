import React from "react";

import ProductCard from "../../components/product/ProductCard";

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
          <div className="col-sm"></div>
          <div className="col-sm"></div>
        </div>
      </div>
    </>
  );
};

export default Browse;

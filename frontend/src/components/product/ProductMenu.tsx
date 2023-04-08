import React from "react";
import PricePill from "./PricePill";

interface Props {
  price: number;
  productId: number;
  name: string;
}

const ProductMenu = ({ price, productId, name }: Props) => {
  return (
    <>
      <nav className="navbar product-menu navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <h1 className="mt-2">{name}</h1>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="ms-3 nav-item">
                <PricePill price={price} productId={productId} />
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Reviews
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Compare
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ProductMenu;

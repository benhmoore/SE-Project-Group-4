import React from "react";
import PricePill from "./PricePill";
import { BiGitCompare } from "react-icons/bi";
import { Link, useOutletContext } from "react-router-dom";

interface Props {
  price: number;
  productId: number;
  name: string;
}

const ProductMenu = ({ price, productId, name }: Props) => {
  // Get global comparison product
  const { globalCompareProductId, setGlobalCompareProductId } =
    useOutletContext();

  const handleCompareClick = () => {
    setGlobalCompareProductId(productId);
    console.log(" Set compare product id: " + productId);
  };

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
              <li className="ms-nav-item ms-3">
                <PricePill price={price} productId={productId} />
              </li>
              <li className="nav-item ms-3">
                <Link
                  to={`../compare/${productId}`}
                  onClick={handleCompareClick}
                  className="nav-link"
                >
                  {/* <BiGitCompare className="mb-1 me-1" /> */}
                  Compare
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ProductMenu;

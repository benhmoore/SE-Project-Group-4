import React, { useEffect } from "react";

import { BsPersonCircle, BsFillCartFill, BsCart } from "react-icons/bs";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import Axios from "axios";

interface Props {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  handleLogout: () => void;
}

const AccountMenu = ({
  authenticated,
  setAuthenticated,
  handleLogout,
}: Props) => {
  const location = useLocation();

  const [cartItems, setCartItems] = React.useState([]);

  useEffect(() => {
    Axios.get("/cart")
      .then((response) => {
        // Store the cart items in state
        setCartItems(response.data.cartItems);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!authenticated)
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            to={"user/signin"}
            className={`nav-link btn ${
              location.pathname === "/user/signin" ? "active" : ""
            }`}
          >
            Sign In
          </Link>
        </li>
      </ul>
    );
  return (
    <ul className="navbar-nav">
      <li className="nav-item me-2">
        <Link
          to={"cart"}
          className={`nav-link btn btn-secondary pe-3 ${
            location.pathname === "/cart" ? "active" : ""
          }`}
        >
          <BsCart style={{ marginLeft: 5, marginBottom: 3 }} />
          {cartItems.length > 0 && (
            <span className="badge bg-light text-dark ms-1 rounded-pill">
              {cartItems.length}
            </span>
          )}
        </Link>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link btn dropdown-toggle"
          id="navbarScrollingDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <BsPersonCircle style={{ marginRight: 10, marginBottom: 3 }} />
          Account
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarScrollingDropdown"
        >
          <li>
            <Link to={"/orders"} className="dropdown-item">
              Orders
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link to={"#"} onClick={handleLogout} className="dropdown-item">
              Sign Out
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default AccountMenu;

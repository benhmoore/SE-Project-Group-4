import React, { useEffect } from "react";

import { BsPersonCircle, BsFillCartFill, BsCart } from "react-icons/bs";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import Axios from "axios";

interface Props {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  handleLogout: () => void;
  user: { username: string; token: string };
  token: string;
  shouldUpdateCartBadge: boolean;
  setShouldUpdateCartBadge: (shouldUpdateCartBadge: boolean) => void;
}

const AccountMenu = ({
  authenticated,
  setAuthenticated,
  handleLogout,
  user,
  token,
  shouldUpdateCartBadge,
  setShouldUpdateCartBadge,
}: Props) => {
  const location = useLocation();

  const [cartItems, setCartItems] = React.useState([]);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/cart", {
      params: {
        token,
      },
    })
      .then((response) => {
        // Store the cart items in state
        console.log("THEE CART", response.data.cartItems);
        setCartItems(response.data.cartItems);
      })
      .catch((error) => {
        console.log(error);
      });

    try {
      setShouldUpdateCartBadge(false);
    } catch (error) {
      console.log(error);
    }
  }, [shouldUpdateCartBadge]);

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
          <BsCart style={{ marginLeft: 5, marginBottom: 2 }} />
          {cartItems.length > 0 && (
            <span
              className="badge bg-light text-primary ms-1 rounded-pill border"
              style={{ marginBottom: "2px" }}
            >
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
          {user.username}
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarScrollingDropdown"
        >
          <li>
            <Link to={"/user/account"} className="dropdown-item">
              Account
            </Link>
          </li>
          <li>
            <Link to={"/orders"} className="dropdown-item">
              Orders
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link to={"/sell"} className="dropdown-item">
              Sell
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link to={"/admin"} className="dropdown-item">
              Admin
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

import React from "react";

import { BsPersonCircle, BsFillCartFill, BsCart } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

interface Props {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const AccountMenu = ({ authenticated, setAuthenticated }: Props) => {
  const location = useLocation();

  const handleLogout = () => {
    setAuthenticated(false);
  };

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
            <a className="dropdown-item">Orders</a>
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

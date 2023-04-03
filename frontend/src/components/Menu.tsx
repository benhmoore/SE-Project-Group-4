import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          E-Commerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <a className="nav-link">Browse All</a>
            </li>
            <li>
              <form className="d-flex mx-auto ms-2">
                <input
                  className="form-control me-2"
                  style={{ width: "400px" }}
                  type="search"
                  placeholder="Search marketplace"
                  aria-label="Search"
                />
              </form>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link btn dropdown-toggle"
                id="navbarScrollingDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarScrollingDropdown"
              >
                <li>
                  <Link to={"signin"} className="dropdown-item text-dark">
                    Sign In
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item">Orders</a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item">Sign Out</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Menu;

import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";

interface Props {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const Menu = ({ authenticated, setAuthenticated }: Props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
              <a className="nav-link">Browse</a>
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
          <AccountMenu
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
          />
        </div>
      </div>
    </nav>
  );
};

export default Menu;

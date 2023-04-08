import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import AccountMenu from "./AccountMenu";

interface Props {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  handleLogout: () => void;
}

const Menu = ({ authenticated, setAuthenticated, handleLogout }: Props) => {
  const location = useLocation();

  return (
    <nav className="navbar header-menu navbar-expand-md navbar-dark text-light bg-primary">
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
              <Link
                className={`nav-link btn ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to={"/"}
              >
                Browse
              </Link>
            </li>
            <li>
              <form className="d-flex mx-auto ms-2">
                <input
                  className="form-control navbar-search me-2"
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
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
};

export default Menu;

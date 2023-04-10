import { ChangeEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import AccountMenu from "./AccountMenu";
import Axios from "axios";

interface Props {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  handleLogout: () => void;
  user: { username: string; token: string };
}

const Menu = ({
  authenticated,
  setAuthenticated,
  handleLogout,
  user,
}: Props) => {
  const location = useLocation();

  const navigate = useNavigate();

  const [isSearching, setIsSearching] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleClickSearch = (event: React.MouseEvent) => {
    if (isSearching) return;
    setIsSearching(true);

    // Check if the user is on the search page
    if (location.pathname !== "/")
      if (searchQuery.length > 0)
        return navigate("/", { state: { searchQuery } });
      else return navigate("/");
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // Get all products from server
    navigate("/", { state: { searchQuery } });
  };

  return (
    <>
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
                <form className="d-flex mx-auto ms-2" onSubmit={handleSearch}>
                  <input
                    className="form-control navbar-search me-2"
                    type="search"
                    placeholder="Search marketplace"
                    aria-label="Search"
                    onClick={handleClickSearch}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    onBlur={() => setIsSearching(false)}
                  />
                </form>
              </li>
            </ul>
            <AccountMenu
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              handleLogout={handleLogout}
              user={user}
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;

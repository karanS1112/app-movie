import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-3 text-bg-dark sticky-sm-top">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          {/* <a
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a> */}

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <NavLink
                to="/"
                className={(e) =>
                  e.isActive
                    ? "nav-link px-2 text-warning active"
                    : "nav-link px-2 text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/nowplaying"
                className={(e) =>
                  e.isActive
                    ? "nav-link px-2 text-warning active"
                    : "nav-link px-2 text-white"
                }
              >
                Now Playing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/upcoming"
                className={(e) =>
                  e.isActive
                    ? "nav-link px-2 text-warning active"
                    : "nav-link px-2 text-white"
                }
              >
                Up Coming
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/toprated"
                className={(e) =>
                  e.isActive
                    ? "nav-link px-2 text-warning active"
                    : "nav-link px-2 text-white"
                }
              >
                Top Rated
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/popular"
                className={(e) =>
                  e.isActive
                    ? "nav-link px-2 text-warning active"
                    : "nav-link px-2 text-white"
                }
              >
                Popuplar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={(e) =>
                  e.isActive
                    ? "nav-link px-2 text-warning active"
                    : "nav-link px-2 text-white"
                }
              >
                About
              </NavLink>
            </li>
          </ul>

          {/* <form
            className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3"
            role="search"
          >
            <input
              type="search"
              className="form-control form-control-dark text-bg-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form> */}

          {/* <div className="text-end">
            <button type="button" className="btn btn-outline-light me-2">
              Login
            </button>
            <button type="button" className="btn btn-warning">
              Sign-up
            </button>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;

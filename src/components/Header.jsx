import React from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";

const Header = (props) => {
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

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 animation-hader-menu">
            <li>
              <NavLink
                to="/"
                className={(e) =>
                  e.isActive
                    ? "nav-link p-2 text-warning active"
                    : "nav-link p-2 text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movie/now-playing"
                className={(e) =>
                  e.isActive
                    ? "nav-link p-2 text-warning active"
                    : "nav-link p-2 text-white"
                }
              >
                Now Playing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movie/up-coming"
                className={(e) =>
                  e.isActive
                    ? "nav-link p-2 text-warning active"
                    : "nav-link p-2 text-white"
                }
              >
                Upcoming
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movie/top-rated"
                className={(e) =>
                  e.isActive
                    ? "nav-link p-2 text-warning active"
                    : "nav-link p-2 text-white"
                }
              >
                Top Rated
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/movie/popular"
                className={(e) =>
                  e.isActive
                    ? "nav-link p-2 text-warning active"
                    : "nav-link p-2 text-white"
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
                    ? "nav-link p-2 text-warning active"
                    : "nav-link p-2 text-white"
                }
              >
                About
              </NavLink>
            </li>
          </ul>

          <Search />

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

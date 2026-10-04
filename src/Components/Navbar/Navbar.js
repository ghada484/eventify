import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <span className="logo-icon">✦</span>

          <span className="logo-text">
            Event<span>ify</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav
          className={`navbar-menu ${
            menuOpen ? "active" : ""
          }`}
        >
          <Link
            to="/"
            className={`navbar-link ${isActive("/")}`}
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/events"
            className={`navbar-link ${isActive("/events")}`}
            onClick={closeMenu}
          >
            Events
          </Link>

          <Link
            to="/categories"
            className={`navbar-link ${isActive("/categories")}`}
            onClick={closeMenu}
          >
            Categories
          </Link>

          <Link
            to="/about"
            className={`navbar-link ${isActive("/about")}`}
            onClick={closeMenu}
          >
            About
          </Link>

          {/* User Navigation */}
          {isAuthenticated &&
            user?.role === "User" && (
              <Link
                to="/my-bookings"
                className={`navbar-link ${isActive(
                  "/my-bookings"
                )}`}
                onClick={closeMenu}
              >
                My Bookings
              </Link>
            )}

          {/* Organizer Navigation */}
          {isAuthenticated &&
            user?.role === "Organizer" && (
              <Link
                to="/organizer-dashboard"
                className={`navbar-link ${isActive(
                  "/organizer-dashboard"
                )}`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            )}

          {/* Profile - Available for both roles */}
          {isAuthenticated && (
            <Link
              to="/profile"
              className={`navbar-link ${isActive(
                "/profile"
              )}`}
              onClick={closeMenu}
            >
              Profile
            </Link>
          )}
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="navbar-login"
                onClick={closeMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn-primary navbar-btn"
                onClick={closeMenu}
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              {/* User Info */}
              <div className="navbar-user">
                <span className="navbar-user-avatar">
                  {user?.name
                    ?.charAt(0)
                    .toUpperCase()}
                </span>

                <span className="navbar-user-name">
                  {user?.name}
                </span>
              </div>

              {/* Logout */}
              <button
                className="navbar-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}

export default Navbar;


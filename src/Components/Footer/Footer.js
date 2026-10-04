import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-main">

          {/* =========================
              BRAND
          ========================= */}

          <div className="footer-brand">

            <Link
              to="/"
              className="footer-logo"
            >
              <span className="footer-logo-icon">
                ✦
              </span>

              <span>
                Event<span>ify</span>
              </span>
            </Link>

            <p>
              Discover amazing events, book your
              tickets, and create unforgettable
              experiences with Eventify.
            </p>
          </div>


          {/* =========================
              QUICK LINKS
          ========================= */}

          <div className="footer-column">

            <h3>
              Explore
            </h3>

            <Link to="/">
              Home
            </Link>

            <Link to="/events">
              All Events
            </Link>

            <Link to="/categories">
              Categories
            </Link>

            <Link to="/about">
              About Us
            </Link>

          </div>


          {/* =========================
              ACCOUNT
          ========================= */}

          <div className="footer-column">

            <h3>
              Account
            </h3>

            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Create Account
            </Link>

            <Link to="/profile">
              My Profile
            </Link>

            <Link to="/my-bookings">
              My Bookings
            </Link>

          </div>


          {/* =========================
              ORGANIZERS
          ========================= */}

          <div className="footer-column">

            <h3>
              For Organizers
            </h3>

            <Link to="/organizer-dashboard">
              Organizer Dashboard
            </Link>

            <Link to="/create-event">
              Create Event
            </Link>

            <Link to="/manage-events">
              Manage Events
            </Link>

            <Link to="/manage-bookings">
              Manage Bookings
            </Link>

          </div>

        </div>


        {/* =========================
            FOOTER BOTTOM
        ========================= */}

        <div className="footer-bottom">

          <p>
            © {currentYear} Eventify.
            All rights reserved.
          </p>

          <div className="footer-bottom-links">

            <Link to="/about">
              Privacy
            </Link>

            <Link to="/about">
              Terms
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;


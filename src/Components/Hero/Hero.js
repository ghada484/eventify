import { Link } from "react-router-dom";

import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">

        <div className="hero-content">

          <span className="hero-badge">
            Discover. Book. Experience.
          </span>

          <h1 className="hero-title">
            Find Your Next
            <span> Unforgettable </span>
            Event
          </h1>

          <p className="hero-description">
            Discover concerts, workshops, courses, sports events,
            and conferences happening around you.
          </p>

          <div className="hero-actions">

            <Link to="/events" className="btn-primary hero-btn">
              Explore Events
            </Link>

            <Link to="/categories" className="hero-secondary-btn">
              Browse Categories
            </Link>

          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>500+</strong>
              <span>Events</span>
            </div>

            <div className="hero-stat">
              <strong>50+</strong>
              <span>Locations</span>
            </div>

            <div className="hero-stat">
              <strong>10K+</strong>
              <span>Attendees</span>
            </div>
          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-image-wrapper">

            <img
              src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80"
              alt="People enjoying an event"
              className="hero-image"
            />

            <div className="hero-image-overlay"></div>

            <div className="hero-event-card">

              <span className="event-card-label">
                Happening Soon
              </span>

              <h3>
                Summer Music Festival
              </h3>

              <p>
                📍 Cairo, Egypt
              </p>

              <div className="event-card-bottom">
                <span>Jun 28, 2026</span>
                <strong>From $25</strong>
              </div>

            </div>

          </div>

          <div className="hero-floating-card">
            <span className="floating-icon">✦</span>

            <div>
              <strong>Easy Booking</strong>
              <span>Book your ticket in seconds</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useEvents } from "../../context/EventsContext";

import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const { getEventById } = useEvents();

  const event = getEventById(id);

  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return (
      <main className="event-not-found">

        <div className="container">

          <div className="not-found-content">

            <span className="not-found-icon">
              ◌
            </span>

            <h1>
              Event Not Found
            </h1>

            <p>
              The event you're looking for doesn't exist
              or may have been removed.
            </p>

            <Link
              to="/events"
              className="btn-primary"
            >
              Explore Events
            </Link>

          </div>

        </div>

      </main>
    );
  }

  const totalPrice = event.price * quantity;

  const increaseQuantity = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <main className="event-details-page">

      <section className="event-details-hero">

        <div className="container">

          <Link
            to="/events"
            className="back-link"
          >
            Back to Events
          </Link>


          <div className="event-hero-grid">

            <div className="event-main-image">

              <img
                src={event.image}
                alt={event.title}
              />

              <span className="event-detail-category">
                {event.category}
              </span>

            </div>


            <div className="event-hero-info">

              <span className="event-detail-label">
                UPCOMING EVENT
              </span>

              <h1>
                {event.title}
              </h1>

              <p className="event-hero-description">
                {event.description}
              </p>


              <div className="event-meta">

                <div className="event-meta-item">

                  <span className="meta-icon">
                    ◷
                  </span>

                  <div>
                    <span>Date</span>
                    <strong>{event.date}</strong>
                  </div>

                </div>


                <div className="event-meta-item">

                  <span className="meta-icon">
                    ◴
                  </span>

                  <div>
                    <span>Time</span>
                    <strong>{event.time}</strong>
                  </div>

                </div>


                <div className="event-meta-item">

                  <span className="meta-icon">
                    ⌖
                  </span>

                  <div>
                    <span>Location</span>
                    <strong>{event.location}</strong>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      <section className="event-content-section section">

        <div className="container event-content-grid">


          <div className="event-information">


            <div className="event-info-block">

              <span className="section-label">
                ABOUT THE EVENT
              </span>

              <h2>
                About This Event
              </h2>

              <p>
                {event.description}
              </p>

              <p>
                Join us for an exciting experience designed
                for people who want to discover something new,
                connect with others, and enjoy an unforgettable
                event.
              </p>

            </div>


            <div className="event-info-block">

              <span className="section-label">
                EVENT INFORMATION
              </span>

              <h2>
                What You Need to Know
              </h2>


              <div className="info-list">

                <div className="info-row">

                  <span>
                    Category
                  </span>

                  <strong>
                    {event.category}
                  </strong>

                </div>


                <div className="info-row">

                  <span>
                    Location
                  </span>

                  <strong>
                    {event.location}
                  </strong>

                </div>


                <div className="info-row">

                  <span>
                    Available Seats
                  </span>

                  <strong>
                    {event.availableSeats}
                  </strong>

                </div>


                <div className="info-row">

                  <span>
                    Ticket Price
                  </span>

                  <strong>
                    ${event.price}
                  </strong>

                </div>

              </div>

            </div>


            <div className="organizer-card">

              <div className="organizer-avatar">
                E
              </div>

              <div>

                <span>
                  Organized by
                </span>

                <h3>
                  Eventify Events
                </h3>

                <p>
                  Professional event organizer
                </p>

              </div>

            </div>

          </div>


          <aside className="booking-card">

            <div className="booking-card-header">

              <span>
                Tickets
              </span>

              <strong>
                ${event.price}
                <small>
                  {" "}
                  / person
                </small>
              </strong>

            </div>


            <div className="booking-divider"></div>


            <div className="seats-info">

              <span className="seats-dot"></span>

              <span>
                {event.availableSeats} seats available
              </span>

            </div>


            <div className="ticket-selector">

              <div>

                <span className="selector-label">
                  Number of tickets
                </span>

                <small>
                  Maximum 10 tickets
                </small>

              </div>


              <div className="quantity-control">

                <button
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                >
                  −
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  onClick={increaseQuantity}
                  disabled={quantity === 10}
                >
                  +
                </button>

              </div>

            </div>


            <div className="booking-summary">

              <div>

                <span>
                  {quantity} × Ticket
                </span>

                <strong>
                  ${totalPrice}
                </strong>

              </div>


              <div className="summary-total">

                <span>
                  Total
                </span>

                <strong>
                  ${totalPrice}
                </strong>

              </div>

            </div>


            <Link
              to={`/booking/${event.id}?quantity=${quantity}`}
              className="btn-primary booking-btn"
            >
              Book Now
            </Link>


            <p className="booking-note">
              Secure booking · Instant confirmation
            </p>

          </aside>

        </div>

      </section>

    </main>
  );
}

export default EventDetails;
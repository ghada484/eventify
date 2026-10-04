import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useBooking } from "../../context/BookingContext";

import "./MyBookings.css";

function MyBookings() {
  const { user } = useAuth();

  const {
    getUserBookings,
    cancelBooking,
  } = useBooking();

  const [filter, setFilter] = useState("All");

  const userBookings = getUserBookings(
    user?.id,
    user?.email
  );

  const filteredBookings = userBookings.filter(
    (booking) => {
      if (filter === "All") {
        return true;
      }

      return booking.status === filter;
    }
  );

  const handleCancel = (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    cancelBooking(bookingId);
  };

  return (
    <main className="my-bookings-page">

      <section className="my-bookings-header">
        <div className="container">

          <span className="section-label">
            YOUR ACCOUNT
          </span>

          <h1>
            My <span>Bookings</span>
          </h1>

          <p>
            Keep track of your upcoming and past event bookings.
          </p>

        </div>
      </section>

      <section className="my-bookings-section section">
        <div className="container">

          <div className="my-bookings-top">

            <div>
              <span className="section-label">
                TICKETS
              </span>

              <h2>
                Your Bookings
              </h2>
            </div>

            <Link
              to="/events"
              className="btn-primary"
            >
              Explore Events
            </Link>

          </div>

          <div className="booking-filters">

            {["All", "Confirmed", "Cancelled"].map(
              (status) => (
                <button
                  key={status}
                  className={
                    filter === status
                      ? "booking-filter active"
                      : "booking-filter"
                  }
                  onClick={() => setFilter(status)}
                >
                  {status}

                  <span>
                    {status === "All"
                      ? userBookings.length
                      : userBookings.filter(
                          (booking) =>
                            booking.status === status
                        ).length}
                  </span>
                </button>
              )
            )}

          </div>

          {filteredBookings.length === 0 ? (
            <div className="my-bookings-empty">

              <div className="empty-booking-icon">
                ◷
              </div>

              <h3>
                No Bookings Found
              </h3>

              <p>
                You don't have any bookings in this category yet.
              </p>

              <Link
                to="/events"
                className="btn-primary"
              >
                Browse Events
              </Link>

            </div>
          ) : (
            <div className="my-bookings-list">

              {filteredBookings.map((booking) => (

                <article
                  className="my-booking-card"
                  key={booking.bookingId}
                >

                  <div className="my-booking-image">
                    <img
                      src={booking.eventImage}
                      alt={booking.eventTitle}
                    />
                  </div>

                  <div className="my-booking-info">

                    <span className="booking-category">
                      {booking.category}
                    </span>

                    <h3>
                      {booking.eventTitle}
                    </h3>

                    <p>
                      {booking.location}
                    </p>

                    <div className="booking-meta">

                      <span>
                        {booking.date}
                      </span>

                      <span>
                        {booking.time}
                      </span>

                    </div>

                  </div>

                  <div className="my-booking-tickets">

                    <span>
                      Tickets
                    </span>

                    <strong>
                      {booking.quantity}
                    </strong>

                  </div>

                  <div className="my-booking-total">

                    <span>
                      Total
                    </span>

                    <strong>
                      ${booking.totalPrice}
                    </strong>

                  </div>

                  <div className="my-booking-actions">

                    <span
                      className={
                        booking.status ===
                        "Confirmed"
                          ? "booking-status confirmed"
                          : "booking-status cancelled"
                      }
                    >
                      {booking.status}
                    </span>

                    <Link
                      to={`/my-bookings/${booking.bookingId}`}
                      className="view-booking-btn"
                    >
                      View Details
                    </Link>

                    {booking.status ===
                      "Confirmed" && (
                      <button
                        className="cancel-booking-btn"
                        onClick={() =>
                          handleCancel(
                            booking.bookingId
                          )
                        }
                      >
                        Cancel Booking
                      </button>
                    )}

                  </div>

                </article>

              ))}

            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default MyBookings;
import { Link, useNavigate, useParams } from "react-router-dom";

import { useBooking } from "../../context/BookingContext";

import "./BookingDetails.css";

function BookingDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const {
    getBookingById,
    cancelBooking,
  } = useBooking();

  const booking = getBookingById(bookingId);

  const handleCancel = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    cancelBooking(booking.bookingId);
  };

  if (!booking) {
    return (
      <main className="booking-details-page">
        <div className="container">

          <div className="booking-details-empty">

            <div className="details-empty-icon">
              ◌
            </div>

            <h1>
              Booking Not Found
            </h1>

            <p>
              We couldn't find the booking you're looking for.
            </p>

            <Link
              to="/my-bookings"
              className="btn-primary"
            >
              Back to My Bookings
            </Link>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="booking-details-page">

      {/* HEADER */}
      <section className="booking-details-header">

        <div className="container">

          <Link
            to="/my-bookings"
            className="details-back-link"
          >
            Back to My Bookings
          </Link>

          <span className="section-label">
            BOOKING DETAILS
          </span>

          <h1>
            Your <span>Digital Ticket</span>
          </h1>

          <p>
            Keep your booking information ready for the event.
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="booking-details-section section">

        <div className="container booking-details-grid">

          {/* TICKET */}
          <div className="digital-ticket">

            <div className="ticket-event-image">

              <img
                src={booking.eventImage}
                alt={booking.eventTitle}
              />

              <div className="ticket-image-overlay"></div>

              <span className="ticket-category">
                {booking.eventCategory}
              </span>

            </div>

            <div className="digital-ticket-content">

              <div className="ticket-title-row">

                <div>
                  <span className="ticket-label">
                    EVENT
                  </span>

                  <h2>
                    {booking.eventTitle}
                  </h2>
                </div>

                <span
                  className={`ticket-status ${
                    booking.status === "Cancelled"
                      ? "cancelled"
                      : ""
                  }`}
                >
                  {booking.status}
                </span>

              </div>

              <div className="ticket-info-grid">

                <div className="ticket-info">

                  <span>Date</span>

                  <strong>
                    {booking.eventDate}
                  </strong>

                </div>

                <div className="ticket-info">

                  <span>Time</span>

                  <strong>
                    {booking.eventTime}
                  </strong>

                </div>

                <div className="ticket-info">

                  <span>Location</span>

                  <strong>
                    {booking.eventLocation}
                  </strong>

                </div>

                <div className="ticket-info">

                  <span>Tickets</span>

                  <strong>
                    {booking.quantity}
                  </strong>

                </div>

              </div>

              <div className="ticket-divider"></div>

              <div className="ticket-reference">

                <div>

                  <span>
                    Booking Reference
                  </span>

                  <strong>
                    {booking.bookingId}
                  </strong>

                </div>

                <div className="qr-code-large">

                  <div className="qr-grid">

                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>

                  </div>

                </div>

              </div>

              <p className="qr-note">
                Show this ticket at the event entrance.
              </p>

            </div>

          </div>

          {/* SUMMARY */}
          <aside className="details-summary">

            <div className="summary-heading">

              <span className="section-label">
                BOOKING SUMMARY
              </span>

              <h2>
                Reservation Details
              </h2>

            </div>

            <div className="customer-details">

              <div className="customer-detail">

                <span>
                  Full Name
                </span>

                <strong>
                  {booking.customer.fullName}
                </strong>

              </div>

              <div className="customer-detail">

                <span>
                  Email
                </span>

                <strong>
                  {booking.customer.email}
                </strong>

              </div>

              <div className="customer-detail">

                <span>
                  Phone
                </span>

                <strong>
                  {booking.customer.phone}
                </strong>

              </div>

            </div>

            <div className="summary-divider"></div>

            <div className="price-row">

              <span>
                Ticket Price
              </span>

              <strong>
                ${booking.eventPrice || booking.totalPrice / booking.quantity}
              </strong>

            </div>

            <div className="price-row">

              <span>
                Quantity
              </span>

              <strong>
                × {booking.quantity}
              </strong>

            </div>

            <div className="total-row">

              <span>
                Total
              </span>

              <strong>
                ${booking.totalPrice}
              </strong>

            </div>

            {booking.status === "Confirmed" && (

              <button
                className="cancel-details-btn"
                onClick={handleCancel}
              >
                Cancel Booking
              </button>

            )}

            {booking.status === "Cancelled" && (

              <div className="cancelled-message">

                <span>✓</span>

                <p>
                  This booking has been cancelled.
                </p>

              </div>

            )}

            <button
              className="back-events-btn"
              onClick={() => navigate("/events")}
            >
              Explore More Events
            </button>

          </aside>

        </div>

      </section>

    </main>
  );
}

export default BookingDetails;


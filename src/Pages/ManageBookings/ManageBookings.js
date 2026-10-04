import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useBooking } from "../../context/BookingContext";
import { useEvents } from "../../context/EventsContext";
import { useToast } from "../../context/ToastContext";

import "./ManageBookings.css";

function ManageBookings() {
  const { user } = useAuth();

  const { bookings, cancelBooking } = useBooking();

  const { getOrganizerEvents } = useEvents();

  const { showToast } = useToast();

  const [filter, setFilter] = useState("All");

  // Booking that is waiting for confirmation
  const [bookingToCancel, setBookingToCancel] =
    useState(null);

  // Get current organizer's events
  const organizerEvents = getOrganizerEvents(
    user?.id,
    user?.email
  );

  // Get IDs of organizer's events
  const organizerEventIds = organizerEvents.map(
    (event) => Number(event.id)
  );

  // Get bookings for organizer's events only
  const organizerBookings = bookings.filter(
    (booking) =>
      organizerEventIds.includes(
        Number(booking.eventId)
      )
  );

  // Apply status filter
  const filteredBookings =
    organizerBookings.filter((booking) => {
      if (filter === "All") {
        return true;
      }

      return booking.status === filter;
    });

  // Open confirmation modal
  const handleCancelClick = (booking) => {
    setBookingToCancel(booking);
  };

  // Close confirmation modal
  const handleCloseModal = () => {
    setBookingToCancel(null);
  };

  // Confirm cancellation
  const handleConfirmCancel = () => {
    if (!bookingToCancel) {
      return;
    }

    cancelBooking(
      bookingToCancel.bookingId
    );

    showToast(
      "Booking cancelled successfully.",
      "success"
    );

    setBookingToCancel(null);
  };

  // Get event details
  const getEvent = (eventId) => {
    return organizerEvents.find(
      (event) =>
        Number(event.id) === Number(eventId)
    );
  };

  return (
    <main className="manage-bookings-page">

      {/* =========================
          HEADER
      ========================= */}

      <section className="manage-bookings-header">
        <div className="container">

          <Link
            to="/organizer-dashboard"
            className="manage-bookings-back"
          >
            Back to Dashboard
          </Link>

          <span className="section-label">
            BOOKING MANAGEMENT
          </span>

          <h1>
            Manage <span>Bookings</span>
          </h1>

          <p>
            View attendees and manage bookings
            for your events.
          </p>

        </div>
      </section>


      {/* =========================
          CONTENT
      ========================= */}

      <section className="manage-bookings-section section">
        <div className="container">

          <div className="manage-bookings-top">

            <div>
              <span className="section-label">
                ATTENDEES
              </span>

              <h2>
                All Bookings
              </h2>
            </div>

            <div className="bookings-total">
              {organizerBookings.length} Bookings
            </div>

          </div>


          {/* =========================
              FILTERS
          ========================= */}

          <div className="booking-filters">

            {[
              "All",
              "Confirmed",
              "Cancelled",
            ].map((status) => (

              <button
                key={status}
                className={
                  filter === status
                    ? "booking-filter active"
                    : "booking-filter"
                }
                onClick={() =>
                  setFilter(status)
                }
              >
                {status}

                <span>
                  {status === "All"
                    ? organizerBookings.length
                    : organizerBookings.filter(
                        (booking) =>
                          booking.status ===
                          status
                      ).length}
                </span>
              </button>

            ))}

          </div>


          {/* =========================
              EMPTY STATE
          ========================= */}

          {filteredBookings.length === 0 ? (

            <div className="manage-bookings-empty">

              <div className="empty-booking-icon">
                ◷
              </div>

              <h3>
                No Bookings Found
              </h3>

              <p>
                There are no bookings for your
                events in this category yet.
              </p>

            </div>

          ) : (

            <div className="manage-bookings-list">

              {filteredBookings.map(
                (booking) => {

                  const event = getEvent(
                    booking.eventId
                  );

                  return (
                    <article
                      className="manage-booking-card"
                      key={booking.bookingId}
                    >

                      {/* Event */}

                      <div className="booking-event">

                        {event?.image && (
                          <img
                            src={event.image}
                            alt={event.title}
                          />
                        )}

                        <div>

                          <span className="booking-category">
                            {event?.category ||
                              booking.category ||
                              "Event"}
                          </span>

                          <h3>
                            {booking.eventTitle ||
                              event?.title ||
                              "Event"}
                          </h3>

                          <p>
                            {event?.date ||
                              booking.date}
                          </p>

                        </div>

                      </div>


                      {/* Attendee */}

                      <div className="booking-attendee">

                        <span className="booking-label">
                          ATTENDEE
                        </span>

                        <strong>
                          {booking.customer
                            ?.fullName ||
                            booking.customer
                              ?.name ||
                            booking.fullName ||
                            "Guest"}
                        </strong>

                        <span>
                          {booking.customer
                            ?.email ||
                            booking.email ||
                            "No email"}
                        </span>

                        <span>
                          {booking.customer
                            ?.phone ||
                            booking.phone ||
                            "No phone"}
                        </span>

                      </div>


                      {/* Booking Info */}

                      <div className="booking-info">

                        <span className="booking-label">
                          BOOKING
                        </span>

                        <span>
                          Reference
                        </span>

                        <strong>
                          {booking.bookingId}
                        </strong>

                        <span>
                          Tickets:{" "}
                          {booking.quantity ||
                            1}
                        </span>

                        <span>
                          Total: $
                          {booking.totalPrice ||
                            0}
                        </span>

                      </div>


                      {/* Status */}

                      <div className="booking-status-column">

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

                        {booking.status ===
                          "Confirmed" && (

                          <button
                            className="cancel-booking-btn"
                            onClick={() =>
                              handleCancelClick(
                                booking
                              )
                            }
                          >
                            Cancel Booking
                          </button>

                        )}

                      </div>

                    </article>
                  );
                }
              )}

            </div>

          )}

        </div>
      </section>


      {/* =========================
          CONFIRMATION MODAL
      ========================= */}

      {bookingToCancel && (

        <div
          className="confirmation-overlay"
          onClick={handleCloseModal}
        >

          <div
            className="confirmation-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="confirmation-icon">
              !
            </div>

            <h2>
              Cancel Booking?
            </h2>

            <p>
              Are you sure you want to cancel this
              booking?
            </p>

            <div className="confirmation-booking-info">

              <strong>
                {bookingToCancel.eventTitle ||
                  "Event"}
              </strong>

              <span>
                {bookingToCancel.quantity || 1}{" "}
                ticket
                {(bookingToCancel.quantity || 1) > 1
                  ? "s"
                  : ""}
              </span>

            </div>

            <div className="confirmation-actions">

              <button
                className="confirmation-keep"
                onClick={handleCloseModal}
              >
                Keep Booking
              </button>

              <button
                className="confirmation-cancel"
                onClick={handleConfirmCancel}
              >
                Yes, Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

export default ManageBookings;


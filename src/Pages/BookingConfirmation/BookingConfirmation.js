import { useEffect, useRef  , useState} from "react";
import { Link, useLocation} from "react-router-dom";

import { useBooking } from "../../context/BookingContext";

import "./BookingConfirmation.css";

function BookingConfirmation() {

  const location = useLocation();

  const { createBooking } = useBooking();

  const bookingCreated = useRef(false);
  const [booking, setBooking] = useState(null);

  const bookingData = location.state;

  useEffect(() => {
    if (!bookingData || bookingCreated.current) {
      return;
    }

    const { event, quantity, totalPrice, customer } =
      bookingData;

    const newBooking = createBooking({
      eventId: event.id,
      eventTitle: event.title,
      eventImage: event.image,
      category: event.category,
      date: event.date,
      time: event.time,
      location: event.location,
      price: event.price,
      quantity,
      totalPrice,
      customer,
    });

    setBooking(newBooking);

    bookingCreated.current = true;
  }, [bookingData, createBooking]);

  if (!bookingData) {
    return (
      <main className="booking-confirmation-page">
        <section className="confirmation-empty">
          <div className="container">
            <div className="confirmation-empty-icon">
              !
            </div>

            <h1>Booking Not Found</h1>

            <p>
              We couldn't find the booking information.
            </p>

            <Link
              to="/events"
              className="btn-primary"
            >
              Browse Events
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const {
    event,
    quantity,
    totalPrice,
    customer,
  } = bookingData;

  return (
    <main className="booking-confirmation-page">
      <section className="confirmation-header">
        <div className="container">
          <div className="confirmation-icon">
            ✓
          </div>

          <span className="section-label">
            BOOKING CONFIRMED
          </span>

          <h1>
            You're <span>All Set!</span>
          </h1>

          <p>
            Your booking has been confirmed successfully.
          </p>
        </div>
      </section>

      <section className="confirmation-section section">
        <div className="container">
          <div className="confirmation-ticket">

            <div className="ticket-event">
              <img
                src={event.image}
                alt={event.title}
              />

              <div className="ticket-event-info">
                <span className="ticket-category">
                  {event.category}
                </span>

                <h2>{event.title}</h2>

                <p>{event.location}</p>
              </div>
            </div>

            <div className="ticket-divider"></div>

            <div className="ticket-details">

              <div className="ticket-detail">
                <span>Date</span>
                <strong>{event.date}</strong>
              </div>

              <div className="ticket-detail">
                <span>Time</span>
                <strong>{event.time}</strong>
              </div>

              <div className="ticket-detail">
                <span>Tickets</span>
                <strong>{quantity}</strong>
              </div>

              <div className="ticket-detail">
                <span>Total</span>
                <strong>${totalPrice}</strong>
              </div>

            </div>

            <div className="ticket-divider"></div>

            <div className="ticket-bottom">

              <div className="customer-info">
                <span className="ticket-label">
                  CUSTOMER
                </span>

                <strong>
                  {customer.fullName}
                </strong>

                <span>
                  {customer.email}
                </span>

                <span>
                  {customer.phone}
                </span>
              </div>

              <div className="qr-code">
                <div className="qr-pattern">
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

                <small>
                  Scan at entry
                </small>
              </div>

            </div>

            <div className="ticket-reference">
              <span>Booking Reference</span>

              <strong>
                {booking?.bookingId || "Generating..."}
              </strong>
            </div>

          </div>

          <div className="confirmation-actions">
            <Link
              to="/my-bookings"
              className="btn-primary"
            >
              View My Bookings
            </Link>

            <Link
              to="/events"
              className="btn-secondary"
            >
              Explore More Events
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}

export default BookingConfirmation;
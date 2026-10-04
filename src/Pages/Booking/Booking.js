import { useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { useEvents } from "../../context/EventsContext";
import { useAuth } from "../../context/AuthContext";

import "./Booking.css";

function Booking() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { getEventById } = useEvents();
  const { user, isAuthenticated } = useAuth();

  const event = getEventById(id);

  const initialQuantity = Math.max(
    1,
    Number(searchParams.get("quantity")) || 1
  );

  const [quantity, setQuantity] = useState(
    initialQuantity
  );

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
  });

  const [error, setError] = useState("");

  if (!event) {
    return (
      <main className="booking-page">
        <section className="booking-not-found">
          <div className="container">
            <h1>Event Not Found</h1>

            <p>
              The event you're trying to book doesn't exist.
            </p>

            <button
              className="btn-primary"
              onClick={() => navigate("/events")}
            >
              Browse Events
            </button>
          </div>
        </section>
      </main>
    );
  }

  const totalPrice = event.price * quantity;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const increaseQuantity = () => {
    if (quantity < event.availableSeats) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (quantity > event.availableSeats) {
      setError(
        "The selected quantity is not available."
      );
      return;
    }

    navigate(`/booking-confirmation/${event.id}`, {
      state: {
        event,
        quantity,
        totalPrice,
        customer: {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        },
      },
    });
  };

  return (
    <main className="booking-page">

      <section className="booking-header">
        <div className="container">

          <span className="section-label">
            EVENT BOOKING
          </span>

          <h1>
            Complete Your <span>Booking</span>
          </h1>

          <p>
            Enter your details and confirm your tickets.
          </p>

        </div>
      </section>

      <section className="booking-section section">
        <div className="container">

          <div className="booking-layout">

            {/* FORM */}

            <div className="booking-form-card">

              <div className="booking-card-header">

                <span className="section-label">
                  ATTENDEE DETAILS
                </span>

                <h2>
                  Your Information
                </h2>

                <p>
                  We'll use these details for your booking.
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label htmlFor="fullName">
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {error && (
                  <div className="booking-error">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-primary booking-submit"
                >
                  Continue to Confirmation
                </button>

              </form>

            </div>

            {/* SUMMARY */}

            <aside className="booking-summary-card">

              <div className="booking-event-preview">

                <img
                  src={event.image}
                  alt={event.title}
                />

                <div>
                  <span className="booking-event-category">
                    {event.category}
                  </span>

                  <h3>
                    {event.title}
                  </h3>
                </div>

              </div>

              <div className="booking-summary-details">

                <div>
                  <span>Date</span>
                  <strong>{event.date}</strong>
                </div>

                <div>
                  <span>Time</span>
                  <strong>{event.time}</strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>{event.location}</strong>
                </div>

              </div>

              <div className="booking-quantity">

                <span>
                  Tickets
                </span>

                <div className="quantity-controls">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>

                  <strong>
                    {quantity}
                  </strong>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={
                      quantity >= event.availableSeats
                    }
                  >
                    +
                  </button>

                </div>

              </div>

              <div className="booking-price">

                <div>
                  <span>
                    Price per ticket
                  </span>

                  <strong>
                    ${event.price}
                  </strong>
                </div>

                <div className="booking-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ${totalPrice}
                  </strong>

                </div>

              </div>

            </aside>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Booking;
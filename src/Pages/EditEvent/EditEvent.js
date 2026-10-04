import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useEvents } from "../../context/EventsContext";

import "./EditEvent.css";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getEventById, updateEvent } = useEvents();

  const event = getEventById(id);

  const [formData, setFormData] = useState({
    title: "",
    category: "Music",
    location: "",
    date: "",
    time: "",
    price: "",
    availableSeats: "",
    image: "",
    description: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        category: event.category || "Music",
        location: event.location || "",
        date: event.date || "",
        time: event.time || "",
        price: event.price || "",
        availableSeats: event.availableSeats || "",
        image: event.image || "",
        description: event.description || "",
      });
    }
  }, [event]);

  if (!event) {
    return (
      <main className="edit-event-page">
        <section className="edit-event-not-found">
          <div className="container">
            <h1>Event Not Found</h1>

            <p>
              The event you're trying to edit doesn't exist.
            </p>

            <Link
              to="/manage-events"
              className="btn-primary"
            >
              Back to Events
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.location.trim() ||
      !formData.date ||
      !formData.time ||
      !formData.price ||
      !formData.availableSeats ||
      !formData.description.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (Number(formData.price) <= 0) {
      setError("Ticket price must be greater than 0.");
      return;
    }

    if (Number(formData.availableSeats) <= 0) {
      setError("Available seats must be greater than 0.");
      return;
    }

    updateEvent(event.id, {
      title: formData.title.trim(),
      category: formData.category,
      location: formData.location.trim(),
      date: formData.date,
      time: formData.time,
      price: Number(formData.price),
      availableSeats: Number(formData.availableSeats),
      image:
        formData.image.trim() ||
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
      description: formData.description.trim(),
    });

    navigate(`/events/${event.id}`);
  };

  return (
    <main className="edit-event-page">

      <section className="edit-event-header">
        <div className="container">

          <Link
            to="/manage-events"
            className="edit-event-back"
          >
            Back to Manage Events
          </Link>

          <span className="section-label">
            EVENT MANAGEMENT
          </span>

          <h1>
            Edit <span>Event</span>
          </h1>

          <p>
            Update your event information and keep everything
            accurate for your attendees.
          </p>

        </div>
      </section>

      <section className="edit-event-section section">
        <div className="container">

          <form
            className="edit-event-form"
            onSubmit={handleSubmit}
          >

            {/* BASIC INFORMATION */}

            <div className="form-card">

              <div className="form-card-header">
                <div>
                  <span className="section-label">
                    BASIC INFORMATION
                  </span>

                  <h2>
                    Event Details
                  </h2>

                  <p>
                    Update the main information about your event.
                  </p>
                </div>
              </div>

              <div className="form-grid">

                <div className="form-group full-width">
                  <label htmlFor="title">
                    Event Title *
                  </label>

                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">
                    Category *
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Music">Music</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Technology">
                      Technology
                    </option>
                    <option value="Sports">Sports</option>
                    <option value="Education">
                      Education
                    </option>
                    <option value="Business">Business</option>
                    <option value="Art">Art</option>
                    <option value="Conference">
                      Conference
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="location">
                    Location *
                  </label>

                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">
                    Date *
                  </label>

                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">
                    Time *
                  </label>

                  <input
                    id="time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </div>

            {/* TICKETS */}

            <div className="form-card">

              <div className="form-card-header">
                <div>
                  <span className="section-label">
                    TICKETS
                  </span>

                  <h2>
                    Ticket Information
                  </h2>

                  <p>
                    Update ticket pricing and available seats.
                  </p>
                </div>
              </div>

              <div className="form-grid">

                <div className="form-group">
                  <label htmlFor="price">
                    Ticket Price ($) *
                  </label>

                  <input
                    id="price"
                    type="number"
                    min="1"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="availableSeats">
                    Available Seats *
                  </label>

                  <input
                    id="availableSeats"
                    type="number"
                    min="1"
                    name="availableSeats"
                    value={formData.availableSeats}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </div>

            {/* IMAGE */}

            <div className="form-card">

              <div className="form-card-header">
                <div>
                  <span className="section-label">
                    EVENT MEDIA
                  </span>

                  <h2>
                    Event Image
                  </h2>

                  <p>
                    Update the image displayed for your event.
                  </p>
                </div>
              </div>

              <div className="form-group">

                <label htmlFor="image">
                  Image URL
                </label>

                <input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="https://example.com/event-image.jpg"
                  value={formData.image}
                  onChange={handleChange}
                />

                <small className="input-hint">
                  Leave empty to use the default event image.
                </small>

              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="form-card">

              <div className="form-card-header">
                <div>
                  <span className="section-label">
                    DESCRIPTION
                  </span>

                  <h2>
                    About Your Event
                  </h2>

                  <p>
                    Update the information attendees should know.
                  </p>
                </div>
              </div>

              <div className="form-group">

                <label htmlFor="description">
                  Description *
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows="6"
                  value={formData.description}
                  onChange={handleChange}
                />

              </div>
            </div>

            {error && (
              <div className="edit-event-error">
                {error}
              </div>
            )}

            <div className="edit-event-actions">

              <Link
                to="/manage-events"
                className="btn-secondary"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="btn-primary"
              >
                Save Changes
              </button>

            </div>

          </form>

        </div>
      </section>

    </main>
  );
}

export default EditEvent;
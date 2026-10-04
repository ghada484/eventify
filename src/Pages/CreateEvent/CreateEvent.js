import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useEvents } from "../../context/EventsContext";

import "./CreateEvent.css";

function CreateEvent() {
  const navigate = useNavigate();
  const { createEvent } = useEvents();

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

    const newEvent = createEvent({
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

    navigate(`/events/${newEvent.id}`);
  };

  return (
    <main className="create-event-page">

      <section className="create-event-header">

        <div className="container">

          <Link
            to="/organizer-dashboard"
            className="create-event-back"
          >
            Back to Dashboard
          </Link>

          <span className="section-label">
            EVENT MANAGEMENT
          </span>

          <h1>
            Create a New <span>Event</span>
          </h1>

          <p>
            Add your event details and make it available
            for people to discover and book.
          </p>

        </div>

      </section>


      <section className="create-event-section section">

        <div className="container">

          <form
            className="create-event-form"
            onSubmit={handleSubmit}
          >

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
                    Tell people what your event is about.
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
                    placeholder="e.g. Cairo Music Festival"
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
                    <option value="Music">
                      Music
                    </option>

                    <option value="Workshop">
                      Workshop
                    </option>

                    <option value="Technology">
                      Technology
                    </option>

                    <option value="Sports">
                      Sports
                    </option>

                    <option value="Education">
                      Education
                    </option>

                    <option value="Business">
                      Business
                    </option>

                    <option value="Art">
                      Art
                    </option>

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
                    placeholder="e.g. Cairo, Egypt"
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
                    Set the ticket price and available seats.
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
                    placeholder="e.g. 25"
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
                    placeholder="e.g. 200"
                    value={formData.availableSeats}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>


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
                    Add an image that represents your event.
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
                  Leave empty to use a default event image.
                </small>

              </div>

            </div>


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
                    Give attendees more information about the event.
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
                  placeholder="Describe your event, activities, speakers, or what attendees can expect..."
                  value={formData.description}
                  onChange={handleChange}
                />

              </div>

            </div>


            {error && (
              <div className="create-event-error">
                {error}
              </div>
            )}


            <div className="create-event-actions">

              <Link
                to="/organizer-dashboard"
                className="btn-secondary"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="btn-primary"
              >
                Create Event
              </button>

            </div>

          </form>

        </div>

      </section>

    </main>
  );
}

export default CreateEvent;
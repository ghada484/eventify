import { Link } from "react-router-dom";

import "./EventCard.css";

function EventCard({ event }) {
  return (
    <article className="event-card">

      <div className="event-card-image">

        <img
          src={event.image}
          alt={event.title}
        />

        <span className="event-category">
          {event.category}
        </span>

        <button
          className="favorite-btn"
          aria-label="Add event to favorites"
        >
          ♡
        </button>

      </div>

      <div className="event-card-content">

        <span className="event-date">
          {event.date}
        </span>

        <h3>{event.title}</h3>

        <p className="event-location">
          <span>⌖</span>
          {event.location}
        </p>

        <div className="event-card-footer">

          <div className="event-price">
            <span>From</span>
            <strong>${event.price}</strong>
          </div>

          <Link
            to={`/events/${event.id}`}
            className="event-action"
          >
            View Event
          </Link>

        </div>

      </div>

    </article>
  );
}

export default EventCard;
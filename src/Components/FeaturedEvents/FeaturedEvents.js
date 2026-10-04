import { Link } from "react-router-dom";

import "./FeaturedEvents.css";

const featuredEvents = [
  {
    id: 1,
    title: "Cairo Music Festival",
    category: "Music",
    date: "Oct 18, 2026",
    location: "Cairo, Egypt",
    price: 25,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    title: "Creative Design Workshop",
    category: "Workshop",
    date: "Oct 22, 2026",
    location: "Alexandria, Egypt",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    title: "Future Tech Conference",
    category: "Technology",
    date: "Oct 28, 2026",
    location: "New Cairo, Egypt",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=700&q=80",
  },
];

function FeaturedEvents() {
  return (
    <section className="featured-events section">
      <div className="container">

        <div className="featured-header">

          <div>
            <span className="section-label">
              DON'T MISS OUT
            </span>

            <h2 className="section-title">
              Featured Events
            </h2>

            <p className="section-subtitle">
              Explore some of the most exciting events happening around you.
            </p>
          </div>

          <Link to="/events" className="view-all-link">
            View All Events
          </Link>

        </div>

        <div className="featured-grid">

          {featuredEvents.map((event) => (
            <article className="event-card" key={event.id}>

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

                <div className="event-date">
                  {event.date}
                </div>

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
          ))}

        </div>

      </div>
    </section>
  );
}

export default FeaturedEvents;
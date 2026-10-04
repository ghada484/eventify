import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useEvents } from "../../context/EventsContext";

import "./ManageEvents.css";

function ManageEvents() {
  const { user } = useAuth();

  const {
    getOrganizerEvents,
    deleteEvent,
  } = useEvents();

  const organizerEvents = getOrganizerEvents(
    user?.id,
    user?.email
  );

  const handleDelete = (eventId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    deleteEvent(eventId);
  };

  return (
    <main className="manage-events-page">

      {/* Header */}

      <section className="manage-events-header">
        <div className="container">

          <Link
            to="/organizer-dashboard"
            className="manage-events-back"
          >
            Back to Dashboard
          </Link>

          <span className="section-label">
            EVENT MANAGEMENT
          </span>

          <h1>
            Manage <span>Events</span>
          </h1>

          <p>
            Create, edit, and manage your events from one place.
          </p>

        </div>
      </section>


      {/* Events */}

      <section className="manage-events-section section">
        <div className="container">

          <div className="manage-events-top">

            <div>
              <span className="section-label">
                YOUR EVENTS
              </span>

              <h2>
                All Events
              </h2>
            </div>

            <Link
              to="/create-event"
              className="btn-primary"
            >
              Create New Event
            </Link>

          </div>


          {organizerEvents.length === 0 ? (

            <div className="manage-events-empty">

              <div className="empty-event-icon">
                ✦
              </div>

              <h3>
                No Events Yet
              </h3>

              <p>
                You haven't created any events yet.
              </p>

              <Link
                to="/create-event"
                className="btn-primary"
              >
                Create Your First Event
              </Link>

            </div>

          ) : (

            <div className="manage-events-grid">

              {organizerEvents.map((event) => (

                <article
                  className="manage-event-card"
                  key={event.id}
                >

                  {/* Image */}

                  <div className="manage-event-image">

                    <img
                      src={event.image}
                      alt={event.title}
                    />

                    <span className="manage-event-category">
                      {event.category}
                    </span>

                  </div>


                  {/* Content */}

                  <div className="manage-event-content">

                    <h3>
                      {event.title}
                    </h3>

                    <p className="manage-event-location">
                      ⌖ {event.location}
                    </p>

                    <div className="manage-event-meta">

                      <div>
                        <span>Date</span>

                        <strong>
                          {event.date}
                        </strong>
                      </div>

                      <div>
                        <span>Seats</span>

                        <strong>
                          {event.availableSeats}
                        </strong>
                      </div>

                      <div>
                        <span>Price</span>

                        <strong>
                          ${event.price}
                        </strong>
                      </div>

                    </div>


                    {/* Actions */}

                    <div className="manage-event-actions">

                      <Link
                        to={`/events/${event.id}`}
                        className="manage-event-view"
                      >
                        View
                      </Link>

                      <Link
                        to={`/manage-events/edit/${event.id}`}
                        className="manage-event-edit"
                      >
                        Edit
                      </Link>

                      <button
                        className="manage-event-delete"
                        onClick={() =>
                          handleDelete(event.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

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

export default ManageEvents;
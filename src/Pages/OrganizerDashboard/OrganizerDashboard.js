import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useEvents } from "../../context/EventsContext";
import { useBooking } from "../../context/BookingContext";

import "./OrganizerDashboard.css";

function OrganizerDashboard() {
  const { user } = useAuth();

  const { bookings } = useBooking();

  const {
    getOrganizerEvents,
  } = useEvents();

  // Get current organizer's events
  const organizerEvents = getOrganizerEvents(
    user?.id,
    user?.email
  );

  // Get bookings for current organizer's events
  const organizerEventIds = organizerEvents.map(
    (event) => Number(event.id)
  );

  const organizerBookings = bookings.filter(
    (booking) =>
      organizerEventIds.includes(
        Number(booking.eventId)
      )
  );

  // Statistics
  const totalEvents = organizerEvents.length;

  const activeEvents = organizerEvents.filter(
    (event) => Number(event.availableSeats) > 0
  ).length;

  const totalBookings = organizerBookings.length;

  const confirmedBookings =
    organizerBookings.filter(
      (booking) =>
        booking.status === "Confirmed"
    ).length;

  const cancelledBookings =
    organizerBookings.filter(
      (booking) =>
        booking.status === "Cancelled"
    ).length;

  const totalAttendees =
    organizerBookings
      .filter(
        (booking) =>
          booking.status === "Confirmed"
      )
      .reduce(
        (total, booking) =>
          total +
          Number(booking.quantity || 0),
        0
      );

  const totalRevenue =
    organizerBookings
      .filter(
        (booking) =>
          booking.status === "Confirmed"
      )
      .reduce(
        (total, booking) =>
          total +
          Number(booking.totalPrice || 0),
        0
      );

  const recentBookings = [
    ...organizerBookings,
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <main className="organizer-dashboard">

      {/* Header */}

      <section className="dashboard-header">
        <div className="container dashboard-header-content">

          <div>
            <span className="section-label">
              ORGANIZER PANEL
            </span>

            <h1>
              Welcome back,
              <span>
                {" "}
                {user?.name || "Organizer"}
              </span>
            </h1>

            <p>
              Manage your events, bookings, and
              attendees from one simple dashboard.
            </p>
          </div>

          <Link
            to="/create-event"
            className="btn-primary dashboard-create-btn"
          >
            Create New Event
          </Link>

        </div>
      </section>


      {/* Dashboard Content */}

      <section className="dashboard-section section">
        <div className="container">

          {/* Statistics */}

          <div className="dashboard-stats">

            <div className="dashboard-stat-card">
              <div className="stat-icon coral">
                ✦
              </div>

              <div>
                <span>Total Events</span>

                <strong>
                  {totalEvents}
                </strong>

                <small>
                  Events created
                </small>
              </div>
            </div>


            <div className="dashboard-stat-card">
              <div className="stat-icon blue">
                ◷
              </div>

              <div>
                <span>Active Events</span>

                <strong>
                  {activeEvents}
                </strong>

                <small>
                  Currently available
                </small>
              </div>
            </div>


            <div className="dashboard-stat-card">
              <div className="stat-icon green">
                ✓
              </div>

              <div>
                <span>Attendees</span>

                <strong>
                  {totalAttendees}
                </strong>

                <small>
                  Confirmed tickets
                </small>
              </div>
            </div>


            <div className="dashboard-stat-card">
              <div className="stat-icon purple">
                $
              </div>

              <div>
                <span>Revenue</span>

                <strong>
                  ${totalRevenue}
                </strong>

                <small>
                  Confirmed bookings
                </small>
              </div>
            </div>

          </div>


          {/* Main Dashboard Grid */}

          <div className="dashboard-grid">

            {/* Recent Bookings */}

            <div className="dashboard-panel recent-panel">

              <div className="panel-header">

                <div>
                  <span className="section-label">
                    RECENT ACTIVITY
                  </span>

                  <h2>
                    Recent Bookings
                  </h2>
                </div>

                <Link
                  to="/manage-bookings"
                  className="panel-link"
                >
                  View All
                </Link>

              </div>


              {recentBookings.length > 0 ? (

                <div className="recent-bookings">

                  {recentBookings.map(
                    (booking) => (
                      <div
                        className="recent-booking"
                        key={
                          booking.bookingId
                        }
                      >

                        <img
                          src={
                            booking.eventImage
                          }
                          alt={
                            booking.eventTitle
                          }
                        />

                        <div className="recent-booking-info">

                          <h3>
                            {
                              booking.eventTitle
                            }
                          </h3>

                          <p>
                            {booking.customer
                              ?.fullName ||
                              booking.fullName ||
                              "Guest"}
                          </p>

                        </div>


                        <div className="recent-booking-meta">

                          <strong>
                            {booking.quantity}{" "}
                            ticket
                            {booking.quantity !==
                            1
                              ? "s"
                              : ""}
                          </strong>

                          <span
                            className={
                              booking.status ===
                              "Confirmed"
                                ? "confirmed"
                                : "cancelled"
                            }
                          >
                            {booking.status}
                          </span>

                        </div>

                      </div>
                    )
                  )}

                </div>

              ) : (

                <div className="dashboard-empty">

                  <span>◌</span>

                  <p>
                    No bookings yet.
                  </p>

                </div>

              )}

            </div>


            {/* Quick Actions */}

            <div className="dashboard-panel actions-panel">

              <div className="panel-header">

                <div>
                  <span className="section-label">
                    MANAGEMENT
                  </span>

                  <h2>
                    Quick Actions
                  </h2>
                </div>

              </div>


              <div className="quick-actions">

                <Link
                  to="/create-event"
                  className="quick-action"
                >
                  <span className="quick-action-icon">
                    +
                  </span>

                  <div>
                    <strong>
                      Create Event
                    </strong>

                    <p>
                      Add a new event
                    </p>
                  </div>
                </Link>


                <Link
                  to="/manage-events"
                  className="quick-action"
                >
                  <span className="quick-action-icon">
                    ◫
                  </span>

                  <div>
                    <strong>
                      Manage Events
                    </strong>

                    <p>
                      Edit your events
                    </p>
                  </div>
                </Link>


                <Link
                  to="/manage-bookings"
                  className="quick-action"
                >
                  <span className="quick-action-icon">
                    ✓
                  </span>

                  <div>
                    <strong>
                      Manage Bookings
                    </strong>

                    <p>
                      View attendees
                    </p>
                  </div>
                </Link>

              </div>

            </div>

          </div>


          {/* Event Overview */}

          <div className="dashboard-panel events-overview">

            <div className="panel-header">

              <div>
                <span className="section-label">
                  YOUR EVENTS
                </span>

                <h2>
                  Event Overview
                </h2>
              </div>

              <Link
                to="/manage-events"
                className="panel-link"
              >
                Manage Events
              </Link>

            </div>


            {organizerEvents.length > 0 ? (

              <div className="event-overview-table">

                <div className="table-header">
                  <span>Event</span>
                  <span>Category</span>
                  <span>Seats</span>
                  <span>Price</span>
                </div>


                {organizerEvents
                  .slice(0, 5)
                  .map((event) => (

                    <div
                      className="table-row"
                      key={event.id}
                    >

                      <div className="table-event">

                        <img
                          src={event.image}
                          alt={event.title}
                        />

                        <strong>
                          {event.title}
                        </strong>

                      </div>


                      <span className="table-category">
                        {event.category}
                      </span>


                      <span>
                        {event.availableSeats}
                      </span>


                      <strong>
                        ${event.price}
                      </strong>

                    </div>

                  ))}

              </div>

            ) : (

              <div className="dashboard-empty">

                <span>◌</span>

                <p>
                  No events created yet.
                </p>

                <Link
                  to="/create-event"
                  className="btn-primary"
                >
                  Create Your First Event
                </Link>

              </div>

            )}

          </div>


          {/* Booking Summary */}

          <div className="booking-summary-strip">

            <div>
              <span>
                Total Bookings
              </span>

              <strong>
                {totalBookings}
              </strong>
            </div>


            <div>
              <span>
                Confirmed
              </span>

              <strong className="success-text">
                {confirmedBookings}
              </strong>
            </div>


            <div>
              <span>
                Cancelled
              </span>

              <strong className="danger-text">
                {cancelledBookings}
              </strong>
            </div>


            <div>
              <span>
                Total Attendees
              </span>

              <strong>
                {totalAttendees}
              </strong>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default OrganizerDashboard;
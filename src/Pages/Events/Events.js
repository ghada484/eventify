import { useMemo, useState } from "react";

import { useEvents } from "../../context/EventsContext";
import EventCard from "../../Components/EventCard/EventCard";

import "./Events.css";

function Events() {
  const { events } = useEvents();

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const categories = [
    "All",
    ...new Set(events.map((event) => event.category)),
  ];

  const locations = [
    "All",
    ...new Set(events.map((event) => event.location)),
  ];

  const filteredEvents = useMemo(() => {
    let result = events.filter((event) => {

      const matchesSearch =
        event.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        event.category
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === "All" ||
        event.category === category;

      const matchesLocation =
        location === "All" ||
        event.location === location;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation
      );
    });

    if (sortBy === "price-low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "price-high") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sortBy === "date") {
      result.sort(
        (a, b) =>
          new Date(a.date) -
          new Date(b.date)
      );
    }

    return result;
  }, [
    events,
    searchTerm,
    category,
    location,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("All");
    setLocation("All");
    setSortBy("date");
  };

  return (
    <main className="events-page">

      <section className="events-hero">

        <div className="container">

          <span className="section-label">
            EXPLORE EVENTS
          </span>

          <h1>
            Find Events You'll
            <span> Love</span>
          </h1>

          <p>
            Discover experiences, meet new people,
            and create unforgettable memories.
          </p>

        </div>

      </section>


      <section className="events-section section">

        <div className="container">

          <div className="events-toolbar">

            <div className="search-wrapper">

              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />

            </div>


            <div className="filter-group">

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "All"
                      ? "All Categories"
                      : item}
                  </option>
                ))}

              </select>


              <select
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              >

                {locations.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "All"
                      ? "All Locations"
                      : item}
                  </option>
                ))}

              </select>


              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
              >

                <option value="date">
                  Sort by Date
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

              </select>

            </div>

          </div>


          <div className="events-results-header">

            <div>

              <h2>
                All Events
              </h2>

              <p>
                {filteredEvents.length} events found
              </p>

            </div>


            {(searchTerm ||
              category !== "All" ||
              location !== "All") && (

              <button
                className="clear-filters"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            )}

          </div>


          {filteredEvents.length > 0 ? (

            <div className="events-grid">

              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ))}

            </div>

          ) : (

            <div className="empty-events">

              <div className="empty-icon">
                ◌
              </div>

              <h3>
                No events found
              </h3>

              <p>
                Try changing your search or filters.
              </p>

              <button
                className="btn-primary"
                onClick={clearFilters}
              >
                Show All Events
              </button>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Events;
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import initialEvents from "../data/events";
import { useAuth } from "./AuthContext";

const EventsContext = createContext();

function EventsProvider({ children }) {
  const { user } = useAuth();

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem(
      "eventify-events"
    );

    return savedEvents
      ? JSON.parse(savedEvents)
      : initialEvents;
  });

  useEffect(() => {
    localStorage.setItem(
      "eventify-events",
      JSON.stringify(events)
    );
  }, [events]);

  // Create new event
  const createEvent = useCallback(
    (eventData) => {
      const newEvent = {
        ...eventData,

        id: Date.now(),

        organizerId: user?.id || null,
        organizerEmail: user?.email || "",
        organizerName:
          user?.name || "Eventify Organizer",
      };

      setEvents((currentEvents) => [
        ...currentEvents,
        newEvent,
      ]);

      return newEvent;
    },
    [user]
  );

  // Update event
  const updateEvent = useCallback(
    (eventId, updatedData) => {
      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          Number(event.id) === Number(eventId)
            ? {
                ...event,
                ...updatedData,
              }
            : event
        )
      );
    },
    []
  );

  // Delete event
  const deleteEvent = useCallback((eventId) => {
    setEvents((currentEvents) =>
      currentEvents.filter(
        (event) =>
          Number(event.id) !== Number(eventId)
      )
    );
  }, []);

  // Get event by ID
  const getEventById = useCallback(
    (eventId) => {
      return events.find(
        (event) =>
          Number(event.id) === Number(eventId)
      );
    },
    [events]
  );

  // Get events created by current organizer
  const getOrganizerEvents = useCallback(
    (organizerId, organizerEmail) => {
      return events.filter((event) => {
        if (
          organizerId &&
          event.organizerId
        ) {
          return (
            event.organizerId === organizerId
          );
        }

        return (
          organizerEmail &&
          event.organizerEmail === organizerEmail
        );
      });
    },
    [events]
  );

  // Decrease available seats after booking
  const decreaseSeats = useCallback(
    (eventId, quantity) => {
      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          Number(event.id) === Number(eventId)
            ? {
                ...event,
                availableSeats: Math.max(
                  0,
                  Number(event.availableSeats) -
                    Number(quantity)
                ),
              }
            : event
        )
      );
    },
    []
  );

  // Restore available seats after cancellation
  const increaseSeats = useCallback(
    (eventId, quantity) => {
      setEvents((currentEvents) =>
        currentEvents.map((event) =>
          Number(event.id) === Number(eventId)
            ? {
                ...event,
                availableSeats:
                  Number(event.availableSeats) +
                  Number(quantity),
              }
            : event
        )
      );
    },
    []
  );

  return (
    <EventsContext.Provider
      value={{
        events,
        createEvent,
        updateEvent,
        deleteEvent,
        getEventById,
        getOrganizerEvents,
        decreaseSeats,
        increaseSeats,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}

export default EventsProvider;
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import { useEvents } from "./EventsContext";

const BookingContext = createContext();

function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem(
      "eventify-bookings"
    );

    return savedBookings
      ? JSON.parse(savedBookings)
      : [];
  });

  const { user } = useAuth();
  const { decreaseSeats, increaseSeats } = useEvents();

  useEffect(() => {
    localStorage.setItem(
      "eventify-bookings",
      JSON.stringify(bookings)
    );
  }, [bookings]);

  const createBooking = useCallback(
    (bookingData) => {
      const newBooking = {
        ...bookingData,

        bookingId: `EVT-${Date.now()}`,

        userId: user?.id || null,
        userEmail: user?.email || bookingData.customer?.email || "",

        status: "Confirmed",

        createdAt: new Date().toISOString(),
      };

      setBookings((currentBookings) => [
        ...currentBookings,
        newBooking,
      ]);

      // Decrease available seats
      decreaseSeats(
        bookingData.eventId,
        bookingData.quantity
      );

      return newBooking;
    },
    [user, decreaseSeats]
  );

  const cancelBooking = useCallback(
    (bookingId) => {
      setBookings((currentBookings) => {
        const booking = currentBookings.find(
          (item) => item.bookingId === bookingId
        );

        if (!booking || booking.status === "Cancelled") {
          return currentBookings;
        }

        // Restore available seats
        increaseSeats(
          booking.eventId,
          booking.quantity
        );

        return currentBookings.map((item) =>
          item.bookingId === bookingId
            ? {
                ...item,
                status: "Cancelled",
              }
            : item
        );
      });
    },
    [increaseSeats]
  );

  const getBookingById = useCallback(
    (bookingId) => {
      return bookings.find(
        (booking) => booking.bookingId === bookingId
      );
    },
    [bookings]
  );

  const getUserBookings = useCallback(
    (userId, userEmail) => {
      return bookings.filter((booking) => {
        if (userId && booking.userId) {
          return booking.userId === userId;
        }

        return (
          userEmail &&
          booking.userEmail === userEmail
        );
      });
    },
    [bookings]
  );

  const getUpcomingBookings = useCallback(
    (userId, userEmail) => {
      return getUserBookings(userId, userEmail).filter(
        (booking) => booking.status === "Confirmed"
      );
    },
    [getUserBookings]
  );

  const getCancelledBookings = useCallback(
    (userId, userEmail) => {
      return getUserBookings(userId, userEmail).filter(
        (booking) => booking.status === "Cancelled"
      );
    },
    [getUserBookings]
  );

  const clearBookings = () => {
    setBookings([]);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        createBooking,
        cancelBooking,
        getBookingById,
        getUserBookings,
        getUpcomingBookings,
        getCancelledBookings,
        clearBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}

export default BookingProvider;
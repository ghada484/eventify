import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

import Hero from "./Components/Hero/Hero";
import FeaturedEvents from "./Components/FeaturedEvents/FeaturedEvents";
import Categories from "./Components/Categories/Categories";
import WhyEventify from "./Components/WhyEventify/WhyEventify";
import Toast from "./Components/Toast/Toast";

import Events from "./Pages/Events/Events";
import EventDetails from "./Pages/EventDetails/EventDetails";

import Booking from "./Pages/Booking/Booking";
import BookingConfirmation from "./Pages/BookingConfirmation/BookingConfirmation";

import MyBookings from "./Pages/MyBookings/MyBookings";
import BookingDetails from "./Pages/BookingDetails/BookingDetails";

import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import Profile from "./Pages/Profile/Profile";

import OrganizerDashboard from "./Pages/OrganizerDashboard/OrganizerDashboard";
import CreateEvent from "./Pages/CreateEvent/CreateEvent";
import ManageEvents from "./Pages/ManageEvents/ManageEvents";
import EditEvent from "./Pages/EditEvent/EditEvent";
import ManageBookings from "./Pages/ManageBookings/ManageBookings";
import Footer from "./Components/Footer/Footer";
import CategoriesPage from "./Pages/Categories/Categories";
import About from "./Pages/About/About";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toast />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <FeaturedEvents />
              <Categories />
              <WhyEventify />
            </>
          }
        />

        {/* Events */}
        <Route path="/events" element={<Events />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/about" element={<About />} />

        {/* Event Details */}
        <Route path="/events/:id" element={<EventDetails />} />

        {/* Booking */}
        <Route path="/booking/:id" element={<Booking />} />

        {/* Booking Confirmation */}
        <Route
          path="/booking-confirmation/:id"
          element={<BookingConfirmation />}
        />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          {/* Profile
              Available for User + Organizer
          */}
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="User" />}>
          {/* My Bookings */}
          <Route path="/my-bookings" element={<MyBookings />} />

          {/* Booking Details */}
          <Route path="/my-bookings/:bookingId" element={<BookingDetails />} />
        </Route>

        <Route element={<ProtectedRoute allowedRole="Organizer" />}>
          {/* Dashboard */}
          <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />

          {/* Create Event */}
          <Route path="/create-event" element={<CreateEvent />} />

          {/* Manage Events */}
          <Route path="/manage-events" element={<ManageEvents />} />

          {/* Edit Event */}
          <Route path="/manage-events/edit/:id" element={<EditEvent />} />

          {/* Manage Bookings */}
          <Route path="/manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

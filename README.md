# Eventify

Eventify is a modern event booking and management platform built with React.

It allows users to discover events, explore event details, book tickets, manage their bookings, and view digital tickets. Organizers can create and manage events, monitor bookings, and track event statistics through a dedicated dashboard.

## Live Demo


[View Eventify Live Demo](https://eventify-steel-eight.vercel.app/)

## Features

### For Users

* User registration and login
* Browse and search events
* Filter events by category and location
* Sort events by date and price
* View detailed event information
* Select ticket quantity
* Complete event bookings
* View booking confirmation
* View digital ticket and QR code
* Manage upcoming and cancelled bookings
* View and edit profile information

### For Organizers

* Organizer registration and login
* Organizer dashboard
* Create new events
* Edit existing events
* Delete events
* View organizer-specific events
* Manage attendee bookings
* Cancel bookings
* View booking statistics
* Track attendees and revenue

## Tech Stack

* React
* React Router
* Context API
* Axios
* JavaScript
* HTML5
* CSS3
* LocalStorage

## Project Structure

```text
src/
├── assets/
│   └── images/
├── Components/
│   ├── Categories/
│   ├── CategoryCard/
│   ├── EventCard/
│   ├── FeaturedEvents/
│   ├── Filter/
│   ├── Footer/
│   ├── Hero/
│   ├── Loading/
│   ├── Navbar/
│   ├── ProtectedRoute/
│   ├── SearchBar/
│   ├── Toast/
│   └── WhyEventify/
├── Pages/
│   ├── About/
│   ├── Booking/
│   ├── BookingConfirmation/
│   ├── BookingDetails/
│   ├── Categories/
│   ├── CreateEvent/
│   ├── EditEvent/
│   ├── EventDetails/
│   ├── Events/
│   ├── Login/
│   ├── ManageBookings/
│   ├── ManageEvents/
│   ├── MyBookings/
│   ├── OrganizerDashboard/
│   ├── Profile/
│   └── Register/
├── context/
│   ├── AuthContext.js
│   ├── BookingContext.js
│   ├── EventsContext.js
│   └── ToastContext.js
├── data/
│   └── events.js
├── App.js
├── index.css
└── index.js
```

## Main User Flow

```text
Home
  ↓
Explore Events
  ↓
Search & Filter
  ↓
Event Details
  ↓
Choose Tickets
  ↓
Booking
  ↓
Confirmation
  ↓
My Bookings
  ↓
Digital Ticket
```

## Organizer Flow

```text
Organizer Login
  ↓
Dashboard
  ↓
Create Event
  ↓
Manage Events
  ↓
Manage Bookings
  ↓
View Statistics
```

## Installation

Clone the repository:

```bash
git clone https://github.com/ghada484/eventify.git
```

Navigate to the project:

```bash
cd eventify
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will run locally at:

```text
http://localhost:3000
```

## Production Build

To create an optimized production build:

```bash
npm run build
```

## Authentication

The current frontend version uses LocalStorage to simulate authentication and user accounts.

Supported account types:

* User
* Organizer

Authentication and data persistence can be upgraded in a future full-stack version using a Node.js and Express backend with MongoDB and JWT authentication.

## Future Improvements

* Node.js and Express backend
* MongoDB database
* JWT authentication
* Secure password hashing
* Real payment integration
* Real email notifications
* Cloud image storage
* Advanced organizer analytics
* Admin dashboard
* Real-time booking updates

## Author

**Ghada Abdalla**

Systems & Computers Engineering

GitHub: https://github.com/ghada484

## License

This project was created for portfolio and educational purposes.

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import AuthProvider from "./context/AuthContext";
import EventsProvider from "./context/EventsContext";
import BookingProvider from "./context/BookingContext";
import ToastProvider from "./context/ToastContext";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <EventsProvider>
        <BookingProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </BookingProvider>
      </EventsProvider>
    </AuthProvider>
  </React.StrictMode>
);


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = register(
      formData.name,
      formData.email,
      formData.password,
      formData.role
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    if (result.user.role === "Organizer") {
      navigate("/organizer-dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <main className="register-page">

      <section className="register-section">

        <div className="container register-container">

          <div className="register-card">

            <div className="register-header">

              <Link to="/" className="register-logo">
                <span>✦</span>
                Eventify
              </Link>

              <h1>
                Create Your <span>Account</span>
              </h1>

              <p>
                Join Eventify and start discovering amazing events.
              </p>

            </div>

            <form
              className="register-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">

                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label htmlFor="register-email">
                  Email Address
                </label>

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

              <div className="register-password-row">

                <div className="form-group">

                  <label htmlFor="register-password">
                    Password
                  </label>

                  <input
                    id="register-password"
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="confirm-password">
                    Confirm Password
                  </label>

                  <input
                    id="confirm-password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="form-group">

                <label>
                  Account Type
                </label>

                <div className="role-options">

                  <label
                    className={`role-option ${
                      formData.role === "User"
                        ? "selected"
                        : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="role"
                      value="User"
                      checked={formData.role === "User"}
                      onChange={handleChange}
                    />

                    <span className="role-icon">
                      ◉
                    </span>

                    <span>
                      <strong>User</strong>
                      <small>
                        Discover & book events
                      </small>
                    </span>

                  </label>

                  <label
                    className={`role-option ${
                      formData.role === "Organizer"
                        ? "selected"
                        : ""
                    }`}
                  >

                    <input
                      type="radio"
                      name="role"
                      value="Organizer"
                      checked={
                        formData.role === "Organizer"
                      }
                      onChange={handleChange}
                    />

                    <span className="role-icon">
                      ◇
                    </span>

                    <span>
                      <strong>Organizer</strong>
                      <small>
                        Create & manage events
                      </small>
                    </span>

                  </label>

                </div>

              </div>

              {error && (
                <div className="register-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary register-btn"
              >
                Create Account
              </button>

            </form>

            <div className="register-footer">

              <p>
                Already have an account?
                <Link to="/login">
                  Sign In
                </Link>
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Register;
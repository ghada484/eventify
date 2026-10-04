import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    const result = login(
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
    <main className="login-page">

      <section className="login-section">

        <div className="container login-container">

          <div className="login-card">

            <div className="login-header">

              <Link to="/" className="login-logo">
                <span>✦</span>
                Eventify
              </Link>

              <h1>
                Welcome <span>Back</span>
              </h1>

              <p>
                Sign in to continue to your Eventify account.
              </p>

            </div>

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">

                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />

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
                      <small>Book events</small>
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
                      <small>Manage events</small>
                    </span>

                  </label>

                </div>

              </div>

              {error && (
                <div className="login-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary login-btn"
              >
                Sign In
              </button>

            </form>

            <div className="login-footer">

              <p>
                Don't have an account?
                <Link to="/register">
                  Create Account
                </Link>
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Login;
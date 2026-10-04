import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Profile.css";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      return;
    }

    const savedUsers =
      JSON.parse(localStorage.getItem("eventify-users")) || [];

    const updatedUsers = savedUsers.map((item) =>
      item.id === user.id
        ? {
            ...item,
            name: trimmedName,
            email: trimmedEmail,
          }
        : item
    );

    localStorage.setItem(
      "eventify-users",
      JSON.stringify(updatedUsers)
    );

    localStorage.setItem(
      "eventify-user",
      JSON.stringify({
        ...user,
        name: trimmedName,
        email: trimmedEmail,
      })
    );

    window.location.reload();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <main className="profile-page">
      <section className="profile-header">
        <div className="container">
          <span className="section-label">
            ACCOUNT
          </span>

          <h1>
            My <span>Profile</span>
          </h1>

          <p>
            Manage your personal information and account
            preferences.
          </p>
        </div>
      </section>

      <section className="profile-section section">
        <div className="container">
          <div className="profile-layout">

            {/* Profile Card */}
            <div className="profile-card">

              <div className="profile-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <h2>{user.name}</h2>

              <p className="profile-email">
                {user.email}
              </p>

              <span className="profile-role">
                {user.role}
              </span>

              <div className="profile-card-divider"></div>

              <div className="profile-member">
                <span>MEMBER SINCE</span>

                <strong>
                  Eventify Member
                </strong>
              </div>

              <button
                className="profile-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>

            {/* Account Information */}
            <div className="profile-info-card">

              <div className="profile-info-header">
                <div>
                  <span className="section-label">
                    PERSONAL INFORMATION
                  </span>

                  <h2>Account Details</h2>
                </div>

                {!isEditing && (
                  <button
                    className="profile-edit-btn"
                    onClick={() =>
                      setIsEditing(true)
                    }
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="profile-form">

                <div className="profile-field">
                  <label>Full Name</label>

                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Enter your name"
                    />
                  ) : (
                    <div className="profile-value">
                      {user.name}
                    </div>
                  )}
                </div>

                <div className="profile-field">
                  <label>Email Address</label>

                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="profile-value">
                      {user.email}
                    </div>
                  )}
                </div>

                <div className="profile-field">
                  <label>Account Type</label>

                  <div className="profile-value profile-type">
                    {user.role}
                  </div>
                </div>

                {isEditing && (
                  <div className="profile-actions">

                    <button
                      className="profile-cancel-btn"
                      onClick={() => {
                        setName(user.name);
                        setEmail(user.email);
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      className="btn-primary"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>

                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
import { Link } from "react-router-dom";

import "./About.css";

function About() {
  return (
    <main className="about-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="about-header">

        <div className="container">

          <span className="section-label">
            ABOUT EVENTIFY
          </span>

          <h1>
            Making Every Event
            <br />
            <span>Worth Remembering.</span>
          </h1>

          <p>
            Eventify makes it simple to discover
            exciting events, book your tickets,
            and enjoy experiences that matter.
          </p>

        </div>

      </section>


      {/* =========================
          STORY
      ========================= */}

      <section className="about-story section">

        <div className="container">

          <div className="about-story-grid">

            <div className="about-story-image">

              <img
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80"
                alt="Event audience"
              />

              <div className="about-image-card">

                <strong>
                  10K+
                </strong>

                <span>
                  Happy Attendees
                </span>

              </div>

            </div>


            <div className="about-story-content">

              <span className="section-label">
                OUR STORY
              </span>

              <h2>
                Events Bring People
                <span> Together.</span>
              </h2>

              <p>
                We believe that the best moments
                happen when people come together
                around something they love.
              </p>

              <p>
                Eventify was created to make finding
                and booking those moments easier.
                Whether you are looking for a concert,
                workshop, conference, sports event,
                or something completely different,
                Eventify gives you one simple place
                to discover it.
              </p>

              <p>
                Our goal is to connect people with
                experiences they will remember long
                after the event ends.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          VALUES
      ========================= */}

      <section className="about-values section">

        <div className="container">

          <div className="about-section-heading">

            <span className="section-label">
              WHAT WE BELIEVE
            </span>

            <h2>
              Built Around
              <span> Experience.</span>
            </h2>

            <p>
              Everything we do is designed to make
              discovering and attending events easier.
            </p>

          </div>


          <div className="about-values-grid">

            <article className="about-value-card">

              <div className="about-value-number">
                01
              </div>

              <h3>
                Discover More
              </h3>

              <p>
                Find events that match your interests
                and discover experiences you might
                not have found otherwise.
              </p>

            </article>


            <article className="about-value-card">

              <div className="about-value-number">
                02
              </div>

              <h3>
                Keep It Simple
              </h3>

              <p>
                From discovering an event to booking
                your ticket, every step should feel
                simple and straightforward.
              </p>

            </article>


            <article className="about-value-card">

              <div className="about-value-number">
                03
              </div>

              <h3>
                Create Memories
              </h3>

              <p>
                Great events create meaningful
                moments, new connections, and
                memories worth keeping.
              </p>

            </article>

          </div>

        </div>

      </section>


      {/* =========================
          FOR ORGANIZERS
      ========================= */}

      <section className="about-organizers section">

        <div className="container">

          <div className="about-organizers-box">

            <div className="about-organizers-content">

              <span className="section-label">
                FOR ORGANIZERS
              </span>

              <h2>
                Have an Event
                <br />
                <span>to Share?</span>
              </h2>

              <p>
                Eventify also gives organizers the
                tools they need to create events,
                manage bookings, and keep track of
                their attendees.
              </p>

              <Link
                to="/register"
                className="btn-primary"
              >
                Become an Organizer
              </Link>

            </div>


            <div className="about-organizers-image">

              <img
                src="https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=80"
                alt="Event organizers"
              />

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================= */}

      <section className="about-cta">

        <div className="container">

          <span className="section-label">
            START EXPLORING
          </span>

          <h2>
            Your Next Great
            <br />
            Experience Is Out There.
          </h2>

          <p>
            Discover events, meet people,
            and make your next memory.
          </p>

          <Link
            to="/events"
            className="btn-primary"
          >
            Explore Events
          </Link>

        </div>

      </section>

    </main>
  );
}

export default About;
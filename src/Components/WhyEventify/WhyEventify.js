import "./WhyEventify.css";

const features = [
  {
    id: 1,
    number: "01",
    title: "Discover More",
    description:
      "Find concerts, workshops, sports, courses, and conferences all in one place.",
    icon: "✦",
  },
  {
    id: 2,
    number: "02",
    title: "Easy Booking",
    description:
      "Choose your event, select your tickets, and complete your booking in just a few steps.",
    icon: "✓",
  },
  {
    id: 3,
    number: "03",
    title: "Secure Tickets",
    description:
      "Get a digital ticket with a unique booking reference for a smooth check-in experience.",
    icon: "◇",
  },
  {
    id: 4,
    number: "04",
    title: "Manage Everything",
    description:
      "Keep track of your upcoming events, bookings, and tickets from one simple dashboard.",
    icon: "◉",
  },
];

function WhyEventify() {
  return (
    <section className="why-eventify section">
      <div className="container why-container">

        <div className="why-intro">

          <span className="section-label">
            WHY EVENTIFY
          </span>

          <h2 className="section-title">
            Everything You Need
            <span> In One Place</span>
          </h2>

          <p>
            From discovering your next experience to managing your
            tickets, Eventify keeps everything simple and organized.
          </p>

        </div>

        <div className="features-list">

          {features.map((feature) => (
            <div className="feature-item" key={feature.id}>

              <span className="feature-number">
                {feature.number}
              </span>

              <div className="feature-icon">
                {feature.icon}
              </div>

              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyEventify;
import { Link } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";

import "./Categories.css";

function Categories() {
  const { events } = useEvents();

  const categories = [
    {
      name: "Music",
      icon: "♫",
      description:
        "Live concerts, festivals, and unforgettable musical experiences.",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Technology",
      icon: "⌘",
      description:
        "Discover the latest technologies, ideas, and digital innovations.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Workshop",
      icon: "✎",
      description: "Hands-on workshops designed to help you learn and create.",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Sports",
      icon: "◉",
      description: "Exciting matches, championships, and sporting experiences.",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Education",
      icon: "▱",
      description:
        "Courses, masterclasses, and opportunities to grow your skills.",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Business",
      icon: "◫",
      description:
        "Summits, networking events, and professional opportunities.",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Art",
      icon: "◇",
      description:
        "Exhibitions and creative experiences from talented artists.",
      image:
        "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const getCategoryCount = (categoryName) => {
    return events.filter((event) => event.category === categoryName).length;
  };

  return (
    <main className="categories-page">
      {/* =========================
          HEADER
      ========================= */}

      <section className="categories-header">
        <div className="container">
          <span className="section-label">EXPLORE</span>

          <h1>
            Find Events by <span>Category</span>
          </h1>

          <p>
            Explore experiences that match your interests and discover your next
            unforgettable event.
          </p>
        </div>
      </section>

      {/* =========================
          CATEGORIES
      ========================= */}

      <section className="categories-page-section section">
        <div className="container">
          <div className="categories-page-intro">
            <div>
              <span className="section-label">EVENT CATEGORIES</span>

              <h2>Something for Everyone</h2>
            </div>

            <p>
              From live music and sports to technology and business, find the
              experience that's right for you.
            </p>
          </div>

          <div className="categories-page-grid">
            {categories.map((category) => {
              const count = getCategoryCount(category.name);

              return (
                <article className="category-page-card" key={category.name}>
                  <div className="category-page-image">
                    <img src={category.image} alt={category.name} />

                    <span className="category-page-icon">{category.icon}</span>
                  </div>

                  <div className="category-page-content">
                    <div className="category-page-title-row">
                      <h3>{category.name}</h3>

                      <span className="category-page-count">
                        {count} {count === 1 ? "Event" : "Events"}
                      </span>
                    </div>

                    <p>{category.description}</p>

                    <Link
                      to={`/events?category=${encodeURIComponent(
                        category.name,
                      )}`}
                      className="category-page-link"
                    >
                      View Events
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================
          CTA
      ========================= */}

      <section className="categories-page-cta">
        <div className="container">
          <div className="categories-cta-content">
            <span className="section-label">READY TO EXPLORE?</span>

            <h2>
              Your Next Experience
              <br />
              Is Waiting.
            </h2>

            <p>Browse all available events and find something you'll love.</p>

            <Link to="/events" className="btn-primary">
              Explore All Events
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Categories;

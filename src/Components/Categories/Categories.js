import { Link } from "react-router-dom";

import "./Categories.css";

const categories = [
  {
    id: 1,
    name: "Music",
    count: "120 Events",
    icon: "♫",
    className: "music",
  },
  {
    id: 2,
    name: "Technology",
    count: "85 Events",
    icon: "⌘",
    className: "technology",
  },
  {
    id: 3,
    name: "Workshops",
    count: "64 Events",
    icon: "✎",
    className: "workshops",
  },
  {
    id: 4,
    name: "Sports",
    count: "52 Events",
    icon: "⚡",
    className: "sports",
  },
  {
    id: 5,
    name: "Education",
    count: "47 Events",
    icon: "▱",
    className: "education",
  },
  {
    id: 6,
    name: "Business",
    count: "38 Events",
    icon: "◫",
    className: "business",
  },
];

function Categories() {
  return (
    <section className="categories section">
      <div className="container">

        <div className="categories-header">

          <div>
            <span className="section-label">
              EXPLORE BY TYPE
            </span>

            <h2 className="section-title">
              Find What Interests You
            </h2>

            <p className="section-subtitle">
              Browse events by category and discover experiences
              that match your interests.
            </p>
          </div>

          <Link to="/categories" className="view-all-link">
            All Categories
          </Link>

        </div>

        <div className="categories-grid">

          {categories.map((category) => (
            <Link
              to={`/events?category=${category.name}`}
              className={`category-card ${category.className}`}
              key={category.id}
            >

              <div className="category-icon">
                {category.icon}
              </div>

              <div className="category-info">
                <h3>{category.name}</h3>
                <span>{category.count}</span>
              </div>

              <span className="category-action">
                View Events
              </span>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Categories;
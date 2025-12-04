import heroImage from "../assets/hero.jpg";
import { Link } from "react-router";

export function CallToAction() {
  return (
    <main className="hero">
      <div className="container">
        <article>
          <h1 className="title">Little Lemon</h1>
          <h2 className="subtitle">Chicago</h2>
          <p className="description">
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <Link to="/booking" className="button" role="button">
            Reserve a Table
          </Link>
        </article>
        <article className="hero-image-container">
          <img
            src={heroImage}
            alt="Little Lemon"
            className="hero-image"
            fetchPriority="high"
          />
        </article>
      </div>
    </main>
  );
}

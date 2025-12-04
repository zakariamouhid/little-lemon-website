import aboutImage1 from "../assets/about-1.jpg";
import aboutImage2 from "../assets/about-2.jpg";

export function Chicago() {
  return (
    <section className="about">
      <div className="container">
        <article className="about-content">
          <h2 className="title">Little Lemon</h2>
          <h3 className="subtitle">Chicago</h3>
          <p className="description">
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist. We are a family
            owned Mediterranean restaurant, focused on traditional recipes
            served with a modern twist.
          </p>
        </article>
        <article className="about-images">
          <img src={aboutImage1} alt="Little Lemon" className="about-image" />
          <img src={aboutImage2} alt="Little Lemon" className="about-image" />
        </article>
      </div>
    </section>
  );
}

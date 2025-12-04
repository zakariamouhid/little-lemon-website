import testimonialImage1 from "../assets/person-1.jpg";
import testimonialImage2 from "../assets/person-2.jpg";
import testimonialImage3 from "../assets/person-3.jpg";
import testimonialImage4 from "../assets/person-4.jpg";
import { CustomersSayCard } from "./CustomersSayCard";

export function CustomersSay() {
  const testimonials = [
    {
      rating: 5,
      name: "John Doe",
      handle: "john_doe",
      description: "Booking system is intuitive and extremely easy to use.",
      image: testimonialImage1,
    },
    {
      rating: 4,
      name: "Jane Doe",
      handle: "jane_doe",
      description: "Superb ambience and genuinely attentive, friendly staff.",
      image: testimonialImage2,
    },
    {
      rating: 5,
      name: "Jim Doe",
      handle: "jim_doe",
      description:
        "The cocktails were theatrical and the tapas truly excellent.",
      image: testimonialImage3,
    },
    {
      rating: 5,
      name: "Jill Doe",
      handle: "jill_doe",
      description: "Favorite neighborhood bistro. Always wonderful.",
      image: testimonialImage4,
    },
  ];
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="title">What our customers say!</h2>
        <div className="testimonials-cards">
          {testimonials.map((testimonial) => (
            <CustomersSayCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

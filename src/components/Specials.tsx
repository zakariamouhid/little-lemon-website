import specialImage1 from "../assets/special-1.jpg";
import specialImage2 from "../assets/special-2.jpg";
import specialImage3 from "../assets/special-3.jpg";
import { SpecialsCard } from "./SpecialsCard";

export function Specials() {
  const specials = [
    {
      title: "Greek Salad",
      description:
        "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. ",
      price: "$12.99",
      image: specialImage1,
    },
    {
      title: "Brushetta",
      description:
        "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. Toppings of tomato,..",
      price: "$5.99",
      image: specialImage2,
    },
    {
      title: "Lemon Dessert",
      description:
        "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
      price: "$8.99",
      image: specialImage3,
    },
  ];
  return (
    <section className="specials">
      <div className="container">
        <div className="specials-header">
          <h2 className="title">This weeks specials!</h2>
          <button className="button">Online Menu</button>
        </div>
        <div className="specials-cards">
          {specials.map((special) => (
            <SpecialsCard key={special.title} {...special} />
          ))}
        </div>
      </div>
    </section>
  );
}

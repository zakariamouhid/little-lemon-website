import "./App.css";
import logo from "./assets/logo.png";
import heroImage from "./assets/hero.jpg";
import specialImage1 from "./assets/special-1.jpg";
import specialImage2 from "./assets/special-2.jpg";
import specialImage3 from "./assets/special-3.jpg";
import testimonialImage1 from "./assets/person-1.jpg";
import testimonialImage2 from "./assets/person-2.jpg";
import testimonialImage3 from "./assets/person-3.jpg";
import testimonialImage4 from "./assets/person-4.jpg";
import aboutImage1 from "./assets/about-1.jpg";
import aboutImage2 from "./assets/about-2.jpg";
import footerImage from "./assets/footer.jpg";

function Nav() {
  // HOME
  // ABOUT
  // MENU
  // RESERVATIONS
  // ORDER ONLINE
  // LOGIN
  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Menu",
      href: "/menu",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Order Online",
      href: "/order-online",
    },
    {
      label: "Login",
      href: "/login",
    },
  ];
  return (
    <nav className="nav">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="nav-link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Logo() {
  return (
    <a href="/" className="logo">
      <img src={logo} alt="Little Lemon" width={200} height={55} />
    </a>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="container">
        <Logo />
        <Nav />
      </div>
    </header>
  );
}

function Hero() {
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
          <button className="button">Reserve a Table</button>
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

function SpecialsCard({
  title,
  description,
  price,
  image,
}: {
  title: string;
  description: string;
  price: string;
  image: string;
}) {
  return (
    <article className="specials-card">
      <img
        src={image}
        alt={title}
        className="specials-image"
        width={200}
        height={200}
        loading="lazy"
      />
      <div className="specials-card-content">
        <div className="specials-card-header">
          <h3 className="specials-card-title">{title}</h3>
          <p className="specials-card-price">{price}</p>
        </div>
        <p className="specials-card-description">{description}</p>
        <button className="specials-card-button">
          Order a Delivery
          <svg
            width="20"
            height="14"
            viewBox="0 0 20 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 14C4.16667 14 3.45833 13.7083 2.875 13.125C2.29167 12.5417 2 11.8333 2 11H0V8C0 6.9 0.391667 5.95833 1.175 5.175C1.95833 4.39167 2.9 4 4 4H8V9H11.5L15 4.65V2H12V0H15C15.55 0 16.0208 0.195833 16.4125 0.5875C16.8042 0.979167 17 1.45 17 2V5.35L12.5 11H8C8 11.8333 7.70833 12.5417 7.125 13.125C6.54167 13.7083 5.83333 14 5 14ZM5 12C5.28333 12 5.52083 11.9042 5.7125 11.7125C5.90417 11.5208 6 11.2833 6 11H4C4 11.2833 4.09583 11.5208 4.2875 11.7125C4.47917 11.9042 4.71667 12 5 12ZM3 3V1H8V3H3ZM17 14C16.1667 14 15.4583 13.7083 14.875 13.125C14.2917 12.5417 14 11.8333 14 11C14 10.1667 14.2917 9.45833 14.875 8.875C15.4583 8.29167 16.1667 8 17 8C17.8333 8 18.5417 8.29167 19.125 8.875C19.7083 9.45833 20 10.1667 20 11C20 11.8333 19.7083 12.5417 19.125 13.125C18.5417 13.7083 17.8333 14 17 14ZM17 12C17.2833 12 17.5208 11.9042 17.7125 11.7125C17.9042 11.5208 18 11.2833 18 11C18 10.7167 17.9042 10.4792 17.7125 10.2875C17.5208 10.0958 17.2833 10 17 10C16.7167 10 16.4792 10.0958 16.2875 10.2875C16.0958 10.4792 16 10.7167 16 11C16 11.2833 16.0958 11.5208 16.2875 11.7125C16.4792 11.9042 16.7167 12 17 12Z"
              fill="#1F1F1F"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}

function Specials() {
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

function TestimonialsCard({
  rating,
  name,
  handle,
  description,
  image,
}: {
  rating: number;
  name: string;
  handle: string;
  description: string;
  image: string;
}) {
  return (
    <article className="testimonials-card">
      <div className="testimonials-card-header">
        <div className="testimonials-card-rating">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0L10.2426 5.28571H16L11.2857 8.57143L13.5283 13.8571L8 10.5714L2.47168 13.8571L4.71429 8.57143L0 5.28571H5.75736L8 0Z"
                fill={index < rating ? "#F4CE14" : "#D9D9D9"}
              />
            </svg>
          ))}
        </div>
        <div className="testimonials-card-author">
          <img
            src={image}
            alt={name}
            className="testimonials-card-image"
            width={100}
            height={100}
          />
          <div className="testimonials-card-author-info">
            <h3 className="testimonials-card-title">{name}</h3>
            <h4 className="testimonials-card-handle">@{handle}</h4>
          </div>
        </div>
      </div>
      <p className="testimonials-card-description">{description}</p>
    </article>
  );
}

function Testimonials() {
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
            <TestimonialsCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
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

function Footer() {
  // Doormat navigation
  // Home
  // About
  // Menu
  // Reservations
  // Order Online
  // Login

  // Contact
  // Address
  // Phone number
  // Email

  // Social Media Links
  // Instagram
  // Twitter
  // YouTube

  const linksColumns = [
    {
      title: "Doormat Navigation",
      links: [
        {
          label: "Home",
          href: "/",
        },
        {
          label: "About",
          href: "/about",
        },
        {
          label: "Menu",
          href: "/menu",
        },
        {
          label: "Contact",
          href: "/contact",
        },
        {
          label: "Order Online",
          href: "/order-online",
        },
        {
          label: "Login",
          href: "/login",
        },
      ],
    },
    {
      title: "Contact",
      links: [
        {
          label: "Address",
          href: "/contact",
        },
        {
          label: "Phone number",
          href: "/contact",
        },
        {
          label: "Email",
          href: "/contact",
        },
      ],
    },
    {
      title: "Social Media Links",
      links: [
        {
          label: "Instagram",
          href: "/instagram",
        },
        {
          label: "Twitter",
          href: "/twitter",
        },
        {
          label: "YouTube",
          href: "/youtube",
        },
      ],
    },
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-image-container">
          <img
            src={footerImage}
            alt="Little Lemon"
            className="footer-image"
            width={200}
            height={300}
          />
        </div>
        {linksColumns.map((column) => (
          <div key={column.title} className="footer-column">
            <h3 className="footer-column-title">{column.title}</h3>
            <ul className="footer-list">
              {column.links.map((link) => (
                <li key={link.label} className="footer-link">
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Specials />
      <Testimonials />
      <About />
      <Footer />
    </>
  );
}

export default App;

import footerImage from "../assets/footer.jpg";

export function Footer() {
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

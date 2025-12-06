import { Link } from "react-router";
import footerImage from "../assets/footer.jpg";
import { useLoginState } from "../pages/login-components/LoginContext";

export function Footer() {
  const { isLoggedIn } = useLoginState();
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
          href: "/",
        },
        {
          label: "Menu",
          href: "/menu",
        },
        {
          label: "Contact",
          href: "/",
        },
        {
          label: "Order Online",
          href: "/",
        },
        !isLoggedIn
          ? {
              label: "Sign In",
              href: "/login",
            }
          : {
              label: "Sign Out",
              href: "/logout",
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
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

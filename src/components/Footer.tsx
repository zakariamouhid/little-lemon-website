import { Link } from "react-router";
import footerImage from "../assets/footer.jpg";
import { useLoginState } from "../pages/login-components/LoginContext";

export function Footer() {
  const { isLoggedIn } = useLoginState();
  const linksColumns: {
    title: string;
    links: {
      label: string;
      href: string;
      target?: string;
      rel?: string;
    }[];
  }[] = [
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
          href: "https://www.instagram.com/zakaria_mouhid",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        {
          label: "Twitter",
          href: "https://x.com/zakariamouhid1",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        {
          label: "YouTube",
          href: "https://www.youtube.com/@coursera",
          target: "_blank",
          rel: "noopener noreferrer",
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
                  <Link to={link.href} target={link.target} rel={link.rel}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}

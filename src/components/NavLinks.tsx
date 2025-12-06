import { Link } from "react-router";
import { useLoginState } from "../pages/login-components/LoginContext";

export function NavLinks() {
  const { isLoggedIn } = useLoginState();
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
      href: "/",
    },
    {
      label: "Menu",
      href: "/",
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
  ];
  return (
    <nav className="nav">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link to={item.href} className="nav-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

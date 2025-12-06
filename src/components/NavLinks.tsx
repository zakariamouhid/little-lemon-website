import { Link } from "react-router";
import { useLoginState } from "../pages/login-components/LoginContext";

export function NavLinks({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}) {
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
    <nav
      className={`nav ${isMenuOpen ? "nav-menu-open" : ""}`}
      aria-expanded={isMenuOpen}
      aria-label={
        isMenuOpen ? "Closed navigation menu" : "Main navigation menu"
      }
      role="navigation"
    >
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              to={item.href}
              className="nav-link"
              onFocus={() => {
                if (!isMenuOpen) {
                  setIsMenuOpen(true);
                }
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import { Link } from "react-router";

export function NavLinks() {
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
            <Link to={item.href} className="nav-link">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

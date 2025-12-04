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

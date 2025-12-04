import logo from "../assets/logo.png";
import { NavLinks } from "./NavLinks";

export function Logo() {
  return (
    <a href="/" className="logo">
      <img src={logo} alt="Little Lemon" width={200} height={55} />
    </a>
  );
}

export function Nav() {
  return (
    <header className="header">
      <div className="container">
        <Logo />
        <NavLinks />
      </div>
    </header>
  );
}

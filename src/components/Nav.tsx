import { Link } from "react-router";
import logo from "../assets/logo.png";
import { NavLinks } from "./NavLinks";

export function Logo() {
  return (
    <Link to="/" className="logo">
      <img src={logo} alt="Little Lemon" width={200} height={55} />
    </Link>
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

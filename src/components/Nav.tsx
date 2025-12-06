import { Link } from "react-router";
import logo from "../assets/logo.png";
import { NavLinks } from "./NavLinks";
import { useState } from "react";

function Logo() {
  return (
    <Link to="/" className="logo">
      <img src={logo} alt="Little Lemon" width={200} height={55} />
    </Link>
  );
}

function MenuIcon({
  setIsMenuOpen,
  isMenuOpen,
}: {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isMenuOpen: boolean;
}) {
  return (
    <button
      className={`menu-icon-button ${isMenuOpen ? "menu-icon-button-close" : "menu-icon-button-open"}`}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <svg
        className="menu-icon menu-icon-close"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#1f1f1f"
      >
        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
      </svg>
      <svg
        className="menu-icon menu-icon-open"
        width="35"
        height="25"
        viewBox="0 0 35 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.34615 0C0.6027 0 0 0.621833 0 1.38889C0 2.15594 0.6027 2.77778 1.34615 2.77778H33.6538C34.3972 2.77778 35 2.15594 35 1.38889C35 0.621833 34.3972 0 33.6538 0H1.34615ZM0 12.5C0 11.7329 0.6027 11.1111 1.34615 11.1111H33.6538C34.3972 11.1111 35 11.7329 35 12.5C35 13.2671 34.3972 13.8889 33.6538 13.8889H1.34615C0.6027 13.8889 0 13.2671 0 12.5ZM0 23.6111C0 22.8442 0.6027 22.2222 1.34615 22.2222H33.6538C34.3972 22.2222 35 22.8442 35 23.6111C35 24.3781 34.3972 25 33.6538 25H1.34615C0.6027 25 0 24.3781 0 23.6111Z"
          fill="black"
        />
      </svg>
    </button>
  );
}

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="header">
      <div className="container">
        <div className="nav-logo-menu-container">
          <MenuIcon setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
          <Logo />
          <MenuIcon setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        </div>
        <NavLinks setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      </div>
    </header>
  );
}

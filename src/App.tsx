import "./App.css";
import logo from "./assets/logo.png";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/" className="nav-link">
            {" "}
            Home
          </a>
        </li>
        <li>
          <a href="/" className="nav-link">
            {" "}
            About
          </a>
        </li>
        <li>
          <a href="/" className="nav-link">
            {" "}
            Menu
          </a>
        </li>
        <li>
          <a href="/" className="nav-link">
            {" "}
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Logo() {
  return (
    <a href="/" className="logo">
      <img src={logo} alt="Little Lemon" width={200} height={55} />
    </a>
  );
}

function Header() {
  return (
    <header>
      <Logo />
      <Nav />
    </header>
  );
}

function Main() {
  return <main>Main</main>;
}

function Footer() {
  return <footer>Footer</footer>;
}

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;

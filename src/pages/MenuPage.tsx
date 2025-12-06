import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { Specials } from "../components/Specials";
import "./MenuPage.css";

export default function MenuPage() {
  return (
    <>
      <Nav />
      <div className="menu-page">
        <Specials showOnlineMenuButton={false} />
      </div>
      <Footer />
    </>
  );
}

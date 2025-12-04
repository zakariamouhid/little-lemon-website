import { Nav } from "../components/Nav";
import { CallToAction } from "../components/CallToAction";
import { Specials } from "../components/Specials";
import { CustomersSay } from "../components/CustomersSay";
import { Chicago } from "../components/Chicago";
import { Footer } from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <CallToAction />
      <Specials />
      <CustomersSay />
      <Chicago />
      <Footer />
    </>
  );
}

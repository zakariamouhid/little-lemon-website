import { Nav } from "../components/Nav";
import { CallToAction } from "../components/CallToAction";
import { Specials } from "../components/Specials";
import { CustomersSay } from "../components/CustomersSay";
import { Chicago } from "../components/Chicago";
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import heroImageUrl from "../assets/hero.jpg";

export default function HomePage() {
  useEffect(() => {
    const heroImage = document.createElement("link");
    heroImage.rel = "preload";
    heroImage.as = "image";
    heroImage.href = heroImageUrl;
    heroImage.fetchPriority = "high";
    document.head.appendChild(heroImage);
    return () => {
      document.head.removeChild(heroImage);
    };
  }, []);
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

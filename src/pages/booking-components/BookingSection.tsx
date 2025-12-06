import { BookingForm } from "./BookingForm";
import { BookingProvider } from "./BookingProvider";
import "./BookingSection.css";

export function BookingSection() {
  return (
    <main className="booking-section">
      <div className="container">
        <h1 className="title">Book Now</h1>
        <BookingProvider>
          <BookingForm />
        </BookingProvider>
      </div>
    </main>
  );
}

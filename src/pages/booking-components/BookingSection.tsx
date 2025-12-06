import { BookingForm } from "./BookingForm";
import { BookingProvider } from "./BookingProvider";
import { BookingConfirmation } from "./BookingConfirmation";
import { useBookingState } from "./BookingContext";
import "./BookingSection.css";

function BookingContent() {
  const { isConfirmed } = useBookingState();

  if (isConfirmed) {
    return <BookingConfirmation />;
  }

  return (
    <>
      <h1 className="title">Book Now</h1>
      <BookingForm />
    </>
  );
}

export function BookingSection() {
  return (
    <main className="booking-section">
      <div className="container">
        <BookingProvider>
          <BookingContent />
        </BookingProvider>
      </div>
    </main>
  );
}

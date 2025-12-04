import { Link } from "react-router";

export default function BookingPage() {
  return (
    <div>
      <h1>Booking Page</h1>
      <Link to="/" className="button" role="button">
        Back to Home
      </Link>
    </div>
  );
}

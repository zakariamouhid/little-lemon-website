import { useBookingState } from "./BookingContext";
import { useLoginState } from "../login-components/LoginContext";
import "./BookingConfirmation.css";

export function BookingConfirmation() {
  const { date, time, guests, occasion } = useBookingState();
  const { user } = useLoginState();

  const userName = user?.fullName || "Guest";

  const handleAddToCalendar = () => {
    // Create start date object
    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":");
    const startDateObj = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );

    // Create end date object (2 hours later)
    const endDateObj = new Date(startDateObj.getTime() + 2 * 60 * 60 * 1000);

    // Format dates for calendar
    const startDate =
      startDateObj.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const endDate =
      endDateObj.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const title = `Reservation at Little Lemon${occasion ? ` - ${occasion}` : ""}`;
    const description = `Reservation for ${guests} ${guests === 1 ? "guest" : "guests"}`;
    const location = "Little Lemon Restaurant";

    // Create Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(location)}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="booking-confirmation">
      <div className="confirmation-content">
        <div className="checkmark-icon">
          <svg
            width="148"
            height="148"
            viewBox="0 0 148 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M107.966 41.292L59.2 90.058L32.634 63.566L22.2 74L59.2 111L118.4 51.8L107.966 41.292ZM74 0C33.152 0 0 33.152 0 74C0 114.848 33.152 148 74 148C114.848 148 148 114.848 148 74C148 33.152 114.848 0 74 0ZM74 133.2C41.292 133.2 14.8 106.708 14.8 74C14.8 41.292 41.292 14.8 74 14.8C106.708 14.8 133.2 41.292 133.2 74C133.2 106.708 106.708 133.2 74 133.2Z"
              fill="#495e57"
            />
          </svg>
        </div>
        <h2 className="confirmation-title">
          Thanks {userName}, your reservation has been confirmed!
        </h2>
        <div className="confirmation-details">
          <p>
            <strong>Date:</strong>{" "}
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>
          <p>
            <strong>Guests:</strong> {guests}
          </p>
          {occasion && (
            <p>
              <strong>Occasion:</strong> {occasion}
            </p>
          )}
        </div>
        <button
          className="button add-to-calendar-button"
          onClick={handleAddToCalendar}
          aria-label="Add reservation to calendar"
        >
          Add to Calendar
        </button>
      </div>
    </div>
  );
}

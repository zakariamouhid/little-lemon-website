import { useBookingState } from "./BookingContext";
import "./BookingForm.css";

export function BookingForm() {
  const {
    date,
    time,
    availableTimes,
    guests,
    occasion,

    isValidDate,
    isValidTime,
    isValidGuests,
    isValidOccasion,

    handleSubmit,
    setDate,
    setTime,
    setGuests,
    setOccasion,
  } = useBookingState();
  const requiredIndicator = (
    <span aria-label="required" className="required-indicator">
      *
    </span>
  );
  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      aria-label="Book a table form"
    >
      <label htmlFor="res-date">Choose date {requiredIndicator}</label>
      <input
        type="date"
        id="res-date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        aria-required="true"
        aria-label="Choose reservation date"
      />
      {!isValidDate && (
        <p
          className="error-message"
          aria-labelledby="res-date"
          aria-invalid="true"
        >
          Date must be today or later
        </p>
      )}
      <label htmlFor="res-time">Choose time {requiredIndicator}</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        aria-required="true"
        aria-label="Choose reservation time"
      >
        {availableTimes.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </select>
      {!isValidTime && (
        <p
          className="error-message"
          aria-labelledby="res-time"
          aria-invalid="true"
        >
          Time must be one of the available times
        </p>
      )}
      <label htmlFor="guests">Number of guests {requiredIndicator}</label>
      <input
        type="number"
        placeholder="1"
        min="1"
        max="10"
        id="guests"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        required
        aria-required="true"
        aria-valuemin={1}
        aria-valuemax={10}
        aria-label="Number of guests"
      />
      {!isValidGuests && (
        <p
          className="error-message"
          aria-labelledby="guests"
          aria-invalid="true"
        >
          Number of guests must be between 1 and 10
        </p>
      )}
      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
        aria-required="false"
        aria-label="Choose occasion"
      >
        <option>Birthday</option>
        <option>Anniversary</option>
      </select>
      {!isValidOccasion && (
        <p
          className="error-message"
          aria-labelledby="occasion"
          aria-invalid="true"
        >
          Occasion must be either Birthday or Anniversary
        </p>
      )}
      <input
        type="submit"
        value="Make Your reservation"
        aria-label="Submit reservation form"
      />
    </form>
  );
}

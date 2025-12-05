import { useBookingState } from "./BookingContext";
import "./BookingForm.css";

export function BookingForm() {
  const {
    date,
    time,
    availableTimes,
    guests,
    occasion,
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
      <input
        type="submit"
        value="Make Your reservation"
        aria-label="Submit reservation form"
      />
    </form>
  );
}

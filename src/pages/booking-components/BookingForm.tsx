import { useBookingState } from "./BookingContext";
import "./BookingForm.css";

export function BookingForm() {
  const {
    date,
    time,
    availableTimes,
    guests,
    occasion,
    occasionOptions,

    isValidDate,
    isValidTime,
    isValidGuests,
    isValidOccasion,
    visitedFields,

    handleSubmit,
    setDate,
    setTime,
    setGuests,
    setOccasion,

    onDateBlur,
    onTimeBlur,
    onGuestsBlur,
    onOccasionBlur,
  } = useBookingState();
  const requiredIndicator = (
    <span aria-label="required" className="required-indicator">
      *
    </span>
  );
  const optionalIndicator = (
    <span aria-label="optional" className="optional-indicator">
      (optional)
    </span>
  );
  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      aria-label="Book a table form"
    >
      <div className="form-row">
        <label htmlFor="res-date">Choose date {requiredIndicator}</label>
        <input
          type="date"
          id="res-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={onDateBlur}
          required
          aria-required="true"
          aria-label="Choose reservation date"
        />
        {!isValidDate && visitedFields.date && (
          <p
            className="error-message"
            aria-labelledby="res-date"
            aria-invalid="true"
          >
            Date must be today or later
          </p>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="res-time">Choose time {requiredIndicator}</label>
        <div className="select-wrapper with-icon">
          <select
            id="res-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            onBlur={onTimeBlur}
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
          <svg
            width="20"
            height="20"
            viewBox="-1 -1 22 22"
            xmlns="http://www.w3.org/2000/svg"
            className="select-icon"
          >
            <path d="M13.3 14.7L14.7 13.3L11 9.6V5H9V10.4L13.3 14.7ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2167 18 14.1042 17.2208 15.6625 15.6625C17.2208 14.1042 18 12.2167 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z" />
          </svg>
        </div>
        {!isValidTime && visitedFields.time && (
          <p
            className="error-message"
            aria-labelledby="res-time"
            aria-invalid="true"
          >
            Time must be one of the available times
          </p>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="guests">Number of guests {requiredIndicator}</label>
        <div className="number-input-wrapper">
          <input
            type="number"
            placeholder="1"
            min="1"
            max="10"
            id="guests"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            onBlur={onGuestsBlur}
            required
            aria-required="true"
            aria-valuemin={1}
            aria-valuemax={10}
            aria-label="Number of guests"
          />
          <button
            type="button"
            className="decrement-button"
            onClick={() => setGuests(guests - 1)}
            disabled={guests <= 1}
          >
            -
          </button>
          <button
            type="button"
            className="increment-button"
            onClick={() => setGuests(guests + 1)}
            disabled={guests >= 10}
          >
            +
          </button>
        </div>
        {!isValidGuests && visitedFields.guests && (
          <p
            className="error-message"
            aria-labelledby="guests"
            aria-invalid="true"
          >
            Number of guests must be between 1 and 10
          </p>
        )}
      </div>
      <div className="form-row">
        <label htmlFor="occasion">Occasion {optionalIndicator}</label>
        <div className="select-wrapper with-icon">
          <select
            id="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            onBlur={onOccasionBlur}
            aria-required="false"
            aria-label="Choose occasion"
          >
            <option value="">Select an occasion</option>
            {occasionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <svg
            width="42"
            height="34"
            viewBox="0 0 42 34"
            xmlns="http://www.w3.org/2000/svg"
            className="select-icon"
          >
            <path d="M30.4735 32.9976L29.6824 29.6824L33.6568 28.7341L32.0352 21.938C30.0441 22.0043 28.2017 21.2759 26.5081 19.7529C24.8144 18.2299 23.671 16.2252 23.0777 13.7388L20.7046 3.79329L36.6022 0L38.9753 9.94549C39.5686 12.4319 39.4534 14.7369 38.63 16.8605C37.8065 18.9842 36.4914 20.4659 34.6848 21.3058L36.3064 28.1019L40.2808 27.1535L41.0718 30.4687L30.4735 32.9976ZM32.6086 18.4725C33.845 18.1774 34.8149 17.4496 35.5181 16.2891C36.2214 15.1285 36.5561 13.793 36.5225 12.2827L26.3216 14.7167C26.9734 16.0795 27.8751 17.12 29.0266 17.838C30.1781 18.556 31.3721 18.7675 32.6086 18.4725ZM25.3318 11.449L35.9302 8.92013L34.7436 3.94738L24.1453 6.47624L25.3318 11.449Z" />
            <path d="M0 31.6173L0.492338 28.2448L4.53544 28.835L5.54474 21.9214C3.67047 21.246 2.22857 19.8874 1.21904 17.8456C0.209508 15.8038 -0.110631 13.5182 0.258622 10.9889L1.73564 0.871432L17.9081 3.23239L16.431 13.3498C16.0618 15.8792 15.1016 17.9779 13.5505 19.6458C11.9994 21.3138 10.2293 22.2035 8.24014 22.3149L7.23085 29.2285L11.274 29.8188L10.7816 33.1912L0 31.6173ZM7.36016 18.9143C8.61801 19.098 9.78839 18.7809 10.8713 17.963C11.9542 17.1452 12.7595 16.0286 13.2873 14.6131L2.91001 13.0981C3.01113 14.6054 3.46364 15.9057 4.26753 16.999C5.07143 18.0922 6.1023 18.7307 7.36016 18.9143ZM3.20019 9.69613L13.9818 11.2701L14.7203 6.21138L3.9387 4.63741L3.20019 9.69613Z" />
          </svg>
        </div>
        {!isValidOccasion && visitedFields.occasion && (
          <p
            className="error-message"
            aria-labelledby="occasion"
            aria-invalid="true"
          >
            Occasion must be either{" "}
            {occasionOptions
              .map(
                (option, i) =>
                  `${option}${
                    i < occasionOptions.length - 1
                      ? i < occasionOptions.length - 2
                        ? ", "
                        : " or "
                      : ""
                  }`
              )
              .join("")}
          </p>
        )}
      </div>
      <input
        type="submit"
        value="Make Your reservation"
        aria-label="Submit reservation form"
        className="button"
      />
    </form>
  );
}

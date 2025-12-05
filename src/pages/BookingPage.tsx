import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import "./BookingPage.css";

type BookingState = {
  date: string;
  time: string;
  availableTimes: string[];
  guests: number;
  occasion: string;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setGuests: (guests: number) => void;
  setOccasion: (occasion: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const BookingContext = createContext<BookingState | undefined>(undefined);

const defaultAvailableTimes = [
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [availableTimes, dispatchAvailableTimes] = useReducer(
    (state, action: { type: "reset" } | { type: "set-date"; date: string }) => {
      switch (action.type) {
        case "reset":
          return defaultAvailableTimes;
        case "set-date":
          // TODO: Implement time availability logic based on the selected date
          return state;
        default:
          return state;
      }
    },
    defaultAvailableTimes
  );
  function initializeTimes() {
    dispatchAvailableTimes({ type: "reset" });
  }
  function updateTimes(date: string) {
    dispatchAvailableTimes({ type: "set-date", date });
  }
  const [guests, setGuests] = useState<number>(1);
  const [occasion, setOccasion] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", { date, time, guests, occasion });
  };
  useEffect(() => {
    initializeTimes();
  }, []);
  useEffect(() => {
    updateTimes(date);
  }, [date]);
  const bookingState = {
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
    initializeTimes,
    updateTimes,
  };
  return (
    <BookingContext.Provider value={bookingState}>
      {children}
    </BookingContext.Provider>
  );
};

function useBookingState() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingState must be used within a BookingProvider");
  }
  return context;
}

function BookingForm() {
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

function BookingSection() {
  return (
    <main className="booking-section">
      <div className="container">
        <h1 className="title">Book a Table</h1>
        <BookingForm />
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <>
      <Nav />
      <BookingProvider>
        <BookingSection />
      </BookingProvider>
      <Footer />
    </>
  );
}

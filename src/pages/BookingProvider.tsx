import { useEffect, useReducer, useState } from "react";
import { BookingContext } from "./BookingContext";
import { fetchAPI, submitAPI } from "../api";

const localStorageKey = "booking-state";
function useStateWithLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookingStateInStorage, setBookingStateInStorage] =
    useStateWithLocalStorage(localStorageKey, {
      date: "",
      time: "",
      guests: 1,
      occasion: "",
    });
  const [date, setDate] = useState<string>(() => {
    if (bookingStateInStorage.date) return bookingStateInStorage.date;
    const date = new Date();
    return date.toISOString().split("T")[0];
  });
  const [time, setTime] = useState<string>(() => {
    if (bookingStateInStorage.time) return bookingStateInStorage.time;
    return "";
  });
  const [guests, setGuests] = useState<number>(() => {
    if (bookingStateInStorage.guests) return bookingStateInStorage.guests;
    return 1;
  });
  const [occasion, setOccasion] = useState<string>(() => {
    if (bookingStateInStorage.occasion) return bookingStateInStorage.occasion;
    return "";
  });
  const [availableTimes, dispatchAvailableTimes] = useReducer(
    (state, action: { type: "update"; availableTimes: string[] }) => {
      switch (action.type) {
        case "update":
          return action.availableTimes;
        default:
          return state;
      }
    },
    [] as string[]
  );
  async function updateTimes(date: string) {
    const availableTimes = await fetchAPI(new Date(date));
    dispatchAvailableTimes({ type: "update", availableTimes });
  }
  async function initializeTimes() {
    await updateTimes(date);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", { date, time, guests, occasion });
    submitAPI({ date, time, guests, occasion });
  };
  useEffect(() => {
    updateTimes(date);
  }, [date]);
  useEffect(() => {
    setBookingStateInStorage({ date, time, guests, occasion });
  }, [date, time, guests, occasion, setBookingStateInStorage]);
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

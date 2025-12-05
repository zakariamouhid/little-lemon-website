import { useEffect, useReducer, useState } from "react";
import { BookingContext } from "./BookingContext";

const defaultAvailableTimes = [
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

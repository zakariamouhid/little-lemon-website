import { createContext, useContext } from "react";

export type BookingState = {
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

export const BookingContext = createContext<BookingState | undefined>(
  undefined
);

export function useBookingState() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingState must be used within a BookingProvider");
  }
  return context;
}

import { useEffect, useReducer, useState } from "react";
import { BookingContext } from "./BookingContext";
import { fetchAPI, submitAPI } from "../../api";

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
  const [todayDate] = useState<string>(() => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  });
  const [date, setDate] = useState<string>(() => {
    if (bookingStateInStorage.date) return bookingStateInStorage.date;
    return todayDate;
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
    if (!isValidDate || !isValidTime || !isValidGuests || !isValidOccasion) {
      console.log("Form not submitted", { date, time, guests, occasion });
      setVisitedFields({
        ...visitedFields,
        date: true,
        time: true,
        guests: true,
        occasion: true,
      });
      return;
    }
    console.log("Form submitted", { date, time, guests, occasion });
    submitAPI({ date, time, guests, occasion });
  };
  useEffect(() => {
    updateTimes(date);
  }, [date]);
  useEffect(() => {
    setBookingStateInStorage({ date, time, guests, occasion });
  }, [date, time, guests, occasion, setBookingStateInStorage]);

  const [occasionOptions] = useState(["Birthday", "Engagement", "Anniversary"]);

  // Validate date
  const getIsValidDate = (date: string) => {
    return date >= todayDate;
  };
  const getIsValidTime = (time: string, availableTimes: string[]) => {
    return availableTimes.includes(time);
  };
  const getIsValidGuests = (guests: number) => {
    return guests >= 1 && guests <= 10;
  };
  const getIsValidOccasion = (occasion: string) => {
    return !occasion || occasionOptions.includes(occasion);
  };

  const [visitedFields, setVisitedFields] = useState({
    date: false,
    time: false,
    guests: false,
    occasion: false,
  });
  const onDateBlur = () => {
    setVisitedFields({ ...visitedFields, date: true });
  };
  const onTimeBlur = () => {
    setVisitedFields({ ...visitedFields, time: true });
  };
  const onGuestsBlur = () => {
    setVisitedFields({ ...visitedFields, guests: true });
  };
  const onOccasionBlur = () => {
    setVisitedFields({ ...visitedFields, occasion: true });
  };

  const isValidDate = getIsValidDate(date);
  const isValidTime = getIsValidTime(time, availableTimes);
  const isValidGuests = getIsValidGuests(guests);
  const isValidOccasion = getIsValidOccasion(occasion);

  const bookingState = {
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
    initializeTimes,
    updateTimes,

    onDateBlur,
    onTimeBlur,
    onGuestsBlur,
    onOccasionBlur,
  };
  return (
    <BookingContext.Provider value={bookingState}>
      {children}
    </BookingContext.Provider>
  );
};

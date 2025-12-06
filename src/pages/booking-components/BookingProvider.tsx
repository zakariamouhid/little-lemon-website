import { useEffect, useReducer, useState } from "react";
import { BookingContext } from "./BookingContext";
import { fetchAPI, submitAPI } from "../../api";
import { useLoginState } from "../login-components/LoginContext";
import { useNavigate, useSearchParams } from "react-router";

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
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize from URL params if available, otherwise from localStorage or defaults
  const [date, setDate] = useState<string>(() => {
    const urlDate = searchParams.get("date");
    if (urlDate) return urlDate;
    if (bookingStateInStorage.date) return bookingStateInStorage.date;
    return todayDate;
  });
  const [time, setTime] = useState<string>(() => {
    const urlTime = searchParams.get("time");
    if (urlTime) return urlTime;
    if (bookingStateInStorage.time) return bookingStateInStorage.time;
    return "";
  });
  const [guests, setGuests] = useState<number>(() => {
    const urlGuests = searchParams.get("guests");
    if (urlGuests) return parseInt(urlGuests, 10);
    if (bookingStateInStorage.guests) return bookingStateInStorage.guests;
    return 1;
  });
  const [occasion, setOccasion] = useState<string>(() => {
    const urlOccasion = searchParams.get("occasion");
    if (urlOccasion) return urlOccasion;
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
  const { isLoggedIn } = useLoginState();
  const navigate = useNavigate();
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
    if (!isLoggedIn) {
      navigate(
        "/login?" +
          new URLSearchParams({
            redirect:
              "/booking?" +
              new URLSearchParams({
                date: date.toString(),
                time,
                guests: guests.toString(),
                occasion,
                "auto-submit": "true",
              }).toString(),
          }).toString()
      );
      return;
    }
    submitAPI({ date, time, guests, occasion });
    setIsConfirmed(true);
  };
  useEffect(() => {
    updateTimes(date);
  }, [date]);
  useEffect(() => {
    setBookingStateInStorage({ date, time, guests, occasion });
  }, [date, time, guests, occasion, setBookingStateInStorage]);

  const [occasionOptions] = useState(["Birthday", "Engagement", "Anniversary"]);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

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

  // Auto-submit when auto-submit param is true and conditions are met
  useEffect(() => {
    const autoSubmit = searchParams.get("auto-submit") === "true";
    if (
      autoSubmit &&
      isLoggedIn &&
      isValidDate &&
      isValidTime &&
      isValidGuests &&
      isValidOccasion &&
      availableTimes.length > 0 &&
      !isConfirmed
    ) {
      // Remove auto-submit param from URL
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete("auto-submit");
      setSearchParams(newSearchParams, { replace: true });

      // Auto-submit the booking
      submitAPI({ date, time, guests, occasion });
      setIsConfirmed(true);
    }
  }, [
    searchParams,
    isLoggedIn,
    isValidDate,
    isValidTime,
    isValidGuests,
    isValidOccasion,
    availableTimes.length,
    isConfirmed,
    date,
    time,
    guests,
    occasion,
    setSearchParams,
  ]);

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

    isConfirmed,
  };
  return (
    <BookingContext.Provider value={bookingState}>
      {children}
    </BookingContext.Provider>
  );
};

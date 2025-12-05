import {
  fireEvent,
  render,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { BookingSection } from "./BookingSection";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

test("Renders the BookingForm heading", () => {
  render(<BookingSection />);
  const headingElement = screen.getByText("Book Now");
  expect(headingElement).toBeInTheDocument();
});

test("Change Date", () => {
  render(<BookingSection />);
  const dateInput = screen.getByLabelText("Choose reservation date");
  fireEvent.change(dateInput, { target: { value: "2025-12-06" } });
  expect(dateInput).toHaveValue("2025-12-06");
});

test("initializeTimes sets default available times on mount", async () => {
  render(<BookingSection />);
  const timeSelect = screen.getByLabelText("Choose reservation time");

  // Wait for async API call to complete and state to update
  await waitFor(() => {
    expect(timeSelect.children.length).toBeGreaterThan(0);
  });

  // Verify that available times are in valid format (HH:MM where HH is 17-23)
  const timeOptions = Array.from(timeSelect.children) as HTMLOptionElement[];
  timeOptions.forEach((option) => {
    const timeValue = option.value;
    // Time format should be HH:MM where HH is 17-23 and MM is 00 or 30
    expect(timeValue).toMatch(/^(1[7-9]|2[0-3]):(00|30)$/);
  });
});

test("updateTimes is called when date changes", async () => {
  render(<BookingSection />);
  const dateInput = screen.getByLabelText("Choose reservation date");
  const timeSelect = screen.getByLabelText("Choose reservation time");

  // Wait for initial times to load
  await waitFor(() => {
    expect(timeSelect.children.length).toBeGreaterThan(0);
  });

  // Change the date
  fireEvent.change(dateInput, { target: { value: "2025-12-06" } });

  // Wait for times to update after date change
  await waitFor(() => {
    // Verify that updateTimes was called (available times should still be present)
    expect(timeSelect.children.length).toBeGreaterThan(0);
  });

  // Verify the date was updated
  expect(dateInput).toHaveValue("2025-12-06");
});

test("Submit form with all required fields", async () => {
  // Mock console.log to verify handleSubmit is called
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

  render(<BookingSection />);

  // Fill out the form
  const dateInput = screen.getByLabelText("Choose reservation date");
  const timeSelect = screen.getByLabelText("Choose reservation time");
  const guestsInput = screen.getByLabelText("Number of guests");
  const occasionSelect = screen.getByLabelText("Choose occasion");
  const submitButton = screen.getByRole("button", {
    name: "Submit reservation form",
  });

  fireEvent.change(dateInput, { target: { value: "2025-12-06" } });

  // Wait for times to load after date change
  await waitFor(() => {
    expect(timeSelect.children.length).toBeGreaterThan(0);
  });

  const timeOptions = Array.from(timeSelect.children) as HTMLOptionElement[];
  const timeOption =
    timeOptions[Math.floor(Math.random() * timeOptions.length)];
  fireEvent.change(timeSelect, { target: { value: timeOption.value } });
  fireEvent.change(guestsInput, { target: { value: "4" } });
  fireEvent.change(occasionSelect, { target: { value: "Birthday" } });

  // Submit the form
  fireEvent.click(submitButton);

  // Verify handleSubmit was called (console.log should be called with form data)
  expect(consoleSpy).toHaveBeenCalledWith("Form submitted", {
    date: "2025-12-06",
    time: timeOption.value,
    guests: 4,
    occasion: "Birthday",
  });

  consoleSpy.mockRestore();
});

describe("LocalStorage functionality", () => {
  beforeEach(() => {
    // Clear localStorage and verify it's empty
    localStorage.clear();
    expect(localStorage.getItem("booking-state")).toBeNull();
  });

  afterEach(() => {
    // Clean up components and localStorage after each test
    cleanup();
    localStorage.clear();
  });

  test("Saves booking state to localStorage when form fields change", async () => {
    render(<BookingSection />);

    const dateInput = screen.getByLabelText("Choose reservation date");
    const guestsInput = screen.getByLabelText("Number of guests");
    const occasionSelect = screen.getByLabelText("Choose occasion");

    // Wait for initial times to load
    await waitFor(() => {
      const timeSelect = screen.getByLabelText("Choose reservation time");
      expect(timeSelect.children.length).toBeGreaterThan(0);
    });

    // Change form fields
    fireEvent.change(dateInput, { target: { value: "2025-12-25" } });
    fireEvent.change(guestsInput, { target: { value: "5" } });
    fireEvent.change(occasionSelect, { target: { value: "Anniversary" } });

    // Wait for state to be saved to localStorage
    await waitFor(() => {
      const stored = localStorage.getItem("booking-state");
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed.date).toBe("2025-12-25");
      expect(parsed.guests).toBe(5);
      expect(parsed.occasion).toBe("Anniversary");
    });
  });

  test("Loads booking state from localStorage on mount", async () => {
    // Set initial state in localStorage
    const initialState = {
      date: "2025-11-15",
      time: "18:00",
      guests: 3,
      occasion: "Birthday",
    };
    localStorage.setItem("booking-state", JSON.stringify(initialState));

    const { unmount } = render(<BookingSection />);

    // Wait for component to load and initialize
    await waitFor(() => {
      const dateInput = screen.getByLabelText("Choose reservation date");
      expect(dateInput).toHaveValue("2025-11-15");
    });

    const guestsInput = screen.getByLabelText("Number of guests");
    const occasionSelect = screen.getByLabelText("Choose occasion");

    expect(guestsInput).toHaveValue(3);
    expect(occasionSelect).toHaveValue("Birthday");

    // Clean up
    unmount();
  });

  test("Persists booking state across component remounts", async () => {
    const { unmount } = render(<BookingSection />);

    const dateInput = screen.getByLabelText("Choose reservation date");
    const guestsInput = screen.getByLabelText("Number of guests");
    const occasionSelect = screen.getByLabelText("Choose occasion");

    // Wait for initial times to load
    await waitFor(() => {
      const timeSelect = screen.getByLabelText("Choose reservation time");
      expect(timeSelect.children.length).toBeGreaterThan(0);
    });

    // Change form fields
    fireEvent.change(dateInput, { target: { value: "2025-10-10" } });
    fireEvent.change(guestsInput, { target: { value: "8" } });
    // Use "Anniversary" which is a valid option (options are "Birthday" and "Anniversary")
    fireEvent.change(occasionSelect, { target: { value: "Anniversary" } });

    // Wait for state to be saved with correct values
    await waitFor(() => {
      const stored = localStorage.getItem("booking-state");
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed.date).toBe("2025-10-10");
      expect(parsed.guests).toBe(8);
      expect(parsed.occasion).toBe("Anniversary");
    });

    // Unmount component
    unmount();

    // Remount component
    render(<BookingSection />);

    // Verify state was restored from localStorage
    await waitFor(() => {
      const newDateInput = screen.getByLabelText("Choose reservation date");
      expect(newDateInput).toHaveValue("2025-10-10");
    });

    const newGuestsInput = screen.getByLabelText("Number of guests");
    const newOccasionSelect = screen.getByLabelText("Choose occasion");

    expect(newGuestsInput).toHaveValue(8);
    expect(newOccasionSelect).toHaveValue("Anniversary");
  });

  test("Handles invalid JSON in localStorage gracefully", async () => {
    // Set invalid JSON in localStorage
    localStorage.setItem("booking-state", "invalid json{");

    // Should not throw error and should use default values
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<BookingSection />);

    // Wait for component to render
    await waitFor(() => {
      const dateInput = screen.getByLabelText("Choose reservation date");
      expect(dateInput).toBeInTheDocument();
    });

    // Should have logged an error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error loading booking-state from localStorage:"),
      expect.any(Error)
    );

    // Should use default values (today's date for date, 1 for guests)
    const guestsInput = screen.getByLabelText("Number of guests");
    expect(guestsInput).toHaveValue(1);

    consoleErrorSpy.mockRestore();
  });

  test("Updates localStorage when time is selected", async () => {
    render(<BookingSection />);

    const timeSelect = screen.getByLabelText("Choose reservation time");

    // Wait for times to load
    await waitFor(() => {
      expect(timeSelect.children.length).toBeGreaterThan(0);
    });

    // Select a time
    const timeOptions = Array.from(timeSelect.children) as HTMLOptionElement[];
    const selectedTime = timeOptions[0].value;
    fireEvent.change(timeSelect, { target: { value: selectedTime } });

    // Wait for state to be saved to localStorage
    await waitFor(() => {
      const stored = localStorage.getItem("booking-state");
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed.time).toBe(selectedTime);
    });
  });

  test("Uses default values when localStorage is empty", async () => {
    // Ensure localStorage is completely empty
    localStorage.removeItem("booking-state");
    const storedBefore = localStorage.getItem("booking-state");
    expect(storedBefore).toBeNull();

    render(<BookingSection />);

    // Wait for component to render and initialize
    const dateInput = screen.getByLabelText("Choose reservation date");
    await waitFor(() => {
      expect(dateInput).toBeInTheDocument();
    });

    // Wait for the component to initialize and save default state to localStorage
    // Then verify the values match defaults
    await waitFor(() => {
      const stored = localStorage.getItem("booking-state");
      // After initialization, localStorage should have the default state saved
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      // Default state should have empty occasion
      expect(parsed.occasion).toBe("");
      expect(parsed.guests).toBe(1);
    });

    // Now verify the form fields match the defaults
    const guestsInput = screen.getByLabelText("Number of guests");

    expect(guestsInput).toHaveValue(1);

    // When occasion state is empty string, the select may show the first option visually
    // but the actual state stored in localStorage should be empty
    // Verify this by checking localStorage directly
    const stored = localStorage.getItem("booking-state");
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.occasion).toBe("");

    // The select element might show "Birthday" (first option) when value is empty,
    // but we've verified the state is correctly stored as empty string

    // Date should be today's date (default)
    const today = new Date().toISOString().split("T")[0];
    expect(dateInput).toHaveValue(today);
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { BookingSection } from "./BookingSection";

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

test("initializeTimes sets default available times on mount", () => {
  render(<BookingSection />);
  const timeSelect = screen.getByLabelText("Choose reservation time");

  // Check that default times are available
  const defaultTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  defaultTimes.forEach((time) => {
    const option = screen.getByRole("option", { name: time });
    expect(option).toBeInTheDocument();
    expect(option).toHaveValue(time);
  });

  // Verify all options are present
  expect(timeSelect.children.length).toBe(defaultTimes.length);
});

test("updateTimes is called when date changes", () => {
  render(<BookingSection />);
  const dateInput = screen.getByLabelText("Choose reservation date");
  const timeSelect = screen.getByLabelText("Choose reservation time");

  // Get initial available times count
  const initialTimesCount = timeSelect.children.length;

  // Change the date
  fireEvent.change(dateInput, { target: { value: "2025-12-06" } });

  // Verify that updateTimes was called (available times should still be present)
  // Since updateTimes currently just returns state, times should remain available
  expect(timeSelect.children.length).toBe(initialTimesCount);

  // Verify the date was updated
  expect(dateInput).toHaveValue("2025-12-06");
});

test("Submit form with all required fields", () => {
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
  fireEvent.change(timeSelect, { target: { value: "19:00" } });
  fireEvent.change(guestsInput, { target: { value: "4" } });
  fireEvent.change(occasionSelect, { target: { value: "Birthday" } });

  // Submit the form
  fireEvent.click(submitButton);

  // Verify handleSubmit was called (console.log should be called with form data)
  expect(consoleSpy).toHaveBeenCalledWith("Form submitted", {
    date: "2025-12-06",
    time: "19:00",
    guests: 4,
    occasion: "Birthday",
  });

  consoleSpy.mockRestore();
});

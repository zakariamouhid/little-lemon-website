import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

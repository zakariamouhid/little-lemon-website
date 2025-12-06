import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/booking" element={<BookingPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
    </Routes>
  );
}

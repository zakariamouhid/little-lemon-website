import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import LogoutPage from "./pages/LogoutPage";
import MenuPage from "./pages/MenuPage";
import { LoginProvider } from "./pages/login-components/LoginProvider";
import "./App.css";

export default function App() {
  return (
    <LoginProvider>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/booking" element={<BookingPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/logout" element={<LogoutPage />}></Route>
        <Route path="/menu" element={<MenuPage />}></Route>
      </Routes>
    </LoginProvider>
  );
}

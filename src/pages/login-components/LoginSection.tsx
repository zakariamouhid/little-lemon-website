import { LoginForm } from "./LoginForm";
import "./LoginSection.css";

export function LoginSection() {
  return (
    <main className="login-section">
      <div className="container">
        <h1 className="title">Login</h1>
        <LoginForm />
      </div>
    </main>
  );
}

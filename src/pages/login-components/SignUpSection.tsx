import { SignUpForm } from "./SignUpForm";
import "./LoginSection.css";

export function SignUpSection() {
  return (
    <main className="login-section">
      <div className="container">
        <h1 className="title">Sign Up</h1>
        <SignUpForm />
      </div>
    </main>
  );
}

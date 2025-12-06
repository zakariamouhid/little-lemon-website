import { Link } from "react-router";
import { useLoginState } from "./LoginContext";
import "./LoginForm.css";

export function SignUpForm() {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    isValidFullName,
    isValidEmail,
    isValidPassword,
    isValidPhoneNumber,
    visitedFields,
    setFullName,
    setEmail,
    setPassword,
    setPhoneNumber,
    handleSignUp,
    resetForm,
    onFullNameBlur,
    onEmailBlur,
    onPasswordBlur,
    onPhoneNumberBlur,
  } = useLoginState();

  const requiredIndicator = (
    <span aria-label="required" className="required-indicator">
      *
    </span>
  );
  const optionalIndicator = (
    <span aria-label="optional" className="optional-indicator">
      (optional)
    </span>
  );

  return (
    <div className="login-form-container">
      <form
        className="login-form"
        onSubmit={handleSignUp}
        aria-label="Sign up form"
      >
        <div className="form-row">
          <label htmlFor="full-name">Full name {requiredIndicator}</label>
          <input
            type="text"
            id="full-name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onBlur={onFullNameBlur}
            autoComplete="name"
            required
            aria-required="true"
            aria-label="Enter your full name"
            placeholder="John Doe"
          />
          {!isValidFullName && visitedFields.fullName && (
            <p
              className="error-message"
              aria-labelledby="full-name"
              aria-invalid="true"
            >
              Full name must be at least 2 characters
            </p>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="email">Email {requiredIndicator}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={onEmailBlur}
            autoComplete="email"
            required
            aria-required="true"
            aria-label="Enter your email"
            placeholder="john@example.com"
          />
          {!isValidEmail && visitedFields.email && (
            <p
              className="error-message"
              aria-labelledby="email"
              aria-invalid="true"
            >
              Please enter a valid email address
            </p>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="password">Password {requiredIndicator}</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={onPasswordBlur}
            autoComplete="new-password"
            required
            aria-required="true"
            aria-label="Enter your password"
            placeholder="••••••"
          />
          {!isValidPassword && visitedFields.password && (
            <p
              className="error-message"
              aria-labelledby="password"
              aria-invalid="true"
            >
              Password must be at least 6 characters
            </p>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="phone-number">Phone number {optionalIndicator}</label>
          <input
            type="tel"
            id="phone-number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onBlur={onPhoneNumberBlur}
            autoComplete="tel"
            aria-required="false"
            aria-label="Enter your phone number (optional)"
            placeholder="(555) 123-4567"
          />
          {!isValidPhoneNumber && visitedFields.phoneNumber && (
            <p
              className="error-message"
              aria-labelledby="phone-number"
              aria-invalid="true"
            >
              Please enter a valid phone number (at least 10 digits)
            </p>
          )}
        </div>

        <input
          type="submit"
          value="Sign Up"
          aria-label="Submit sign up form"
          className="button"
        />
      </form>

      <div className="toggle-container">
        <span className="toggle-text">Already a member? </span>
        <Link to="/login" className="toggle-button" onClick={resetForm}>
          Log In
        </Link>
      </div>
    </div>
  );
}

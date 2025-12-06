import { Link, useNavigate, useSearchParams } from "react-router";
import { useLoginState } from "./LoginContext";
import "./LoginForm.css";

export function LoginForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    email,
    password,
    isValidEmail,
    isValidPassword,
    signInError,
    visitedFields,
    setEmail,
    setPassword,
    handleSignIn,
    resetForm,
    onEmailBlur,
    onPasswordBlur,
  } = useLoginState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const success = handleSignIn(e);
    if (success) {
      const redirectPath = searchParams.get("redirect") || "/";
      navigate(redirectPath);
    }
  };

  const requiredIndicator = (
    <span aria-label="required" className="required-indicator">
      *
    </span>
  );

  return (
    <div className="login-form-container">
      <form
        className="login-form"
        onSubmit={handleSubmit}
        aria-label="Sign in form"
      >
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
            autoComplete="current-password"
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

        {signInError && (
          <p className="error-message" aria-live="polite" role="alert">
            {signInError}
          </p>
        )}

        <input
          type="submit"
          value="Sign In"
          aria-label="Submit sign in form"
          className="button"
        />
      </form>

      <div className="toggle-container">
        <span className="toggle-text">Don't have an account? </span>
        <Link to="/signup" className="toggle-button" onClick={resetForm}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}

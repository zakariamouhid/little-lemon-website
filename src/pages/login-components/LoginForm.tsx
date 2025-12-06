import { useLoginState } from "./LoginContext";
import "./LoginForm.css";

export function LoginForm() {
  const {
    isSignUp,
    fullName,
    email,
    password,
    isValidFullName,
    isValidEmail,
    isValidPassword,
    visitedFields,
    setIsSignUp,
    setFullName,
    setEmail,
    setPassword,
    handleSignUp,
    handleSignIn,
    resetForm,
    onFullNameBlur,
    onEmailBlur,
    onPasswordBlur,
  } = useLoginState();

  const requiredIndicator = (
    <span aria-label="required" className="required-indicator">
      *
    </span>
  );

  return (
    <div className="login-form-container">
      <form
        className="login-form"
        onSubmit={isSignUp ? handleSignUp : handleSignIn}
        aria-label={isSignUp ? "Sign up form" : "Sign in form"}
      >
        {isSignUp && (
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
        )}

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
            autoComplete={isSignUp ? "new-password" : "current-password"}
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

        <input
          type="submit"
          value={isSignUp ? "Sign Up" : "Sign In"}
          aria-label={isSignUp ? "Submit sign up form" : "Submit sign in form"}
          className="button"
        />
      </form>

      <div className="toggle-container">
        {isSignUp ? (
          <>
            <span className="toggle-text">Already a member? </span>
            <button
              type="button"
              className="toggle-button"
              onClick={() => {
                setIsSignUp(false);
                resetForm();
              }}
              aria-label="Switch to sign in form"
            >
              Log In
            </button>
          </>
        ) : (
          <>
            <span className="toggle-text">Don't have an account? </span>
            <button
              type="button"
              className="toggle-button"
              onClick={() => {
                setIsSignUp(true);
                resetForm();
              }}
              aria-label="Switch to sign up form"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

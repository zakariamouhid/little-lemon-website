import { useState, useEffect } from "react";
import { LoginContext } from "./LoginContext";

const localStorageKey = "login-state";
const usersSignupsKey = "users-signups";

type User = {
  fullName: string;
  email: string;
  password: string;
};

function useStateWithLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginStateInStorage, setLoginStateInStorage] =
    useStateWithLocalStorage(localStorageKey, {
      isLoggedIn: false,
      user: null as User | null,
    });

  const [usersSignups, setUsersSignups] = useStateWithLocalStorage<User[]>(
    usersSignupsKey,
    []
  );

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    loginStateInStorage.isLoggedIn
  );
  const [user, setUser] = useState<User | null>(loginStateInStorage.user);

  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmailState] = useState<string>("");
  const [password, setPasswordState] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // Wrapper functions to clear errors when user types
  const setEmail = (value: string) => {
    setEmailState(value);
    setSignInError(null);
    setSignUpError(null);
  };

  const setPassword = (value: string) => {
    setPasswordState(value);
    setSignInError(null);
  };

  const [visitedFields, setVisitedFields] = useState({
    fullName: false,
    email: false,
    password: false,
    phoneNumber: false,
  });

  const [signInError, setSignInError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  // Validation functions
  const getIsValidFullName = (name: string) => {
    return name.trim().length >= 2;
  };

  const getIsValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getIsValidPassword = (password: string) => {
    return password.length >= 6;
  };

  const getIsValidPhoneNumber = (phone: string) => {
    // Phone number is optional, so it's valid if empty
    if (!phone.trim()) return true;
    // If provided, validate format (allows digits, spaces, dashes, parentheses, plus)
    const phoneRegex = /^[\d\s\-+()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
  };

  const isValidFullName = getIsValidFullName(fullName);
  const isValidEmail = getIsValidEmail(email);
  const isValidPassword = getIsValidPassword(password);
  const isValidPhoneNumber = getIsValidPhoneNumber(phoneNumber);

  // Blur handlers
  const onFullNameBlur = () => {
    setVisitedFields({ ...visitedFields, fullName: true });
  };

  const onEmailBlur = () => {
    setVisitedFields({ ...visitedFields, email: true });
  };

  const onPasswordBlur = () => {
    setVisitedFields({ ...visitedFields, password: true });
  };

  const onPhoneNumberBlur = () => {
    setVisitedFields({ ...visitedFields, phoneNumber: true });
  };

  // Sign up handler
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>): boolean => {
    e.preventDefault();
    setSignUpError(null);
    if (
      !isValidFullName ||
      !isValidEmail ||
      !isValidPassword ||
      !isValidPhoneNumber
    ) {
      console.log("Sign up form not submitted", {
        fullName,
        email,
        password,
        phoneNumber,
      });
      setVisitedFields({
        fullName: true,
        email: true,
        password: true,
        phoneNumber: true,
      });
      return false;
    }

    // Check if user already exists
    const emailLower = email.trim().toLowerCase();
    const existingUser = usersSignups.find(
      (u) => u.email.toLowerCase() === emailLower
    );

    if (existingUser) {
      setSignUpError(
        "An account with this email already exists. Please sign in instead."
      );
      setVisitedFields({
        fullName: true,
        email: true,
        password: true,
        phoneNumber: true,
      });
      return false;
    }

    // Store user data (in a real app, this would be an API call)
    const newUser: User = {
      fullName: fullName.trim(),
      email: email.trim(),
      password: password,
    };

    // Add to users list
    setUsersSignups([...usersSignups, newUser]);

    // Set as logged in user
    setUser(newUser);
    setIsLoggedIn(true);
    setLoginStateInStorage({
      isLoggedIn: true,
      user: newUser,
    });

    // Reset form
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setSignUpError(null);
    setVisitedFields({
      fullName: false,
      email: false,
      password: false,
      phoneNumber: false,
    });

    console.log("User signed up successfully", newUser);
    return true;
  };

  // Sign in handler
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>): boolean => {
    e.preventDefault();
    setSignInError(null);
    if (!isValidEmail || !isValidPassword) {
      console.log("Sign in form not submitted", { email, password });
      setVisitedFields({
        fullName: false,
        email: true,
        password: true,
        phoneNumber: false,
      });
      return false;
    }

    // In a real app, this would verify credentials with an API
    // Check if user exists in the users list and verify the password
    const emailLower = email.trim().toLowerCase();
    const storedUser = usersSignups.find(
      (u) => u.email.toLowerCase() === emailLower && u.password === password
    );

    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setLoginStateInStorage({
        isLoggedIn: true,
        user: storedUser,
      });

      // Reset form
      setEmail("");
      setPassword("");
      setSignInError(null);
      setVisitedFields({
        fullName: false,
        email: false,
        password: false,
        phoneNumber: false,
      });

      console.log("User signed in successfully", storedUser);
      return true;
    } else {
      setSignInError("Invalid email or password. Please try again or sign up.");
      setVisitedFields({
        fullName: false,
        email: true,
        password: true,
        phoneNumber: false,
      });
      return false;
    }
  };

  // Sign out handler
  const signOut = () => {
    setUser(null);
    setIsLoggedIn(false);
    setLoginStateInStorage({
      isLoggedIn: false,
      user: null,
    });
    console.log("User signed out");
  };

  // Reset form handler
  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setSignInError(null);
    setSignUpError(null);
    setVisitedFields({
      fullName: false,
      email: false,
      password: false,
      phoneNumber: false,
    });
  };

  // Update localStorage when login state changes
  useEffect(() => {
    setLoginStateInStorage({
      isLoggedIn,
      user,
    });
  }, [isLoggedIn, user, setLoginStateInStorage]);

  const loginState = {
    isLoggedIn,
    user,
    isSignUp,
    fullName,
    email,
    password,
    phoneNumber,
    isValidFullName,
    isValidEmail,
    isValidPassword,
    isValidPhoneNumber,
    signInError,
    signUpError,
    visitedFields,
    setIsSignUp,
    setFullName,
    setEmail,
    setPassword,
    setPhoneNumber,
    handleSignUp,
    handleSignIn,
    signOut,
    resetForm,
    onFullNameBlur,
    onEmailBlur,
    onPasswordBlur,
    onPhoneNumberBlur,
  };

  return (
    <LoginContext.Provider value={loginState}>{children}</LoginContext.Provider>
  );
};

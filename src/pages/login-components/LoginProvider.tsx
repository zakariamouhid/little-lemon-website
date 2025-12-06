import { useState, useEffect } from "react";
import { LoginContext } from "./LoginContext";

const localStorageKey = "login-state";

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
      user: null as { fullName: string; email: string } | null,
    });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    loginStateInStorage.isLoggedIn
  );
  const [user, setUser] = useState<{
    fullName: string;
    email: string;
  } | null>(loginStateInStorage.user);

  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [visitedFields, setVisitedFields] = useState({
    fullName: false,
    email: false,
    password: false,
    phoneNumber: false,
  });

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
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      return;
    }

    // Store user data (in a real app, this would be an API call)
    const newUser = {
      fullName: fullName.trim(),
      email: email.trim(),
    };

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
    setVisitedFields({
      fullName: false,
      email: false,
      password: false,
      phoneNumber: false,
    });

    console.log("User signed up successfully", newUser);
  };

  // Sign in handler
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail || !isValidPassword) {
      console.log("Sign in form not submitted", { email, password });
      setVisitedFields({
        fullName: false,
        email: true,
        password: true,
        phoneNumber: false,
      });
      return;
    }

    // In a real app, this would verify credentials with an API
    // For now, we'll check if user exists in localStorage
    // In a real scenario, you'd verify the password
    const storedUser = loginStateInStorage.user;
    if (
      storedUser &&
      storedUser.email.toLowerCase() === email.trim().toLowerCase()
    ) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setLoginStateInStorage({
        isLoggedIn: true,
        user: storedUser,
      });

      // Reset form
      setEmail("");
      setPassword("");
      setVisitedFields({
        fullName: false,
        email: false,
        password: false,
        phoneNumber: false,
      });

      console.log("User signed in successfully", storedUser);
    } else {
      alert("Invalid email or password. Please try again or sign up.");
      setVisitedFields({
        fullName: false,
        email: true,
        password: true,
        phoneNumber: false,
      });
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

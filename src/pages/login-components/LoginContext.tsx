import { createContext, useContext } from "react";

export type LoginState = {
  isLoggedIn: boolean;
  user: {
    fullName: string;
    email: string;
  } | null;

  // Form state
  isSignUp: boolean;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;

  // Validation
  isValidFullName: boolean;
  isValidEmail: boolean;
  isValidPassword: boolean;
  isValidPhoneNumber: boolean;
  visitedFields: {
    fullName: boolean;
    email: boolean;
    password: boolean;
    phoneNumber: boolean;
  };

  // Actions
  setIsSignUp: (isSignUp: boolean) => void;
  setFullName: (fullName: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSignIn: (e: React.FormEvent<HTMLFormElement>) => void;
  signOut: () => void;
  resetForm: () => void;

  // Blur handlers
  onFullNameBlur: () => void;
  onEmailBlur: () => void;
  onPasswordBlur: () => void;
  onPhoneNumberBlur: () => void;
};

export const LoginContext = createContext<LoginState | undefined>(undefined);

export function useLoginState() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginState must be used within a LoginProvider");
  }
  return context;
}

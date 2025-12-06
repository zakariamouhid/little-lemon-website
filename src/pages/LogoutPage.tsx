import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLoginState } from "./login-components/LoginContext";

export default function LogoutPage() {
  const navigate = useNavigate();
  const { signOut } = useLoginState();

  useEffect(() => {
    signOut();
    navigate("/");
  }, [signOut, navigate]);

  return null;
}

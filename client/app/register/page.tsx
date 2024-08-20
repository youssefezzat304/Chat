"use client";
//----------- React/Next ----------------------------------------------------------------//
import { useEffect, useState } from "react";
//----------- Contexts ----------------------------------------------------------------//
import { useThemeContext } from "../contexts/ThemeContext";
//----------- SVGs ----------------------------------------------------------------//
import BlackBg from "../components/SVGs/BlackBg";
import { LightBg } from "../components/SVGs/LightBg";
import LoginIcon from "../components/SVGs/LoginIcon";
import SignUpIcon from "../components/SVGs/SignUpIcon";
//----------- Components ----------------------------------------------------------//
import Login from "./Login";
import SignUp from "./SignUp";
import DarkModeBtn from "../components/buttons/DarkModeBtn";
import Loading from "../components/scenes/loading";
import { useUserStore } from "../utils/stores/user.store";
import useAuthenticateUser from "../hooks/useAuthenticateUser";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { isLoading } = useAuthenticateUser();

  useEffect(() => {
    if (user) return router.replace("/dashboard");
  }, [user, router]);

  const { theme, setTheme } = useThemeContext(),
    [loginScreen, setLoginScreen] = useState(true);

  const signUp = () => {
    setLoginScreen(false);
  };
  const logIn = () => {
    setLoginScreen(true);
  };
  const toggleDarkMode = () => {
    setTheme(!theme);
  };

  if (isLoading) return <Loading />;

  if (user) {
    return <Loading />;
  }

  return (
    <main className="register-main">
      <div className="register-card" data-theme={theme && "dark"}>
        <DarkModeBtn toggleDarkMode={toggleDarkMode} />
        <div className="register-image">
          {loginScreen ? <LoginIcon /> : <SignUpIcon />}
        </div>
        <div className="register-form">
          {loginScreen ? <Login signUp={signUp} /> : <SignUp logIn={logIn} />}
        </div>
      </div>
      <div className="glass"></div>
      {theme ? <BlackBg className="bg" /> : <LightBg className="bg" />}
    </main>
  );
};

export default Register;

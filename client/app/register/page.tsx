"use client";
import { useCallback, useEffect, useState } from "react";
import {
  LightBg,
  LoginIcon,
  SignUpIcon,
  RoutesLoading,
} from "../../_components";
import Login from "./Login";
import SignUp from "./SignUp";
import { useUserStore } from "../../utils/stores";
import useAuthenticateUser from "../../hooks/useAuthenticateUser";
import { useRouter } from "next/navigation";

import styles from "./index.module.css";

const Register = () => {
  const router = useRouter();
  const { isLoading } = useAuthenticateUser();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) return router.replace("/dashboard");
  }, [user, router]);

  const [loginScreen, setLoginScreen] = useState(true);
  const signUp = useCallback(() => setLoginScreen(false), []);
  const logIn = useCallback(() => setLoginScreen(true), []);

  if (user || isLoading) return <RoutesLoading />;
  return (
    <main className={styles.registerMain}>
      <div className={styles.registerCard}>
        <div className={styles.registerImage}>
          {loginScreen ? <LoginIcon /> : <SignUpIcon />}
        </div>
        <div className={styles.registerForm}>
          {loginScreen ? <Login signUp={signUp} /> : <SignUp logIn={logIn} />}
        </div>
      </div>
      <div className={styles.glass}></div>
      <LightBg className={styles.bg} />
    </main>
  );
};

export default Register;

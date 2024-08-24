"use client";
import { SyncLoader } from "react-spinners";
import { useThemeContext } from "@/app/contexts/ThemeContext";
import { LightBg, BlackBg } from "../";

const Loading = () => {
  const { theme } = useThemeContext();

  return (
    <main className="register-main">
      <SyncLoader />
      {theme ? <BlackBg className="bg" /> : <LightBg className="bg" />}
    </main>
  );
};

export default Loading;

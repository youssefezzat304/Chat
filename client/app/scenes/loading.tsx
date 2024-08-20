"use client"
import { SyncLoader } from "react-spinners";
import { useThemeContext } from "../contexts/ThemeContext";
import BlackBg from "../SVGs/BlackBg";
import { LightBg } from "../SVGs/LightBg";

const Loading = () => {
  const { theme } = useThemeContext();

  return (
    <main className="register-main">
        <SyncLoader />
      {theme ? <BlackBg className="bg" /> : <LightBg className="bg" />}
    </main>
  );
}

export default Loading

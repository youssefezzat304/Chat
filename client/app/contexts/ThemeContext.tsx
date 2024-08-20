"use client";
import {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";

interface ThemeContextType {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
  systemLoading: boolean;
  setSystemLoading: Dispatch<SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<boolean>(false);
  const [systemLoading, setSystemLoading] = useState<boolean>(true);
  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, systemLoading, setSystemLoading }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}

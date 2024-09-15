"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Poppins } from "next/font/google";
import { ThemeContextWrapper } from "@/contexts/ThemeContext";
import "@/styles/globals.css";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useAxiosPrivate();
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <QueryClientProvider client={queryClient}>
        <ThemeContextWrapper>
          <body>{children}</body>
        </ThemeContextWrapper>
      </QueryClientProvider>
    </html>
  );
}

"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import { ThemeContextWrapper } from "@/contexts/ThemeContext";
import "../styles";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <ThemeContextWrapper>
          <body className={inter.className}>{children}</body>
        </ThemeContextWrapper>
      </QueryClientProvider>
    </html>
  );
}

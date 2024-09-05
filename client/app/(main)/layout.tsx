"use client";
import { NavBar, RoutesLoading } from "@/_components";
import useMediaQuery from "@/hooks/useMediaQuery";
import useAuthenticateUser from "@/hooks/useAuthenticateUser";
import { useUserStore } from "@/utils/stores";

import styles from "./layout.module.css";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socket = io("http://localhost:3000", {
    withCredentials: true,
  });
  const user = useUserStore((state) => state.user);
  const { isLoading } = useAuthenticateUser();
  const { isTablet } = useMediaQuery();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user || isLoading) {
    return <RoutesLoading />;
  }
  return (
    <main className={styles.main}>
      {!isTablet && <NavBar />}
      {children}
    </main>
  );
}

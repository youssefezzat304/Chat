"use client";
import { NavBar, RoutesLoading } from "@/_components";
import useMediaQuery from "@/hooks/useMediaQuery";
import useAuthenticateUser from "@/hooks/useAuthenticateUser";
import { useUserStore } from "@/utils/stores";

import styles from "./layout.module.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useUserStore((state) => state.user);
  const { isLoading } = useAuthenticateUser();
  const { isTablet } = useMediaQuery();

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

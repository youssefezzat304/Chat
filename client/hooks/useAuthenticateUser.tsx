"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../utils/stores";
import { checkUser } from "../api/axios";
import { useRouter } from "next/navigation";

const useAuthenticateUser = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setProfilePic = useUserStore((state) => state.setProfilePic);
  const [initialUser, setInitialUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setInitialUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        setInitialUser(null);
      }
    }
  }, []);

  const { data: currentUser, isLoading } = useQuery({
    queryFn: checkUser,
    queryKey: ["currentUser"],
    initialData: initialUser,
    enabled: !initialUser || Object.keys(initialUser).length === 0,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!currentUser) {
        router.replace("/register");
      }

      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
    }
  }, [currentUser, user, isLoading, setUser, router]);

  return { isLoading };
};

export default useAuthenticateUser;

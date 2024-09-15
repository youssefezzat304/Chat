"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../utils/stores";
import { getUserInfo } from "../api/axios";
import { useRouter } from "next/navigation";
import { User } from "@/types/user.types";

const useAuthenticateUser = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [initialUser, setInitialUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setInitialUser(parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        setInitialUser(null);
      }
    }
  }, [setUser]);

  const { data: currentUser, isLoading } = useQuery({
    queryFn: () => getUserInfo(),
    queryKey: ["currentUser"],
    enabled: !initialUser,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!currentUser) {
        router.push("/register");
      } else {
        setUser(currentUser);
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
    }
  }, [currentUser, isLoading, router, initialUser, setUser]);

  return { isLoading, initialUser };
};

export default useAuthenticateUser;

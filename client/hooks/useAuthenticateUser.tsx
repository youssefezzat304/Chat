"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../utils/stores";
import { checkUser } from "../api/axios";

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
        setInitialUser(JSON.parse(storedUser));
      } catch (error) {
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
    if (user === null && !isLoading) {
      router.replace("/register");
    }

    if (currentUser) {
      setUser(currentUser);
      // setProfilePic(currentUser.profilePic);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

  }, [currentUser, router, setUser, user, isLoading, setProfilePic]);

  return { isLoading };
};

export default useAuthenticateUser;

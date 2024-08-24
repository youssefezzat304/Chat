"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../utils/stores";
import { checkUser } from "../api/axios";

const useAuthenticateUser = () => {
  const router = useRouter();
  const { user, setUser, setProfilePic } = useUserStore();
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
    if (currentUser) {
      setUser(currentUser);
      setProfilePic(currentUser.profilePic);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }

    if (!user && !isLoading) {
      router.replace("/register");
    }
  }, [currentUser, router, setUser, user, isLoading, setProfilePic]);

  return { isLoading };
};

export default useAuthenticateUser;

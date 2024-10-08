import { useAuthStore, useUserStore } from "@/utils/stores";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axiosPrivate } from "@/api/axios";

const useLogOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useUserStore((state) => state.setUser);

  const handleLogOut = async () => {
    localStorage.clear();
    queryClient.removeQueries({ queryKey: ["currentUser"], exact: true });
    setAccessToken(null);
    setUser(null);
    try {
      await axiosPrivate.get("/users/logout", {
        withCredentials: true,
      });
      router.push("/register");
    } catch (error: any) {
      console.log(error);
    } finally {
      router.push("/register");
    }
  };

  return { handleLogOut };
};

export default useLogOut;

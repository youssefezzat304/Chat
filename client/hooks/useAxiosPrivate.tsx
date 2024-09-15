import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAxiosPrivate = () => {
  const router = useRouter();

  useEffect(() => {
    axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.clear();
          router.push("/register");
        }
        return Promise.reject(error);
      },
    );
  }, [router]);

  return axiosPrivate;
};

export default useAxiosPrivate;

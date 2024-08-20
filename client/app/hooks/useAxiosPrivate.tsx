import {
  axiosPrivate,
  cleanupInterceptors,
  setupInterceptors,
} from "../api/axios";
import { useEffect } from "react";
import { useAuthStore } from "../utils/stores/auth.store";

const useAxiosPrivate = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    let requestIntercept: number | null = null;
    let responseIntercept: number | null = null;
    if (accessToken) {
      try {
        const interceptors = setupInterceptors(accessToken);
        requestIntercept = interceptors.requestIntercept;
        responseIntercept = interceptors.responseIntercept;
      } catch (error) {
        console.log("Axios Private Error:", error);
      } finally {
        if (requestIntercept !== null && responseIntercept !== null) {
          cleanupInterceptors({ requestIntercept, responseIntercept });
        }
      }
    }
    // return cleanupInterceptors({ requestIntercept, responseIntercept });
  }, [accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;

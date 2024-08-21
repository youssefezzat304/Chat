import axios, { AxiosResponse } from "axios";
import { User } from "../utils/types/user.interfaces";

const orginURL = "http://localhost:3000/api";

export const api = axios.create({
  baseURL: orginURL,
});

export const axiosPrivate = axios.create({
  baseURL: orginURL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

export const checkUser = async (): Promise<User | null> => {
  let requestIntercept: number | null = null;
  let responseIntercept: number | null = null;

  try {
    const token: string | null = await refreshToken();
    if (!token) {
      return null;
    }

    const interceptors = setupInterceptors(token);
    requestIntercept = interceptors.requestIntercept;
    responseIntercept = interceptors.responseIntercept;

    const { data } = await axiosPrivate.get("/users/me", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error: any) {
    console.error("Failed to fetch user:", error.response?.data);
    return null;
  } finally {
    if (requestIntercept !== null && responseIntercept !== null) {
      cleanupInterceptors({ requestIntercept, responseIntercept });
    }
  }
};

export const updateInfo = async (
  data: any
): Promise<AxiosResponse<User> | null> => {
  try {
    const response = api.patch("/users/update-info", data, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const sendProfilePic = async (profilePic: any, requester: any) => {
  const formData = new FormData();
  formData.append("profilePic", profilePic);
  formData.append("requester", requester);
  try {
    const response = await api.post("/upload/profile-picture", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: unknown) {
    console.error(error);
  }
};
export const deleteProfilePic = async (userId: string | undefined) => {
  const data = {
    userId: userId,
  };
  try {
    const response = await api.patch("/upload/delete-profile-picture", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    console.error(error);
  }
};

export const refreshToken = async () => {
  try {
    const res = await api.post("/sessions/refresh", null, {
      withCredentials: true,
    });
    return res.data.accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setupInterceptors = (accessToken: string) => {
  const requestIntercept = axiosPrivate.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const responseIntercept = axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosPrivate(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  return { requestIntercept, responseIntercept };
};

export const cleanupInterceptors = (interceptors: {
  requestIntercept: number;
  responseIntercept: number;
}) => {
  axiosPrivate.interceptors.request.eject(interceptors.requestIntercept);
  axiosPrivate.interceptors.response.eject(interceptors.responseIntercept);
};

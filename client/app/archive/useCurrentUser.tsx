// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { CurrentUser } from "../utils/types/user.interfaces";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import useRefreshToken from "../hooks/useRefreshToken";
// import { useThemeContext } from "../contexts/ThemeContext";

// const useCurrentUser = () => {
//   const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
//   const { setSystemLoading } = useThemeContext();
//   const [loading, setLoading] = useState(true);
//   const refresh = useRefreshToken();
//   const router = useRouter();
//   const axiosPrivate = useAxiosPrivate();

//   const checkUser = async () => {
//     try {
//       const newAccessToken = await refresh();

//       const response = await axiosPrivate.get("/users/me", {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${newAccessToken}`,
//         },
//       });
//       setCurrentUser(response.data);
//       return response.data
//     } catch (error: any) {
//       console.log("error:", error.response?.data);
//       router.replace("/register");
//     } finally {
//       setSystemLoading(false);
//       setLoading(false);
//     }

//   };

//   useEffect(() => {
//     checkUser();
//   }, [router, axiosPrivate]);

//   return { currentUser, router, loading, checkUser };
// };

// export default useCurrentUser;

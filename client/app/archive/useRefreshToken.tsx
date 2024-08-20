// import { api } from "../api/axios";
// import { useAuthStore } from "../utils/stores/auth.store";
// const useRefreshToken = () => {
//   const setAccessToken = useAuthStore(state => state.setAccessToken)
//   const refresh = async () => {
//     try {
//       const response = await api.post("/sessions/refresh", null, {
//         withCredentials: true,
//       });

//       setAccessToken(response.data.accessToken);

//       return response.data.accessToken;
//     } catch (error: any) {
//       console.log(error);
//     }
//   };

//   return refresh;
// };

// export default useRefreshToken;

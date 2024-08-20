// "use client";
// import { createContext, useContext, useState } from "react";
// import { UserContextType } from "../utils/types/user.interfaces";
// import { useRouter } from "next/navigation";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   LoginSchema,
//   loginValidation,
//   SignupSchema,
//   signupValidation,
// } from "../utils/validation/user.validation";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import { api } from "../api/axios";
// import { useUserStore } from "../utils/stores/user.store";

// const UserContext = createContext<UserContextType>({} as UserContextType);

// export function UserContextWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const axiosPrivate = useAxiosPrivate();

//   //------------------------ Login ----------------------------------------------------//
//   const {
//     register: loginRegister,
//     handleSubmit: handleLoginSubmit,
//     setError: setLoginError,
//     formState: { errors: loginErrors },
//     clearErrors: clearLoginErros,
//   } = useForm<LoginSchema>({ resolver: zodResolver(loginValidation) });

//   const handleLogin: SubmitHandler<LoginSchema> = async (data) => {
//     const userData = {
//       email: data.email,
//       password: data.password,
//     };
//     try {
//       const response = await axiosPrivate.post("/users/login", userData, {
//         withCredentials: true,
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.data === "Invalid Email or password.") {
//         setLoginError("email", {
//           message: response.data,
//         });
//       } else {
//         setAccessToken(response.data.accessToken);
//         router.replace("/dashboard");
//       }
//     } catch (error: any) {
//       console.log("handleLogin in userContext.tsx >>>>>", error.response);
//     }
//   };

//   //------------------------ SignUp ----------------------------------------------------//
//   const {
//     register: signupRegister,
//     handleSubmit: handleSignupSubmit,
//     setError: setSignupError,
//     formState: { errors: signupErrors },
//     clearErrors: clearSignupErrors,
//   } = useForm<SignupSchema>({ resolver: zodResolver(signupValidation) });

//   const handleSignup: SubmitHandler<SignupSchema> = async (data) => {
//     if (data.password !== data.confirmPassword) {
//       setSignupError("password", {
//         message:
//           "The passwords do not match. Please ensure that the 'Password' and 'Confirm Password' fields are identical.",
//       });
//       return;
//     }

//     const userData = {
//       displayName: data.displayName,
//       email: data.email,
//       password: data.password,
//       confirmPassword: data.confirmPassword,
//     };

//     try {
//       const response = await api.post("/users/signup", userData, {
//         withCredentials: true,
//       });
//       router.replace("/dashboard");
//     } catch (error: any) {
//       if (error.response.data.title === "email used") {
//         setSignupError("email", {
//           message: error.response.data.message,
//         });
//       }
//       console.log("handleSignup in userContext.tsx >>>>>", error.response);
//     }
//   };
//   // ----------------------- Log Out ----------------------------------------------//
//   const userLogOut = useUserStore(state => state.userLogOut)
//   const handleLogOut = async () => {
//     setAccessToken(null);
//     userLogOut()

//     try {
//       const response = await axiosPrivate.get("/users/logout", {
//         withCredentials: true,
//       });
//       router.replace("/register");
//     } catch (error: any) {
//       console.log(error);
//     }
//   };
//   //-------------------------- Handle Errors -----------------------------------------//
//   const clearAllErrors = () => {
//     clearLoginErros();
//     clearSignupErrors();
//   };
//   // ============================================================================================ //
//   return (
//     <UserContext.Provider
//       value={{
//         loginRegister,
//         handleLogin,
//         handleLoginSubmit,
//         loginErrors,
//         setLoginError,
//         handleSignup,
//         signupRegister,
//         handleSignupSubmit,
//         setSignupError,
//         signupErrors,
//         handleLogOut,
//         clearAllErrors,
//         accessToken,
//         setAccessToken,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUserContext() {
//   return useContext(UserContext);
// }

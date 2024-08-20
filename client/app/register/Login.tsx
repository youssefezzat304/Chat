"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  LoginSchema,
  loginValidation,
} from "../utils/validation/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiMessageSquareError } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Icon } from "../components/rightSection/NotificationsHeader";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Login = ({ signUp }: any) => {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<LoginSchema>({ resolver: zodResolver(loginValidation) });
  const clearAllErrors = () => {
    clearErrors();
  };
  const handleLogin: SubmitHandler<LoginSchema> = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axiosPrivate.post("/users/login", userData, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      if (response.data === "Invalid Email or password.") {
        setError("email", {
          message: response.data,
        });
      } else {
        router.replace("/dashboard");
      }
    } catch (error: any) {
      console.log("handleLogin in userContext.tsx >>>>>", error.response);
    }
  };
  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
        <h1>
          Hello,<br></br> Welcome Back
        </h1>
        <label>
          <input
            className="input"
            type="email"
            title="Email"
            placeholder="Enter your E-mail."
            {...register("email")}
          />
        </label>
        <label>
          <input
            className="input"
            type="password"
            title="Password"
            placeholder="Enter your Password."
            {...register("password")}
          />
        </label>
        <input
          className="login-Btn"
          title="Log-In button"
          type="submit"
          name="login"
          value="Login"
        />
        <input
          className="signUp-Btn"
          title="Sign-up button"
          type="button"
          name="signUp"
          value="SignUp"
          onClick={signUp}
        />
        <div className="loginwith">
          <button title="Google" type="button">
            Google
          </button>
          <button title="Facebook" type="button">
            Facebook
          </button>
        </div>
      </form>
      {errors.email || errors.password ? (
        <div className="error-container">
          <BiMessageSquareError className="error-icon" />
          <strong className="">
            {errors.email?.message || errors.password?.message}
          </strong>
          <Icon
            title="Close"
            icon={<MdClose />}
            onClick={clearAllErrors}
            className="error-close"
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Login;

"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  SignupSchema,
  signupValidation,
} from "../utils/validation/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { api } from "../api/axios";
import { BiMessageSquareError } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { Icon } from "../components/rightSection/NotificationsHeader";

const SignUp = ({ logIn }: any) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<SignupSchema>({ resolver: zodResolver(signupValidation) });
  const clearAllErrors = () => {
    clearErrors();
  };
  const handleSignup: SubmitHandler<SignupSchema> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        message:
          "The passwords do not match. Please ensure that the 'Password' and 'Confirm Password' fields are identical.",
      });
      return;
    }

    const userData = {
      displayName: data.displayName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await api.post("/users/signup", userData, {
        withCredentials: true,
      });
      return router.replace("/dashboard");
    } catch (error: any) {
      if (error.response.data.title === "email used") {
        setError("email", {
          message: error.response.data.message,
        });
      }
      console.log("handleSignup in userContext.tsx >>>>>", error.response);
    }
  };
  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit(handleSignup)}>
        <h1>
          Hello,<br></br> Nice to meet you
        </h1>
        <input
          className="input"
          type="text"
          title="User name"
          placeholder="Display name."
          {...register("displayName")}
        />
        <input
          className="input"
          type="email"
          title="Email"
          placeholder="Enter your E-mail."
          {...register("email")}
        />
        <input
          className="input"
          type="password"
          title="Password"
          placeholder="Enter your Password."
          {...register("password")}
        />
        <input
          className="input"
          type="password"
          title="Password confirmation"
          placeholder="Confrim your password"
          {...register("confirmPassword")}
        />
        <input
          className="signUp-Btn"
          title="Confirm sign-up"
          type="submit"
          name="signUp"
          value="SignUp"
        />
        <input
          className="login-Btn"
          title="Go to login page"
          type="button"
          name="login"
          value="Login"
          onClick={logIn}
        />
      </form>
      {errors.email ||
      errors.password ||
      errors.confirmPassword ||
      errors.displayName ? (
        <div className="error-container">
          <BiMessageSquareError className="error-icon" />
          <strong className="">
            {errors.email?.message ||
              errors.password?.message ||
              errors.confirmPassword?.message ||
              errors.displayName?.message}
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

export default SignUp;

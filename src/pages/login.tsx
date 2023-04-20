import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "@hookform/error-message";
import { authApi } from "@/store/authApi";
type Props = {};

export type LoginDto = {
  email: string;
  password: string;
};

export const loginSchema = yup.object().shape({
  email: yup.string().email().label("Email").required(),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(6)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

export default function Login(props: Props) {
  const [
    loginApi,
    {
      isLoading: loginLoading,
      isError: loginError,
      isSuccess: loginSuccess,
      data: loginData,
      error,
    },
  ] = authApi.useLoginMutation();
  const [backendErrors, setBackendErrors] = React.useState<any>(null);
  const methods = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = methods;

  const onSubmit = async (data: LoginDto) => {
    await loginApi(data);
  };

  useEffect(() => {
    if (loginError) {
      toast.error("Login failed");
    }
  }, [loginError]);

  useEffect(() => {
    if (loginSuccess) {
      toast.success("Login success");
    }
  }, [loginSuccess]);

  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className="flex max-w-[1230px] justify-center w-full">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-[300px] w-full"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              <b> Email</b>
            </label>
            <input
              type="email"
              {...register("email")}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Email"
            />
            <span className="text-red-500">{errors.email?.message}</span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              <b> Password</b>
            </label>
            <input
              type="password"
              {...register("password")}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Password"
            />
            <span className="text-red-500">{errors.password?.message}</span>
          </div>
          <button
            type="submit"
            className="bg-[#032974] text-white px-[6px] py-[12px] rounded-md"
          >
            Login {loginLoading && <span className="animate-spin">...</span>}
          </button>

          {/* Don't have account */}
          <div className="flex justify-between">
            <Link href="/register" className="text-[#032974]">
              Don&apos;t have account
            </Link>
            {/* <Link href="/reset-password" className="text-[#032974]">
              Reset Password
            </Link> */}
          </div>

          <div>
            {backendErrors &&
              backendErrors.errors.map((error: any) => {
                return (
                  <p key={error.message} className="text-red-500">
                    {error.message}
                  </p>
                );
              })}
          </div>
        </form>
      </div>
    </div>
  );
}

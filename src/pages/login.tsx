import Link from "next/link";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { authApi } from "@/store/authApi";
import router from "next/router";
import { teamApi } from "@/store/teamApi";
import ErrorMapper from "@/components/ErrorMapper";
type Props = {};

export type LoginDto = {
  email: string;
  password: string;
};

export const loginSchema = yup.object().shape({
  email: yup.string().email().label("Email").required(),
  password: yup.string().label("Password").required(),
});

export default function Login(props: Props) {
  const [
    loginApi,
    {
      isLoading: loginLoading,
      isError: isLoginError,
      isSuccess: loginSuccess,
      data: loginData,
      error: loginError,
    },
  ] = authApi.useLoginMutation();
  const [
    meApi,
    {
      isLoading: meLoading,
      isError: isMeError,
      isSuccess: meSuccess,
      data: meData,
      error: meError,
    },
  ] = authApi.useLazyMeQuery();
  const [
    resendEmailApi,
    {
      isLoading: isResendEmailLoading,
      isError: isResendEmailError,
      isSuccess: isResendEmailSuccess,
      data: resendEmailData,
      error: resendEmailError,
    },
  ] = authApi.useResendEmailMutation();
  const [
    playersUserInfoApi,
    {
      isLoading: playersUserInfoLoading,
      isError: isPlayersUserInfoError,
      isSuccess: playersUserInfoSuccess,
      data: playersUserInfoData,
      error: playersUserInfoError,
    },
  ] = teamApi.useLazyPlayersUserInfoQuery();

  const [backendErrors, setBackendErrors] = React.useState<any>(null);
  const methods = useForm<LoginDto>({
    resolver: yupResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = methods;

  const onSubmit = async (data: LoginDto) => {
    try {
      await loginApi(data)
        .unwrap()
        .then(async (res) => {
          toast.success("Login success");
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("token", res.accessToken);
          const decodedJwt = JSON.parse(atob(res.accessToken.split(".")[1]));
          localStorage.setItem("userData", JSON.stringify(decodedJwt));
          const userId =
            decodedJwt[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
          localStorage.setItem("userId", userId);
          await meApi({});

          if (
            decodedJwt[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ].includes("Admin")
          ) {
            router.push("/admin-dashboard");
            return;
          }
          if (
            decodedJwt[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ].includes("Captain")
          ) {
            router.push("/team-register-process");
            return;
          }
          try {
            const resp: any = await playersUserInfoApi({
              userId: userId,
            });
            if (
              resp?.isCaptain &&
              decodedJwt[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
              ].includes("Athlete")
            ) {
              router.push("/team-register-process");
              return;
            }
            if (
              resp.status !== "rejected" &&
              decodedJwt[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
              ].includes("Athlete")
            ) {
              router.push("/user-register-process");
              return;
            }
            // console.log(resp.status);
            if (resp.status === "rejected") {
              router.push("/team-register-process");
              return;
            }
          } catch (error) {
            router.push("/team-register-process");
            return;
          }
        });
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const resendEmail = async () => {
    try {
      console.log("hello");
      await resendEmailApi({
        email: getValues("email"),
      });
      toast.success("Email sent please check your email");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className="flex max-w-[1230px] justify-center w-full">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-[400px] w-full"
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
              I don&apos;t have an account
            </Link>
            <Link href="/forgetpassword" className="text-[#032974]">
              Forgot Password ?
            </Link>
          </div>

          <ErrorMapper error={loginError} />
          {((loginError as any)?.data as any)?.message ===
            "Email is not confirmed." && (
            <div className="flex flex-col flex-wrap gap-3 text-blue-800 mt-2">
              <span>If you still didn&apos;t receive the email</span>
              <button
                type="button"
                className="bg-blue-500 text-white px-2 py-1 rounded-md w-max"
                onClick={resendEmail}
              >
                Resend Email
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

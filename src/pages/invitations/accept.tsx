import { RegisterDto, authApi } from "@/store/authApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { convertToBase64 } from "@/utils/fileToBase64";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import error from "next/error";
import { AccpetInviteDto, playerApi } from "@/store/playerApi";
type Props = {};

export default function AcceptInvitation(props: Props) {
  const router = useRouter();
  const params = router.query;

  const [
    acceptInviteApi,
    {
      data: acceptInviteData,
      isLoading: acceptInviteLoading,
      isError: isAcceptInviteError,
      isSuccess: isAcceptInviteSuccess,
      error: acceptInviteError,
    },
  ] = playerApi.useAcceptInviteMutation();

  const methods = useForm<RegisterDto>({});

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = methods;

  const onSubmit = async (data: AccpetInviteDto) => {
    await acceptInviteApi({
      params: {
        token: params.Token as string,
        email: params.Email as string,
      },
      postData: {
        userName: data.username,
        fatherName: data.fathername,
        password: data.password,
        gender: data.gender,
        // convert to utc
        dateOfBirth: new Date(data.birthdate).toISOString(),
        userDetails: {
          learnedAboutPlatform: "",
        },
      },
    })
      .unwrap()
      .then(async (res: any) => {
        toast.success(
          "You have successfully accepted the invitation. Please login to continue"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const errorData = useMemo(() => {
    if (isAcceptInviteError) {
      return acceptInviteError as any;
    }
    return null;
  }, [isAcceptInviteError, acceptInviteError]);

  useEffect(() => {
    const params = router.query;
    if (router.isReady) {
      if (params && params.Token && params.Email) {
      } else {
        router.push("/");
      }
    }
  }, [router]);

  useEffect(() => {
    console.log(acceptInviteError);
  }, [isAcceptInviteError]);

  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className="flex flex-wrap max-w-[1140px] justify-center w-full px-[15px] pt-4">
        <h1 className="w-full text-[44px] pb-10">Accept team Invite</h1>
        <p className="w-full text-[18px] pb-2 text-[#040562]">
          Dear Applicant, we are truly happy to see you registering for Goalplus
          Summer Festival 2023! The registration should be carried out by the
          captain of your team. Once the captain registers the team and adds
          details of all team members, each team member will receive a separate
          invitation link to the email indicated by the captain in this
          registration form.
        </p>
        <p className="w-full text-[18px] pb-10 text-[#040562]">
          Please note that all payments are final (non-refundable). A team is
          responsible for attentively reading all the rules and regulations for
          the league it is signing up for. Goalplus is not responsible for any
          compensation in case a team accepts terms and conditions but does not
          comply with eligibility requirements. Because of that, we strongly
          encourage you to conscientiously go over all clauses of the rules
          before submitting your application
        </p>
        {/* <p className="w-full text-[18px] pb-10">
          The team participation fee will be divided equally among all team
          members. Please see the early bird and regular registration prices
          here
          <a href=""></a>
        </p> */}
        <p className="w-full text-[18px] pb-10 text-[#040562]">
          The Goalplus team wishes you the best of luck with your registration
          process and we are looking forward to seeing you as much as possible
          this summer!
        </p>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap gap-[30px]  w-full"
        >
          {/* Username */}
          <div className="flex flex-col gap-2 max-w-[350px] w-full">
            <label htmlFor="username">
              <b> Username</b>
            </label>
            <input
              type="name"
              {...register("username", {
                required: "Username is required",
              })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Username"
            />
            <span className="text-red-500">{errors.username?.message}</span>
          </div>
          {/* Fathername */}
          <div className="flex flex-col gap-2 max-w-[350px] w-full">
            <label htmlFor="fathername">
              <b> Middle Name</b>
            </label>
            <input
              type="fathername"
              {...register("fathername", {})}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Middle Name"
            />
            <span className="text-red-500">{errors.fathername?.message}</span>
          </div>
          {/* Password */}
          <div className="flex flex-col gap-2 max-w-[350px] w-full">
            <label htmlFor="password">
              <b> Password</b>
            </label>
            <input
              minLength={13}
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Password"
            />
            <span className="text-red-500">{errors.password?.message}</span>
          </div>
          {/* Gender */}
          <div className="flex flex-col gap-2 max-w-[350px] w-full">
            <label htmlFor="gender">
              <b> Gender</b>
            </label>
            <select
              {...register("gender", {
                required: "Gender is required",
              })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Gender"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <span className="text-red-500">{errors.gender?.message}</span>
          </div>
          {/* Date of Birth */}
          <div className="flex flex-col gap-2 max-w-[350px] w-full">
            <label htmlFor="birthdate">
              <b>Birthday</b>
            </label>
            <input
              // add minimum date
              min={
                (watch("leagueType") === "U16" && "2007-08-15") ||
                (watch("leagueType") === "U18" && "2005-08-15") ||
                (watch("leagueType") === "U21" && "2002-08-15") ||
                ""
              }
              type="date"
              {...register("birthdate", {
                required: "Birthdate is required",
              })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
            />
            <span className="text-red-500">{errors.birthdate?.message}</span>
          </div>

          {/* Terms and conditions */}
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="termsAndConditions"
              className="termsAndConditions flex gap-2"
            >
              <span>Terms and conditions</span>
              <input
                type="checkbox"
                {...register("termsAndConditions", {
                  required: "You must agree to the terms and conditions",
                })}
              />
            </label>
            <div className="w-full flex flex-col">
              <span className="text-blue-500">
                <a
                  href="https://drive.google.com/file/d/1XO5je_Qvxq1EUkFdsqNzPBTKX3VgvDzp/view"
                  className="text-blue-500  underline"
                >
                  Soccer U21 terms and conditions
                </a>
              </span>
              <span className="text-blue-500 ">
                <a
                  href="https://drive.google.com/file/d/1sC3Mo8OK9k4czZchRA2P_0nNVzMk2k-U/view"
                  className="text-blue-500 underline"
                >
                  Soccer U16 terms and conditions
                </a>
              </span>
              <span className="text-blue-500 ">
                <a
                  href="https://drive.google.com/file/d/1wHnMVgyjid2hQv51aKBO7OceuflfD2zp/view"
                  className="text-blue-500 underline"
                >
                  Soccer U18 terms and conditions
                </a>
              </span>

              <span className="text-blue-500 ">
                <a
                  href="https://drive.google.com/file/d/17z6QTA-9zUsW94MuWMiavqU8yo76Gl1C/view"
                  className="text-blue-500 underline"
                >
                  Volleyball U21
                </a>
              </span>

              <span className="text-blue-500 ">
                <a
                  href="https://drive.google.com/file/d/1zq7j-8ScgioT4M0n_K4Tk91NPbxFyrM1/view"
                  className="text-blue-500 underline"
                >
                  Recreational Beach Volleyball
                </a>
              </span>

              <span className="text-blue-500 ">
                <a
                  href="https://drive.google.com/file/d/1JvC5e414mMQsoFIx9fPqhAJ7CT7ccE2V/view"
                  className="text-blue-500 underline"
                >
                  Recreational Basketball
                </a>
              </span>

              <span className="text-blue-500 ">
                <a
                  href="https://drive.google.com/file/d/1djNZDkgSted62J3KP2NpTgCV30-VUHZD/view"
                  className="text-blue-500 underline"
                >
                  Basketball U21
                </a>
              </span>
            </div>
            <span className="text-red-500">
              {errors.termsAndConditions?.message}
            </span>
          </div>

          {/* Submit */}
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="h-[50px] bg-[#032974] text-white px-[6px] py-[12px] rounded-md max-w-[300px] w-full"
            >
              Submit{" "}
              {acceptInviteLoading && <span className="animate-spin">...</span>}
            </button>
          </div>

          {isAcceptInviteSuccess && (
            <div>
              <div className="text-green-500">
                You have successfully accepted the invite
              </div>
              <Link href="/login">go to login process</Link>
            </div>
          )}

          {/* backend errors map */}
          {acceptInviteError &&
            ("status" in acceptInviteError ? (
              <div>
                <div>
                  {errorData?.data &&
                    Object.keys(errorData.data).map((key) => {
                      return (
                        <p key={key} className="text-red-500">
                          {errorData.data[key]}
                        </p>
                      );
                    })}
                </div>
              </div>
            ) : null)}
        </form>
      </div>
    </div>
  );
}

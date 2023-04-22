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
type Props = {};

const TeamMember = ({
  getData,
  maxCount,
}: {
  getData: (data: any) => void;
  maxCount: number;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    teamMembers: {
      name: string;
      surname: string;
      email: string;
      contactNumber: string;
    };
  }>();

  const submitHandle = (data: any) => {
    console.log(data);
    getData(data.teamMembers);
  };

  return (
    <div className="flex flex-wrap gap-[30px]  w-full">
      <div className="flex flex-col gap-2 max-w-[350px] w-full">
        <label htmlFor={`teamMembers.name`}>
          <b>Player name</b>
        </label>
        <input
          {...register(`teamMembers.name`, {
            required: `Player  name is required`,
          })}
          className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
        />
        <span className="text-red-500">
          {errors?.teamMembers && errors?.teamMembers?.name?.message}
        </span>
      </div>

      <div className="flex flex-col gap-2 max-w-[350px] w-full">
        <label htmlFor={`teamMembers.surname`}>
          <b>Player surname</b>
        </label>
        <input
          {...register(`teamMembers.surname`, {
            required: `Player  surname is required`,
          })}
          className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
        />
        <span className="text-red-500">
          {errors?.teamMembers && errors?.teamMembers?.surname?.message}
        </span>
      </div>

      <div className="flex flex-col gap-2 max-w-[350px] w-full">
        <label htmlFor={`teamMembers.email`}>
          <b>Player email</b>
        </label>
        <input
          {...register(`teamMembers.email`, {
            required: `Player email is required`,
          })}
          className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
        />
        <span className="text-red-500">
          {errors?.teamMembers && errors?.teamMembers.email?.message}
        </span>
      </div>

      <div className="flex flex-col gap-2 max-w-[350px] w-full">
        <label htmlFor={`teamMembers.contactNumber`}>
          <b>Player contact number</b>
        </label>
        <input
          {...register(`teamMembers.contactNumber`, {
            required: `Player contact number is required`,
          })}
          className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
        />
        <span className="text-red-500">
          {errors?.teamMembers && errors?.teamMembers.contactNumber?.message}
        </span>
      </div>

      <div className="w-full">
        <button
          type="button"
          className="border border-gray-300 rounded-md px-[2px] py-[2px] text-xs"
          onClick={handleSubmit(submitHandle)}
        >
          Add Player
        </button>
      </div>
    </div>
  );
};

export const registerSchema = yup.object().shape({
  // name: yup.string().label("Name").required(),
  // surname: yup.string().label("Surname").required(),
  // fathername: yup.string().label("Fathername").required(),
  // email: yup.string().email().label("Email").required(),
  // gender: yup.string().label("Gender").required(),
  // birthday: yup.string().label("Birthday").required(),
  // howLearnAboutUs: yup.string().label("HowLearnAboutUs").required(),
  // shirtSize: yup.string().label("ShirtSize").required(),
  // photo: yup.string().label("Photo").required(),
  // schoolLogo: yup.string().label("SchoolLogo").required(),
  // teamLogo: yup.string().label("TeamLogo").required(),
  // jerseySize: yup.string().label("JerseySize").required(),
  // jerseyNumber: yup.string().label("JerseyNumber").required(),
  // approvesTermsAndConditions: yup
  //   .string()
  //   .label("ApprovesTermsAndConditions")
  //   .required(),
  // areYourUniPayment: yup.string().label("AreYourUniPayment").required(),
  // comments: yup.string().label("Comments").required(),
});

const leagues: {
  [key: string]: {
    id: number;
    name: string;
  }[];
} = {
  soccer6v6: [
    { id: 1, name: "U16" },
    { id: 2, name: "U18" },
    { id: 3, name: "U21" },
    { id: 4, name: "GIRLS" },
  ],
  basketball3x3: [
    { id: 8, name: "RECREATIONAL" },
    { id: 7, name: "U21" },
  ],
  beachVolleyball4v4: [
    { id: 5, name: "RECREATIONAL" },
    { id: 6, name: "U21" },
  ],
};

export default function Register(props: Props) {
  const router = useRouter();
  const params = router.query;
  const { sport: sportParam, league: leagueParam } = params;

  const [
    authenticationApi,
    {
      isLoading: isAuthenticationLoading,
      isError: isAuthenticationError,
      isSuccess: isAuthenticationSuccess,
      data: authenticationData,
      error: authenticationError,
    },
  ] = authApi.useAuthenticationMutation();

  const methods = useForm<RegisterDto>({
    // resolver: yupResolver(registerSchema),
    defaultValues: {
      sportType: sportParam ? `${sportParam}` : "",
    },
  });
  const [teamMembers, setTeamMembers] = React.useState<
    {
      id: string;
      name: string;
      surname: string;
      email: string;
      contactNumber: string;
    }[]
  >([]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = methods;

  const onSubmit = async (data: RegisterDto) => {
    await authenticationApi({
      userName: data.username,
      firstName: data.name,
      lastName: data.surname,
      fatherName: data.fathername,
      password: data.password,
      email: data.email,
      gender: data.gender,
      // convert to utc
      dateOfBirth: new Date(data.birthdate).toISOString(),
      role: "Athlete",
      userDetails: {
        learnedAboutPlatform: data.learnAboutUs,
      },
    })
      .unwrap()
      .then(async (res: any) => {
        console.log(res);
        toast.success("Register success");
        if (res.accessToken) {
          console.log("hello");
          const token = res.accessToken;
          console.log("token", token);
          const middlePartOfToken = token.split(".")[1];
          console.log("middlePartOfToken", middlePartOfToken);
          const base64ToString = atob(middlePartOfToken);
          console.log("base64ToString", base64ToString);
          const tokenData = JSON.parse(base64ToString);
          // set token to local storage
          localStorage.setItem("token", token);
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          localStorage.setItem("tokenData", JSON.stringify(tokenData));
          const userId =
            tokenData[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
          localStorage.setItem("userId", userId);
          console.log("leagueId", data.leagueType);
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return null;
  };

  const errorData = useMemo(() => {
    if (isAuthenticationError) {
      return authenticationError as any;
    }
    return null;
  }, [isAuthenticationError, authenticationError]);

  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className="flex flex-wrap max-w-[1140px] justify-center w-full px-[15px] pt-4">
        <h1 className="w-full text-[44px] pb-10">Registration</h1>
        <p className="w-full text-[18px] pb-2 text-[#040562]">
          Dear Captain, we are truly happy to see you registering for Goalplus
          Summer Festival 2023! The registration should be carried out by the
          captain of your team. Once the captain registers the team and adds
          details of all team members, each team member will receive a separate
          invitation link to the email indicated by the captain in this
          registration form.
        </p>
        <p className="w-full text-[18px] pb-10 text-[#040562]">
          Any team’s registration will be considered as *complete* once
          ***all*** team members sign up through the link sent to their email
          and pay their participation fee. After that, your team will be sent
          for approval of Goalplus. - Please note that all payments are final
          (non-refundable). A team is responsible for attentively reading all
          the rules and regulations for the league it is signing up for.
          <br />
          Goalplus is not responsible for any compensation in case a team
          accepts terms and conditions but does not comply with eligibility
          requirements. Because of that, we strongly encourage you to
          conscientiously go over all clauses of the rules before submitting
          your payments, please reach out out to us in case of any questions.
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
          {/* Name */}
          <div className="flex flex-col gap-2 max-w-[350px] w-full">
            <label htmlFor="name">
              <b> Name</b>
            </label>
            <input
              type="name"
              {...register("name", {
                required: "Name is required",
              })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Name"
            />
            <span className="text-red-500">{errors.name?.message}</span>
          </div>
          {/* Surname */}
          <div className="flex flex-col gap-2 max-w-[350px] w-full">
            <label htmlFor="surname">
              <b> Surname</b>
            </label>
            <input
              type="surname"
              {...register("surname", {
                required: "Surname is required",
              })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Surname"
            />
            <span className="text-red-500">{errors.surname?.message}</span>
          </div>
          {/* Fathername */}
          <div className="flex flex-col gap-2 max-w-[350px] w-full">
            <label htmlFor="fathername">
              <b> Middle Name</b>
            </label>
            <input
              type="fathername"
              {...register("fathername")}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Middle Name"
            />
            <span className="text-red-500">{errors.fathername?.message}</span>
          </div>
          {/* Email */}
          <div className="flex flex-col gap-2 max-w-[350px] w-full">
            <label htmlFor="email">
              <b> Email</b>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Email"
            />
            <span className="text-red-500">{errors.email?.message}</span>
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
                href="https://drive.google.com/file/d/1wHnMVgyjid2hQv51aKBO7OceuflfD2zp/view"
                className="text-blue-500 underline"
              >
                Soccer U16 terms and conditions
              </a>
            </span>
            <span className="text-blue-500 ">
              <a
                href="https://drive.google.com/file/d/1sC3Mo8OK9k4czZchRA2P_0nNVzMk2k-U/view"
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
              {isAuthenticationLoading && (
                <span className="animate-spin">...</span>
              )}
            </button>
          </div>

          {isAuthenticationSuccess && (
            <div>
              <div className="text-green-500">
                Your account has been created successfully
              </div>
              <div className="text-green-500">
                Please check your email to verify your account
              </div>
            </div>
          )}
          {/* backend errors map */}
          {authenticationError &&
            ("status" in authenticationError ? (
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

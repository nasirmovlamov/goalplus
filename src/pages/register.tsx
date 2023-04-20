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
  const schoolCertificateInputRef = React.useRef<HTMLInputElement>(null);
  const [
    registerApi,
    {
      isLoading: registerLoading,
      isError: registerError,
      isSuccess: registerSuccess,
      data: registerData,
      error,
    },
  ] = authApi.useRegisterMutation();
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
  const [
    playersApi,
    {
      isLoading: isPlayersLoading,
      isError: isPlayersError,
      isSuccess: isPlayersSuccess,
      data: playersData,
      error: playersError,
    },
  ] = authApi.usePlayersMutation();
  const [
    idCardApi,
    {
      isLoading: isIdCardLoading,
      isError: isIdCardError,
      isSuccess: isIdCardSuccess,
      data: idCardData,
      error: idCardError,
    },
  ] = authApi.useIdCardMutation();
  const [
    userProfileImageApi,
    {
      isLoading: isUserProfileImageLoading,
      isError: isUserProfileImageError,
      isSuccess: isUserProfileImageSuccess,
      data: profileImageData,
      error: profileImageError,
    },
  ] = authApi.useUserProfileImageMutation();
  const [
    teamLogoApi,
    {
      isLoading: isUserTeamLogoLoading,
      isError: isUserTeamLogoError,
      isSuccess: isUserTeamLogoSuccess,
      data: teamLogoData,
      error: teamLogoError,
    },
  ] = authApi.useTeamLogoMutation();

  const [
    schoolDiplomaApi,
    {
      isLoading: isSchoolDiplomaLogoLoading,
      isError: isSchoolDiplomaLogoError,
      isSuccess: isSchoolDiplomaLogoSuccess,
      data: schoolDiplomaLogoData,
      error: schoolDiplomaLogoError,
    },
  ] = authApi.useSchoolCertificateMutation();

  const [
    teamInfoApi,
    {
      isLoading: isTeamInfoLoading,
      isError: isTeamInfoError,
      isSuccess: isTeamInfoSuccess,
      data: teamInfoData,
      error: teamInfoError,
    },
  ] = authApi.useTeamInfoMutation();

  const [
    invitationApi,
    {
      isLoading: isInvitationLoading,
      isError: isInvitationError,
      isSuccess: isInvitationSuccess,
      data: InvitationData,
      error: InvitationError,
    },
  ] = authApi.useInvitationsMutation();

  const methods = useForm<RegisterDto>({
    // resolver: yupResolver(registerSchema),
    defaultValues: {
      sportType: sportParam ? `${sportParam}` : "",
    },
  });
  const [backendErrors, setBackendErrors] = React.useState<any>(null);
  const [teamMembers, setTeamMembers] = React.useState<
    {
      id: string;
      name: string;
      surname: string;
      email: string;
      contactNumber: string;
    }[]
  >([]);

  const addTeamMember = (teamMember: {
    id: string;
    name: string;
    surname: string;
    email: string;
    contactNumber: string;
  }) => {
    if (watch("sportType") === "") {
      toast.error("Please select sport type");
      return;
    }

    if (watch("sportType") === "soccer6v6") {
      if (teamMembers.length === 11) {
        toast.error("You can add maximum 11 players");
        return;
      }
    }
    if (watch("sportType") === "basketball3x3") {
      if (teamMembers.length === 4) {
        toast.error("You can add maximum 4 players");
        return;
      }
    }
    if (watch("sportType") === "beachVolleyball4v4") {
      if (teamMembers.length === 5) {
        toast.error("You can add maximum 5 players");
        return;
      }
    }
    setTeamMembers((prev) => [
      ...prev,
      {
        id: new Date().getTime().toString(),
        name: teamMember.name,
        surname: teamMember.surname,
        email: teamMember.email,
        contactNumber: teamMember.contactNumber,
      },
    ]);
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((item) => item.id !== id));
  };

  const teamMembersShow = useMemo(() => {
    return teamMembers.map((item, index) => (
      // show all team members
      <div key={item.id} className="flex flex-wrap gap-[5px]  w-full">
        <div className="w-full flex justify-end">
          <button
            className="border border-gray-300 rounded-md px-[2px] py-[2px] text-xs text-red-500"
            onClick={() => deleteTeamMember(item.id)}
          >
            x
          </button>
        </div>
        <div className="flex flex-col gap-2 w-full">Player {index + 1}</div>
        <div className="flex flex-col gap-2 w-full">
          Player name : {item.name}
        </div>

        <div className="flex flex-col gap-2 w-full">
          Player surname : {item.surname}
        </div>

        <div className="flex flex-col gap-2 w-full">
          Player email : {item.email}
        </div>

        <div className="flex flex-col gap-2 w-full">
          Player contact number : {item.contactNumber}
        </div>
      </div>
    ));
  }, [teamMembers]);

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = methods;

  const onSubmit = async (data: RegisterDto) => {
    if (watch("sportType") === "soccer6v6") {
      if (teamMembers.length < 5) {
        toast.error("Please add minimum 5 players for soccer");
        return;
      }
    }
    if (watch("sportType") === "basketball3x3") {
      if (teamMembers.length < 2) {
        toast.error("Please add minimum 2 players for basketball");
        return;
      }
    }
    if (watch("sportType") === "beachVolleyball4v4") {
      if (teamMembers.length < 3) {
        toast.error("Please add minimum 3 players for beach volleyball");
        return;
      }
    }

    const idRemovedFromTeamMembers = teamMembers.map((item) => {
      return {
        name: item.name,
        surname: item.surname,
        email: item.email,
        contactNumber: item.contactNumber,
      };
    });

    data.teamMembers = idRemovedFromTeamMembers;
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
          localStorage.setItem("tokenData", JSON.stringify(tokenData));
          const userId =
            tokenData[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ];
          localStorage.setItem("userId", JSON.stringify(userId));
          console.log("leagueId", data.leagueType);
          router.push("/user-dashboard");
          return null;
        }
      })
      .catch((err) => {
        console.log(err);
        toast.success("Register success");
        router.push("/user-dashboard");
      });

    return null;
  };

  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className="flex flex-wrap max-w-[1140px] justify-center w-full px-[15px] pt-4">
        <h1 className="w-full text-[44px] pb-10">Registration</h1>
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
              {...register("fathername", {
                required: "Middle name is required",
              })}
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
              <span>
                <a
                  href={"https://www.termsandconditionsgenerator.com/"}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  Terms and conditions
                </a>
              </span>
              <input
                type="checkbox"
                {...register("termsAndConditions", {
                  required: "You must agree to the terms and conditions",
                })}
              />
            </label>
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
              {registerLoading && <span className="animate-spin">...</span>}
            </button>
          </div>
          {/* backend errors map */}
          {/* {authenticationError &&
            Object.keys(JSON.parse(authenticationError.data)).map((key) => {
              return (
                <p key={key} className="text-red-500">
                  {authenticationError.data[key]}
                </p>
              );
            })} */}
          {/* <div>
            {backendErrors &&
              backendErrors.errors.data((error: any) => {
                return (
                  <p key={error.message} className="text-red-500">
                    {error.message}
                  </p>
                );
              })}
          </div> */}
        </form>
      </div>
    </div>
  );
}

import { RegisterDto, authApi } from "@/store/authApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { convertToBase64 } from "@/utils/fileToBase64";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPerson,
  faTShirt,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { AddTeamMember } from "@/components/AddTeamMember";
type Props = {};

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
  const [step, setStep] = useState<any>(2);
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
    const formData: any = {
      leagueId: data.leagueType,
      userId: localStorage.getItem("userId")!,
      postData: {
        slogan: data.teamSlogan,
        paymentType: data.isPaying,
        teamDetails: {
          additionalComments: data.comment,
        },
      },
    };
    if (
      data.schoolOfficial?.name && // if school official is not empty
      data.schoolOfficial?.surname &&
      data.schoolOfficial?.email &&
      data.schoolOfficial?.contactNumber
    ) {
      formData.postData.teamDetails.schoolOfficial = {
        firstName: data.schoolOfficial.name,
        lastName: data.schoolOfficial.surname,
        email: data.schoolOfficial.email,
        number: data.schoolOfficial.contactNumber,
      };
    }

    handleTeamInfo(formData);
    return null;
  };

  const teamMembersSubmit = async (data: RegisterDto) => {
    return null;
  };
  // const handleJersey = async (data: any) => {
  //   await
  // };

  const handleTeamInfo = async ({
    leagueId,
    userId,
    postData,
  }: {
    leagueId: string;
    userId: string;
    postData: {
      slogan: string;
      paymentType: string;
      teamDetails: {
        schoolOfficial?: {
          firstName: string;
          lastName: string;
          email: string;
          number: string;
        };
        additionalComments: string;
      };
    };
  }) => {
    console.log("HELLO");
    try {
      const resp = await teamInfoApi({
        leagueId: leagueId,
        userId: userId,
        body: postData,
      }).unwrap();
      toast.success("Team info updated");
    } catch (error) {
      toast.error("Team info update failed");
    }
  };

  const handleIdCardApi = async ({
    userId,
    file,
  }: {
    userId: string;
    file: any;
  }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const resp = await idCardApi({
        userId: userId,
        body: formData,
      });
      toast.success("Register id card");
      return resp;
    } catch (error) {
      toast.error("Register failed id card");
    }
  };

  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className="flex flex-wrap max-w-[1140px] justify-center w-full px-[15px] pt-4">
        <h1 className="w-full flex text-[44px] pb-10">
          User Registration Process
        </h1>
        <div className="flex  flex-wrap lg:flex-nowrap gap-5">
          <div className="flex lg:flex-col w-full lg:gap-0 gap-2 lg:w-[190px] ">
            <div className="flex gap-1 items-center">
              <button
                onClick={() => {
                  // setStep(1);
                }}
                className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#042974]"
              >
                <FontAwesomeIcon icon={faCheck} className="text-white" />
              </button>
              <p className="text-xs">Profile Info</p>
            </div>
            {/* line */}
            <div className="w-[35px] h-[2px] lg:gap-0  lg:w-[2px] lg:h-[35px] bg-[#042974] mt-4 lg:mt-0 lg:ml-4"></div>

            <div className="flex gap-1 items-center">
              <button
                onClick={() => {
                  setStep(2);
                }}
                className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#042974]"
              >
                <FontAwesomeIcon icon={faTShirt} className="text-white" />
              </button>
              <p className="text-xs">Team Info</p>
            </div>

            <div className="w-[35px] h-[2px] lg:gap-0  lg:w-[2px] lg:h-[35px] bg-[#042974] mt-4 lg:mt-0 lg:ml-4"></div>

            <div className="flex gap-1 items-center">
              <button
                onClick={() => {
                  setStep(3);
                }}
                className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#042974]"
              >
                <FontAwesomeIcon icon={faUserPlus} className="text-white" />
              </button>
              <p className="text-xs">Team members</p>
            </div>

            <div className="w-[35px] h-[2px] lg:gap-0  lg:w-[2px] lg:h-[35px] bg-[#042974] mt-4 lg:mt-0 lg:ml-4"></div>

            <div className="flex gap-1 items-center">
              <button
                onClick={() => {
                  setStep(3);
                }}
                className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#a0a0a0]"
              >
                <FontAwesomeIcon icon={faCheck} className="text-white" />
              </button>
              <p className="text-xs">Confirmation</p>
            </div>
          </div>
          <div className="flex flex-col">
            {step === 2 && (
              <form
                action=""
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-wrap gap-[30px] max-w-[1100px] w-full"
              >
                {/* Select sport type */}
                <div className="flex flex-col gap-2 max-w-[449px] w-full">
                  <label htmlFor="sportType">
                    <b> Sport type</b>
                  </label>
                  <select
                    {...register("sportType", {
                      required: "Sport type is required",
                      onChange: (e) => {
                        setValue("leagueType", "");
                        setTeamMembers([]);
                        setValue("teamMembers", []);
                        setValue("gender", "");
                      },
                    })}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                    placeholder="Sport type"
                  >
                    <option value="">Select sport type</option>
                    <option value="soccer6v6">Soccer 6vs6</option>
                    <option value="basketball3x3">Basketball 3x3</option>
                    <option value="beachVolleyball4v4">
                      Beach volleyball 4v4
                    </option>
                  </select>
                  <span className="text-red-500">
                    {errors.sportType?.message}
                  </span>
                </div>

                {/* Select leagues type */}
                <div className="flex flex-col gap-2 max-w-[449px] w-full">
                  <label htmlFor="leagueType">
                    <b> Leagues type</b>
                  </label>
                  <select
                    {...register("leagueType", {
                      required: "League type is required",
                      onChange: (e) => {
                        setValue("teamMembers", []);
                        setValue("gender", "");
                        setTeamMembers([]);
                      },
                    })}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                    placeholder="League type"
                  >
                    <option value="">Select league type</option>
                    {watch("sportType") &&
                      leagues[watch("sportType")].map(
                        (league: { id: number; name: string }) => (
                          <option key={league.id} value={league.id}>
                            {league.name}
                          </option>
                        )
                      )}
                  </select>
                  <span className="text-red-500">
                    {errors.leagueType?.message}
                  </span>
                </div>

                {/* Jersey number */}
                <div className="flex flex-col gap-2 max-w-[449px] w-full">
                  <label htmlFor="jerseyNumber">
                    <b> Jersey number</b>
                  </label>
                  <input
                    type="text"
                    {...register("jerseyNumber")}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                    placeholder="Jersey number"
                    maxLength={2}
                  />
                  <span className="text-red-500">
                    {errors.jerseyNumber?.message}
                  </span>
                </div>
                {/* Player position */}
                {watch("sportType") === "soccer6v6" && (
                  <div className="flex flex-col gap-2 max-w-[449px] w-full">
                    <label htmlFor="playerPosition">
                      <b> Player position </b>
                    </label>
                    <select
                      {...register("playerPosition", {
                        required: "Player position is required",
                      })}
                      className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                      placeholder="Player position"
                    >
                      <option value="">Select player position</option>
                      <option value="Goalkeeper">Goalkeeper</option>
                      <option value="Defender">Defender</option>
                      <option value="Mid-fielder">Mid-fielder</option>
                      <option value="Forward">Forward</option>
                    </select>
                    <span className="text-red-500">
                      {errors.playerPosition?.message}
                    </span>
                  </div>
                )}
                {/* Educational institution data (name, surname, email, contact number) */}
                {watch("sportType") === "soccer6v6" &&
                  watch("leagueType") !== "GIRLS" && (
                    <>
                      <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="schoolCertificate">
                          <b>
                            {" "}
                            Educational Institution certificate or diploma{" "}
                          </b>
                        </label>
                        {/* trim and dots end */}
                        {watch("schoolCertificate")?.length > 0 && (
                          <div className="flex gap-2 items-center">
                            <div
                              className="
                  overflow-hidden
                  whitespace-nowrap
                  overflow-ellipsis
              "
                            >
                              {watch("schoolCertificate")[0].name}
                            </div>
                            <button
                              className="text-red-500 border border-gray-300 rounded-md px-[4px] flex justify-between flex-wrap text-[12px]"
                              onClick={() => {
                                setValue("schoolCertificate", []);
                              }}
                            >
                              x
                            </button>
                          </div>
                        )}
                        <button
                          className="border border-gray-300 rounded-md px-[6px] py-[12px] flex justify-between flex-wrap"
                          type="button"
                          onClick={() => {
                            // click sibling of this element
                            const input = document.querySelector(
                              'input[name="schoolCertificate"]'
                            ) as HTMLInputElement;
                            input.click();
                          }}
                        >
                          {/* trim and dots end */}
                          <div
                            className="
                  overflow-hidden
                  whitespace-nowrap
                  overflow-ellipsis
                  w-[100px]
              "
                          >
                            Choose file
                          </div>
                        </button>
                        <input
                          type="file"
                          {...register("schoolCertificate", {
                            required: "School certificate is required",
                          })}
                          className="border border-gray-300 rounded-md px-[6px] py-[12px] hidden"
                        />
                        <span className="text-red-500">
                          {errors?.schoolCertificate?.message}
                        </span>
                      </div>
                      {/* School official Data */}
                      {/* School official Name */}
                      <div className="flex flex-col gap-2 max-w-[350px] w-full">
                        <label htmlFor="schoolOfficialName">
                          <b> Educational Institution official&apos;s name</b>
                        </label>
                        <input
                          type="text"
                          {...register("schoolOfficial.name", {
                            required:
                              "Educational Institution  official&apos;s name is required",
                          })}
                          className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                          placeholder="Educational Institution official's name"
                        />
                        <span className="text-red-500">
                          {errors.schoolOfficial?.name?.message}
                        </span>
                      </div>

                      {/* School official&apos;s surname */}
                      <div className="flex flex-col gap-2 max-w-[350px] w-full">
                        <label htmlFor="schoolOfficialSurname">
                          <b>
                            {" "}
                            Educational Institution official&apos;s surname
                          </b>
                        </label>
                        <input
                          type="text"
                          {...register("schoolOfficial.surname", {
                            required:
                              "Educational Institution official's surname is required",
                          })}
                          className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                          placeholder="Educational Institution official's surname"
                        />
                        <span className="text-red-500">
                          {errors.schoolOfficial?.surname?.message}
                        </span>
                      </div>

                      {/* School official&apos;s position */}
                      <div className="flex flex-col gap-2 max-w-[350px] w-full">
                        <label htmlFor="schoolOfficialPosition">
                          <b>
                            {" "}
                            Educational Institution official&apos;s position
                          </b>
                        </label>
                        <input
                          type="text"
                          {...register("schoolOfficial.position", {
                            required:
                              "Educational Institution official's position is required",
                          })}
                          className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                          placeholder="Educational Institution official's position"
                        />
                        <span className="text-red-500">
                          {errors.schoolOfficial?.position?.message}
                        </span>
                      </div>

                      {/* School official&apos;s email */}
                      <div className="flex flex-col gap-2 max-w-[350px] w-full">
                        <label htmlFor="schoolOfficialEmail">
                          <b> Educational Institution official&apos;s email</b>
                        </label>
                        <input
                          type="email"
                          {...register("schoolOfficial.email", {
                            required:
                              "Educational Institution official&apos;s email is required",
                          })}
                          className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                          placeholder="Educational Institution official's email"
                        />
                        <span className="text-red-500">
                          {errors.schoolOfficial?.email?.message}
                        </span>
                      </div>

                      {/* School official&apos;s contact number */}
                      <div className="flex flex-col gap-2 max-w-[350px] w-full">
                        <label htmlFor="schoolOfficialContactNumber">
                          <b>
                            {" "}
                            Educational Institution official&apos;s contact
                            number
                          </b>
                        </label>
                        <input
                          type="text"
                          {...register("schoolOfficial.contactNumber", {
                            required:
                              "Educational Institution official's contact number is required",
                          })}
                          className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                          placeholder="Educational Institution official's contact number"
                        />
                        <span className="text-red-500">
                          {errors.schoolOfficial?.contactNumber?.message}
                        </span>
                      </div>

                      {/* School logo */}
                      <div className="flex flex-col gap-2  w-full">
                        <label htmlFor="schoolLogo">
                          <b> Educational Institution&apos;s logo</b>
                        </label>
                        {/* trim and dots end */}
                        {watch("schoolLogo")?.length > 0 && (
                          <div className="flex gap-2 items-start">
                            <div className="flex flex-col">
                              <a
                                href={URL.createObjectURL(
                                  watch("schoolLogo")[0]
                                )}
                                target="_blank"
                              >
                                <img
                                  src={URL.createObjectURL(
                                    watch("schoolLogo")[0]
                                  )}
                                  className="w-[250px] h-[250px] object-cover"
                                  alt="school logo"
                                />
                              </a>

                              <div
                                className="
                  overflow-hidden
                  whitespace-nowrap
                  overflow-ellipsis
                  w-[100px]
              "
                              >
                                {watch("schoolLogo")[0].name}
                              </div>
                            </div>

                            <button
                              className="text-red-500 border border-gray-300 rounded-md px-[4px] flex justify-between flex-wrap text-[12px]"
                              onClick={() => {
                                setValue("schoolLogo", []);
                              }}
                            >
                              x
                            </button>
                          </div>
                        )}
                        <button
                          className="border border-gray-300 rounded-md px-[6px] py-[12px] flex justify-between flex-wrap"
                          type="button"
                          onClick={() => {
                            // click sibling of this element
                            const input = document.querySelector(
                              'input[name="schoolLogo"]'
                            ) as HTMLInputElement;
                            input.click();
                          }}
                        >
                          {/* trim and dots end */}
                          <div
                            className="
                  overflow-hidden
                  whitespace-nowrap
                  overflow-ellipsis
                  w-[100px]
              "
                          >
                            Choose file
                          </div>
                        </button>
                        <input
                          type="file"
                          {...register("schoolLogo", {
                            required:
                              "Educational Institution logo is required",
                          })}
                          className="border border-gray-300 rounded-md px-[6px] py-[12px] hidden"
                        />
                        <span className="text-red-500">
                          {errors?.schoolLogo?.message}
                        </span>
                      </div>
                    </>
                  )}
                {/* Coach name */}
                <div className="flex flex-col gap-2 max-w-[450px] w-full">
                  <label htmlFor="coachName">
                    <b> Coach name</b>
                  </label>
                  <input
                    type="text"
                    {...register("coach.name", {
                      required: "Coach name is required",
                    })}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                    placeholder="Coach name"
                  />
                  {/* description about coach */}
                  {/* <div className="text-[9px] text-gray-500">
                    <p>
                      A team may have at most 1 officially registered coach who
                      will be allowed to enter the venue on the game days for
                      free.
                    </p>
                  </div> */}
                  <span className="text-red-500">
                    {errors?.coach && errors.coach.name?.message}
                  </span>
                </div>
                {/* Coach surname */}
                <div className="flex flex-col gap-2 max-w-[450px] w-full">
                  <label htmlFor="coachSurname">
                    <b> Coach surname</b>
                  </label>
                  <input
                    type="text"
                    {...register("coach.surname", {
                      required: "Coach surname is required",
                    })}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                    placeholder="Coach surname"
                  />

                  <span className="text-red-500">
                    {errors?.coach && errors.coach.surname?.message}
                  </span>
                </div>
                {/* Coach email */}
                <div className="flex flex-col gap-2 max-w-[449px] w-full">
                  <label htmlFor="coachEmail">
                    <b> Coach email</b>
                  </label>
                  <input
                    type="email"
                    {...register("coach.email", {
                      required: "Coach email is required",
                    })}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                    placeholder="Coach email"
                  />
                  <span className="text-red-500">
                    {errors?.coach && errors?.coach.email?.message}
                  </span>
                </div>
                {/* ID CARD */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="personalPhoto">
                    <b> ID Card</b>
                  </label>
                  {/* trim and dots end */}
                  {watch("idCard")?.length > 0 && (
                    <div className="flex gap-2 items-start">
                      <div className="flex flex-col">
                        <div
                          className="
                  overflow-hidden
                  whitespace-nowrap
                  overflow-ellipsis
                  w-[100px]
              "
                        >
                          <a
                            href={URL.createObjectURL(watch("idCard")[0])}
                            target="_blank"
                          >
                            <p
                              className="text-[12px] text-blue-500 underline
                      "
                            >
                              {watch("idCard")[0].name}
                            </p>
                          </a>
                        </div>
                      </div>

                      <button
                        className="text-red-500 border border-gray-300 rounded-md px-[4px] flex justify-between flex-wrap text-[12px]"
                        onClick={() => {
                          setValue("idCard", []);
                        }}
                      >
                        x
                      </button>
                    </div>
                  )}
                  <button
                    className="border border-gray-300 rounded-md px-[6px] py-[12px] flex justify-between flex-wrap"
                    type="button"
                    onClick={() => {
                      // click sibling of this element
                      const input = document.querySelector(
                        'input[name="idCard"]'
                      ) as HTMLInputElement;
                      input.click();
                    }}
                  >
                    {/* trim and dots end */}
                    <div
                      className="
                  overflow-hidden
                  whitespace-nowrap
                  overflow-ellipsis
              "
                    >
                      Upload ID card
                    </div>
                  </button>
                  <input
                    type="file"
                    //accept only pdf file format
                    accept=".pdf"
                    {...register("idCard", {
                      required: "ID card is required",
                    })}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px] hidden"
                  />
                  {/* info about photo */}
                  <div className="text-[12px] text-gray-500">
                    <p>
                      Please upload both sides of your ID (Şəxsiyyət Vəsiqəsi)
                      in a single one-page PDF file.
                    </p>
                  </div>

                  <span className="text-red-500">
                    {errors?.idCard?.message}
                  </span>
                </div>
                {/* Personal Photo */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="personalPhoto">
                    <b> Personal photo</b>
                  </label>
                  {/* trim and dots end */}
                  {watch("personalPhoto")?.length > 0 && (
                    <div className="flex gap-2 items-start">
                      <div className="flex flex-col">
                        <a
                          href={URL.createObjectURL(watch("personalPhoto")[0])}
                          target="_blank"
                        >
                          <img
                            src={URL.createObjectURL(watch("personalPhoto")[0])}
                            className="w-[250px] h-[250px] object-cover"
                            alt="personal photo"
                          />
                        </a>

                        <div
                          className="
                  overflow-hidden
                  whitespace-nowrap
                  overflow-ellipsis
                  w-[100px]
              "
                        >
                          {watch("personalPhoto")[0].name}
                        </div>
                      </div>

                      <button
                        className="text-red-500 border border-gray-300 rounded-md px-[4px] flex justify-between flex-wrap text-[12px]"
                        onClick={() => {
                          setValue("personalPhoto", []);
                        }}
                      >
                        x
                      </button>
                    </div>
                  )}
                  <button
                    className="border border-gray-300 rounded-md px-[6px] py-[12px] flex justify-between flex-wrap"
                    type="button"
                    onClick={() => {
                      // click sibling of this element
                      const input = document.querySelector(
                        'input[name="personalPhoto"]'
                      ) as HTMLInputElement;
                      input.click();
                    }}
                  >
                    {/* trim and dots end */}
                    <div
                      className="
                  overflow-hidden
                  whitespace-nowrap
                  overflow-ellipsis
              "
                    >
                      Upload photo
                    </div>
                  </button>
                  <input
                    type="file"
                    {...register("personalPhoto", {
                      required: "Personal photo is required",
                    })}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px] hidden"
                  />
                  {/* info about photo */}
                  <div className="text-[12px] text-gray-500">
                    <p>
                      The photo will be used both for our pre-game posts with a
                      quote and for your virtual player badge.
                    </p>
                  </div>

                  <span className="text-red-500">
                    {errors?.personalPhoto?.message}
                  </span>
                </div>
                {/* Quote */}
                <div className="flex flex-col gap-2  w-full">
                  <label htmlFor="quote">
                    <b> Quote</b>
                  </label>
                  <input
                    type="text"
                    {...register("quote", {
                      required: "Quote is required",
                    })}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                    placeholder="Quote"
                  />
                  {/* Info about quote */}
                  <div className="text-[12px] text-gray-500">
                    <p>This quote will be used for our pre-game posts.</p>
                  </div>
                  <span className="text-red-500">{errors.quote?.message}</span>
                </div>
                {/* Team logo */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="teamLogo">
                    <b> Team logo</b>
                  </label>
                  {/* trim and dots end */}
                  {watch("teamLogo")?.length > 0 && (
                    <div className="flex gap-2 items-start">
                      <div className="flex flex-col">
                        <a
                          href={URL.createObjectURL(watch("teamLogo")[0])}
                          target="_blank"
                        >
                          <img
                            src={URL.createObjectURL(watch("teamLogo")[0])}
                            className="w-[250px] h-[250px] object-cover"
                            alt="team logo"
                          />
                        </a>

                        <div
                          className="
                  overflow-hidden
                  whitespace-nowrap
                  overflow-ellipsis
                  w-[100px]
              "
                        >
                          {watch("teamLogo")[0].name}
                        </div>
                      </div>

                      <button
                        className="text-red-500 border border-gray-300 rounded-md px-[4px] flex justify-between flex-wrap text-[12px]"
                        onClick={() => {
                          setValue("teamLogo", []);
                        }}
                      >
                        x
                      </button>
                    </div>
                  )}
                  <button
                    className="border border-gray-300 rounded-md px-[6px] py-[12px] flex justify-between flex-wrap"
                    type="button"
                    onClick={() => {
                      // click sibling of this element
                      const input = document.querySelector(
                        'input[name="teamLogo"]'
                      ) as HTMLInputElement;
                      input.click();
                    }}
                  >
                    {/* trim and dots end */}
                    <div
                      className="
                  overflow-hidden
                  whitespace-nowrap
                  overflow-ellipsis
                  w-[100px]
              "
                    >
                      Choose file
                    </div>
                  </button>
                  <input
                    type="file"
                    {...register("teamLogo", {
                      required: "Team logo is required",
                    })}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px] hidden"
                  />
                  <span className="text-red-500">
                    {errors?.teamLogo?.message}
                  </span>
                </div>
                {/* Team slogan */}
                <div className="flex flex-col gap-2  w-full">
                  <label htmlFor="teamSlogan">
                    <b> Team slogan</b>
                  </label>
                  <input
                    type="text"
                    {...register("teamSlogan", {
                      required: "Team slogan is required",
                    })}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                    placeholder="Team slogan"
                  />
                  {/* Info about quote */}
                  <div className="text-[12px] text-gray-500">
                    <p>
                      It is an optional question. Your team’s slogan could be a
                      catchy phrase consisting of 3-4 rhyming words.
                    </p>
                  </div>
                  <span className="text-red-500">{errors.quote?.message}</span>
                </div>

                {/* Any other comments or details we should be aware of */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="comment">
                    <b>Any other comments or details we should be aware of</b>
                  </label>
                  <textarea
                    {...register("comment")}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
                  />
                  <span className="text-red-500">
                    {errors.comment?.message}
                  </span>
                </div>
                {/* Are you or your institution paying for joining the tournament? */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="isPaying">
                    <b>
                      Are you or your institution paying for joining the
                      tournament?
                    </b>
                  </label>
                  <select
                    {...register("isPaying", {
                      required: "This field is required",
                    })}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
                    placeholder="Select payment type"
                  >
                    <option value={undefined}>Select payment type</option>
                    <option value="institution">Institution</option>
                    <option value="Personal">Personal</option>
                  </select>
                  <span className="text-red-500">
                    {errors.isPaying?.message}
                  </span>
                </div>
                {watch("isPaying") === "institution" && (
                  <>
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="institutionPayingName">
                        <b>Payer name</b>
                      </label>
                      <input
                        {...register("institutionPaying.name", {
                          required: "Payer name is required",
                        })}
                        className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
                      />
                      <span className="text-red-500">
                        {errors?.institutionPaying?.name?.message}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="institutionPayingSurname">
                        <b>Payer surname</b>
                      </label>
                      <input
                        {...register("institutionPaying.surname", {
                          required: "Payer surname is required",
                        })}
                        className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
                      />
                      <span className="text-red-500">
                        {errors?.institutionPaying?.surname?.message}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="institutionPayingPosition">
                        <b>Payer position</b>
                      </label>
                      <input
                        {...register("institutionPaying.position", {
                          required: "Payer position is required",
                        })}
                        className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
                      />
                      <span className="text-red-500">
                        {errors?.institutionPaying?.position?.message}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="institutionPayingEmail">
                        <b>Payer email</b>
                      </label>
                      <input
                        type="email"
                        {...register("institutionPaying.email", {
                          required: "Payer email is required",
                        })}
                        className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
                      />
                      <span className="text-red-500">
                        {errors?.institutionPaying?.email?.message}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="institutionPayingContactNumber">
                        <b>Payer contact number</b>
                      </label>
                      <input
                        type="text"
                        {...register("institutionPaying.contactNumber", {
                          required: "Payer contact number is required",
                        })}
                        className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full"
                      />
                      <span className="text-red-500">
                        {errors?.institutionPaying?.contactNumber?.message}
                      </span>
                    </div>
                  </>
                )}

                {/* Submit */}
                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    className="h-[50px] bg-[#032974] text-white px-[6px] py-[12px] rounded-md max-w-[300px] w-full"
                  >
                    Submit{" "}
                    {registerLoading && (
                      <span className="animate-spin">...</span>
                    )}
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
            )}

            {step === 3 && (
              <div className="flex flex-wrap gap-[30px] max-w-[1100px] w-full">
                <div className="flex flex-col gap-2 w-full">
                  <div className=" flex gap-2">
                    <label htmlFor="teamMembers">
                      <b>Add team members</b>
                    </label>
                  </div>
                  {teamMembersShow}
                  <AddTeamMember
                    getData={addTeamMember}
                    maxCount={
                      watch("sportType") === "soccer6v6"
                        ? 11
                        : watch("sportType") === "basketball3x3"
                        ? 4
                        : watch("sportType") === "beachVolleyball4v4"
                        ? 5
                        : 0
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

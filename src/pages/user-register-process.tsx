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
  faDollar,
  faPerson,
  faTShirt,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { teamApi } from "@/store/teamApi";
import register from "./register";
import { playerApi } from "@/store/playerApi";
import error from "next/error";
type Props = {};

export default function Register(props: Props) {
  const router = useRouter();
  const params = router.query;
  const { sport: sportParam, league: leagueParam } = params;
  const schoolCertificateInputRef = React.useRef<HTMLInputElement>(null);
  const [teamSize, setTeamSize] = useState<any>(1);

  const {
    data: playersUserInfo,
    isError: isPlayersUserInfo,
    isLoading: isPlayersUserLoading,
    isSuccess: isPlayersUserSuccess,
    refetch: refetchPlayersUserInfo,
  } = teamApi.usePlayersUserInfoQuery({
    userId:
      typeof window !== "undefined" ? localStorage.getItem("userId")! : "",
  });

  const [playersUserInfoApi] = teamApi.useLazyPlayersUserInfoQuery();

  const [step, setStep] = useState<any>(2);

  const [
    getTeamInfoApi,
    {
      isLoading: isGetTeamInfoLoading,
      isError: isGetTeamInfoError,
      isSuccess: isGetTeamInfoSuccess,
      data: getTeamInfoData,
      error: getTeamInfoError,
    },
  ] = teamApi.useLazyGetTeamInfoQuery();
  const [
    refreshTokenApi,
    {
      isLoading: isRefreshTokenLoading,
      isError: isRefreshTokenError,
      isSuccess: isRefreshTokenSuccess,
      data: refreshTokenData,
      error: refreshTokenError,
    },
  ] = authApi.useRefreshTokenMutation();
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

  const {
    data: meData,
    isError: isMeError,
    isLoading: isMeLoading,
    refetch: refetchMe,
  } = authApi.useMeQuery({});
  const [
    getTeamPlayersApi,
    {
      isLoading: isGetTeamPlayersLoading,
      isError: isGetTeamPlayersError,
      isSuccess: isGetTeamPlayersSuccess,
      data: teamData,
      error: getTeamPlayersError,
    },
  ] = teamApi.useLazyGetTeamPlayersQuery();
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
  ] = teamApi.useIdCardMutation();
  const [
    teamLogoApi,
    {
      isLoading: isTeamLogoLoading,
      isError: isTeamLogoError,
      isSuccess: isTeamLogoSuccess,
      data: teamLogoData,
      error: teamLogoError,
    },
  ] = teamApi.useTeamLogoMutation();
  const [
    schoolLogoApi,
    {
      isLoading: isSchoolLogoLoading,
      isError: isSchoolLogoError,
      isSuccess: isSchoolLogoSuccess,
      data: schoolLogoData,
      error: schoolLogoError,
    },
  ] = teamApi.useTeamLogoMutation();
  const [
    personalPhotoApi,
    {
      isLoading: isPersonalPhotoLoading,
      isError: isPersonalPhotoError,
      isSuccess: isPersonalPhotoSuccess,
      data: personalPhotoData,
      error: personalPhotoError,
    },
  ] = teamApi.useProfilePhotoMutation();

  const [
    leagueInfoApi,
    {
      isLoading: isLeagueInfoLoading,
      isError: isLeagueInfoError,
      isSuccess: isLeagueInfoSuccess,
      data: leagueInfoData,
    },
  ] = teamApi.useLazyLeagueInfoQuery();

  const [
    schoolCertificateApi,
    {
      isLoading: isSchoolCertificateLoading,
      isError: isSchoolCertificateError,
      isSuccess: isSchoolCertificateSuccess,
      data: schoolCertificateData,
      error: schoolCertificateError,
    },
  ] = teamApi.useSchoolCertificateMutation();

  const [
    schoolDiplomaApi,
    {
      isLoading: isSchoolDiplomaLogoLoading,
      isError: isSchoolDiplomaLogoError,
      isSuccess: isSchoolDiplomaLogoSuccess,
      data: schoolDiplomaLogoData,
      error: schoolDiplomaLogoError,
    },
  ] = teamApi.useSchoolCertificateMutation();
  const [
    putPlayerInfoApi,
    {
      isLoading: isPutPlayerLoading,
      isError: isPutPlayerError,
      isSuccess: isPutPlayerSuccess,
      data: putPlayerInfoData,
      error: putPlayerInfoError,
    },
  ] = playerApi.usePutPlayerInfoMutation();
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
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = methods;

  const playerId = useMemo(() => {
    if (isPlayersUserSuccess) {
      return playersUserInfo.id;
    }
    return null;
  }, [isPlayersUserSuccess, playersUserInfo]);

  const onSubmit = async (data: RegisterDto) => {
    const formData: any = {
      userId: localStorage.getItem("userId")!,
      leagueId: data.leagueType,
      postData: {
        jerseyNumber: data.jerseyNumber,
        teamDetails: {
          additionalComments: data.comment,
        },
      },
    };
    const idCardFormData = new FormData();
    idCardFormData.append("file", data.idCard[0]);
    const personalPhotoFormData = new FormData();
    personalPhotoFormData.append("file", data.personalPhoto[0]);

    const schoolCertificateData = new FormData();
    schoolCertificateData.append("file", data.schoolCertificate[0]);

    putTeamInfo({
      postData: formData.postData,
      idCardFormData: idCardFormData,
      personalPhotoFormData: personalPhotoFormData,
      schoolCertificateFormData: schoolCertificateData,
    });
    return null;
  };

  const putTeamInfo = async ({
    postData,
    idCardFormData,
    personalPhotoFormData,
    schoolCertificateFormData,
  }: {
    personalPhotoFormData: any;
    postData: {
      jerseyNumber: string;
      teamDetails: {
        additionalComments: string;
      };
    };
    idCardFormData: any;
    schoolCertificateFormData: any;
  }) => {
    try {
      const resp = await putPlayerInfoApi({
        playerId: playerId,
        body: postData,
      }).unwrap();

      const respPlayersUser = await playersUserInfoApi({
        userId: localStorage.getItem("userId")!,
      }).unwrap();
      console.log(respPlayersUser);

      await personalPhotoApi({
        userId: localStorage.getItem("userId")!,
        body: personalPhotoFormData,
      });

      await schoolCertificateApi({
        userId: respPlayersUser.id,
        body: schoolCertificateFormData,
      });

      await idCardApi({
        playerId: playerId,
        body: idCardFormData,
      });
      toast.success("Player info updated");
    } catch (error) {
      toast.error("Player info update failed");
    }
  };

  const playerInfoErrorData = useMemo(() => {
    if (isPutPlayerError) {
      return putPlayerInfoError as any;
    }
    return null;
  }, [isPutPlayerError, putPlayerInfoError]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (isPlayersUserSuccess) {
      const teamsUrl = playersUserInfo.team;
      const trimedIdFromTeamsUrl = teamsUrl.split("/").pop();
      getTeamPlayersApi({
        teamId: trimedIdFromTeamsUrl,
      });
      getTeamInfoApi({
        teamId: trimedIdFromTeamsUrl,
      });
    }
  }, [isPlayersUserSuccess]);

  useEffect(() => {
    if (isGetTeamInfoSuccess) {
      const leagueUrl = getTeamInfoData.league;
      const trimedIdFromLeagueUrl = leagueUrl.split("/").pop();
      leagueInfoApi({
        leagueId: trimedIdFromLeagueUrl,
      });
      methods.reset({
        teamName: getTeamInfoData.name,
        teamSlogan: getTeamInfoData.slogan,
        jerseyNumber: playersUserInfo.jerseyNumber,
        quote: playersUserInfo.quote,
        schoolOfficial: {
          name: getTeamInfoData.teamDetails?.schoolOfficial?.firstName,
          surname: getTeamInfoData.teamDetails?.schoolOfficial?.lastName,
          email: getTeamInfoData.teamDetails?.schoolOfficial?.email,
          contactNumber: getTeamInfoData.teamDetails?.schoolOfficial?.number,
          position: getTeamInfoData.teamDetails?.schoolOfficial?.position,
        },
        isPaying: getTeamInfoData.paymentType,
        comment: getTeamInfoData.teamDetails?.additionalComments,
      });
    }
  }, [isGetTeamInfoSuccess]);

  if (isRefreshTokenError) {
    return (
      <div className="mx-auto">
        <h1 className="text-center pt-5 max-auto">Token is invalid</h1>
        <Link href="/login" className="text-center mx-auto block">
          go to login page
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className="flex flex-wrap max-w-[1140px] justify-center w-full px-[15px] pt-4">
        <h1 className="w-full flex text-[44px] pb-10">
          User Registration Process
        </h1>
        <div className="flex  flex-wrap lg:flex-nowrap gap-5 w-full justify-center">
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
                  setStep(4);
                }}
                disabled={isPlayersUserInfo}
                className={
                  isPlayersUserInfo
                    ? "w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#a0a0a0] "
                    : "w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#042974] opacity-100"
                }
              >
                <FontAwesomeIcon icon={faDollar} className="text-white" />
              </button>
              <p className="text-xs">Payment</p>
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
          <div className="flex flex-col max-w-[1100px] w-full">
            {step === 2 && (
              <form
                action=""
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-wrap gap-[30px] max-w-[1100px] w-full"
              >
                {/* Team name */}
                <div className="flex gap-2  w-full text-[24px]">
                  <label htmlFor="teamName">
                    <b> Team name: </b>
                  </label>
                  <b>
                    <i className="text-blue-600">{getTeamInfoData?.name}</i>
                  </b>
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
                {watch("sportType") === "2" && (
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

                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="schoolCertificate">
                    <b> Educational Institution certificate or diploma </b>
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
                    {...register("schoolCertificate")}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px] hidden"
                  />
                  <span className="text-red-500">
                    {errors?.schoolCertificate?.message}
                  </span>
                </div>

                {/* {watch("sportType") === "soccer6v6" &&
                  watch("leagueType") !== "GIRLS" && (
                    <>
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

                      <div className="flex flex-col gap-2  w-full">
                        <label htmlFor="schoolLogo">
                          <b> Educational Institution&apos;s logo</b>
                        </label>
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
                  )} */}

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
                  {(watch("personalPhoto")?.length < 1 ||
                    !watch("personalPhoto")) &&
                    playersUserInfo?.image && (
                      <div className="flex gap-2 items-start">
                        <div className="flex flex-col">
                          <a href={playersUserInfo?.image} target="_blank">
                            <img
                              src={playersUserInfo?.image}
                              className="w-[250px] h-[250px] object-cover"
                              alt="personal photo"
                            />
                          </a>
                        </div>
                      </div>
                    )}
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

                {/* Submit */}
                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    className="h-[50px] bg-[#032974] text-white px-[6px] py-[12px] rounded-md max-w-[300px] w-full"
                  >
                    Submit
                    {registerLoading && (
                      <span className="animate-spin">...</span>
                    )}
                  </button>
                </div>

                {putPlayerInfoError &&
                  ("status" in putPlayerInfoError ? (
                    <div>
                      <div>
                        {playerInfoErrorData?.data &&
                          Object.keys(playerInfoErrorData.data).map((key) => {
                            return (
                              <p key={key} className="text-red-500">
                                {playerInfoErrorData.data[key]}
                              </p>
                            );
                          })}
                      </div>
                    </div>
                  ) : null)}
              </form>
            )}

            {step === 4 && (
              <div className="flex flex-wrap gap-[30px]  w-full">
                <div className="flex flex-col gap-2 w-full ">
                  <div className="gap-2 flex flex-col">
                    <h1 className="text-[36px]">
                      <b>Payment</b>
                    </h1>
                    <label>Please enter your team size</label>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md px-[6px] py-[12px] w-full w-max-[350px] "
                      value={teamSize}
                      onChange={(e) => {
                        const onlyNumber = /^[0-9\b]+$/;
                        if (
                          e.target.value === "" ||
                          onlyNumber.test(e.target.value)
                        ) {
                          setTeamSize(e.target.value);
                        }
                      }}
                    />
                    <span className="text-[12px] text-red-500">
                      <div>
                        {teamSize <
                          leagueInfoData?.leagueDetails?.minNumberOfPlayers &&
                          `Team size must be greater than ${leagueInfoData?.leagueDetails?.minNumberOfPlayers}`}
                      </div>
                      <div>
                        {teamSize >
                          leagueInfoData?.leagueDetails?.maxNumberOfPlayers &&
                          `Team size must be less than ${leagueInfoData?.leagueDetails?.maxNumberOfPlayers}`}
                      </div>
                    </span>
                    <p className="text-[12px] text-gray-500">
                      Your total will be calculated based on the number of team
                      you have entered.
                    </p>
                    <p className="text-[12px] text-gray-500">
                      Minimum team players{" "}
                      {leagueInfoData?.leagueDetails?.minNumberOfPlayers}
                    </p>
                    <p className="text-[12px] text-gray-500">
                      Maximum team players{" "}
                      {leagueInfoData?.leagueDetails?.maxNumberOfPlayers}
                    </p>
                    <p className="text-[12px] mt-2  text-gray-500 text-[36px]">
                      Payment based on your team size:{" "}
                      {teamSize
                        ? leagueInfoData?.leagueDetails?.priceEarly / teamSize
                        : leagueInfoData?.leagueDetails?.priceEarly}
                      AZN
                    </p>
                    <p className="text-[12px] text-gray-500">
                      Go to payment page and proceed payment based on calculated
                      value
                    </p>
                  </div>
                  <div>
                    <iframe
                      src="https://epoint.az/az/widget?id=1882&type=users"
                      allowTransparency={true}
                      width={350}
                      height={175}
                    ></iframe>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-wrap gap-[30px]  w-full">
                You have to fill all necessary information
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

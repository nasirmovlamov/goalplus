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
import paymentExample from "../media/images/paymentexample.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faDollar,
  faPerson,
  faTShirt,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { AddTeamMember } from "@/components/AddTeamMember";
import { teamApi } from "@/store/teamApi";
import register from "./register";
import { watch } from "fs";
import TeamMemberCard from "@/components/TeamMemberCard";
type Props = {};

import defaultProfilePhoto from "../media/images/Default_pfp.svg.png";
import ErrorMapper from "@/components/ErrorMapper";
import { paymentApi } from "@/store/paymentApi";
import error from "next/error";
import { sportsApi } from "@/store/sportsApi";
import { leaguesApi } from "@/store/leaguesApi";

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

export default function Register(props: Props) {
  const router = useRouter();
  const params = router.query;
  const { sport: sportParam, league: leagueParam } = params;
  const schoolCertificateInputRef = React.useRef<HTMLInputElement>(null);
  const [onlyCaptainPaying, setOnlyCaptainPaying] = useState<any>(false);
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
  const {
    data: sportsData,
    isError: isSportsError,
    isLoading: isSportsLoading,
    isSuccess: isSportsSuccess,
  } = sportsApi.useGetSportsQuery();
  const [
    getLeaguesApi,
    {
      data: leaguesData,
      isError: isLeaguesError,
      isLoading: isLeaguesLoading,
      isSuccess: isLeaguesSuccess,
    },
  ] = leaguesApi.useLazyGetLeaguesQuery();

  const [playersUserInfoApi, s] = teamApi.useLazyPlayersUserInfoQuery();
  const [teamSize, setTeamSize] = useState<any>(1);

  const [step, setStep] = useState<any>(2);
  const [
    putPlayerInfoApi,
    {
      isLoading: isPutPlayerLoading,
      isError: isPutPlayerError,
      isSuccess: isPutPlayerSuccess,
      data: putPlayerInfoData,
      error: putPlayerInfoError,
    },
  ] = teamApi.usePutPlayerInfoMutation();
  const [
    paymentProceedApi,
    {
      isLoading: isPaymentApiLoading,
      isError: isPaymentApiError,
      isSuccess: isPaymentApiSuccess,
      data: paymentApiData,
      error: paymentApiError,
    },
  ] = paymentApi.useProccedPaymentMutation();
  const [
    getTeamTotalPaymentApi,
    {
      isLoading: isGetTeamTotalPaymentLoading,
      isError: isGetTeamTotalPaymentError,
      isSuccess: isGetTeamTotalPaymentSuccess,
      data: getTeamTotalPaymentData,
      error: getTeamTotalPaymentError,
    },
  ] = paymentApi.useTeamTotalPaymentMutation();
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
  ] = teamApi.useSchoolLogoMutation();
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
    teamInfoApi,
    {
      isLoading: isTeamInfoLoading,
      isError: isTeamInfoError,
      isSuccess: isTeamInfoSuccess,
      data: teamInfoData,
      error: teamInfoError,
    },
  ] = teamApi.usePostTeamInfoMutation();
  const [
    putTeamInfoApi,
    {
      isLoading: isPutTeamInfoLoading,
      isError: isPutTeamInfoError,
      isSuccess: isPutTeamInfoSuccess,
      data: putTeamInfoData,
      error: putTeamInfoError,
    },
  ] = teamApi.usePutTeamInfoMutation();
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
  const deleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((item) => item.id !== id));
  };
  const teamMembersShow = useMemo(() => {
    return teamData?.map((item: any, index: any) => (
      // show all team members
      <>
        <TeamMemberCard
          key={item.id}
          name={item.firstName}
          surname={item.lastName}
          image={item.image}
          sportId={item.sportId}
        />
        {/* <div
          key={item.id}
          className="flex flex-wrap min-w-[350px] gap-3 items-center w-max border-dashed border p-4 border-[#cdf000]"
        >
          <img
            src={defaultProfilePhoto.src}
            alt=""
            className="w-[100px] h-[100px] rounded-full"
          />
          <div>
            <div className="flex flex-col gap-2 w-full">Player {index + 1}</div>
            {item.isCaptain && (
              <div className="flex flex-col gap-2 w-full">
                Player is captain
              </div>
            )}
            <div className="flex flex-col gap-2 w-full">
              Name : {item.firstName}
            </div>
            <div className="flex flex-col gap-2 w-full">
              Surname : {item.lastName}
            </div>
          </div>
        </div> */}
      </>
    ));
  }, [teamData]);
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
        jerseyNumber: data.jerseyNumber,
        quote: data.quote,
        slogan: data.teamSlogan,
        paymentType: data.isPaying,
        name: data.teamName,
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
        position: data.schoolOfficial.position,
      };
    }
    const idCardFormData = new FormData();
    if (data?.idCard?.length) {
      idCardFormData.append("file", data.idCard[0]);
    }
    const schoolLogoFormData = new FormData();
    const schoolCertificateFormData = new FormData();
    if (data.schoolCertificate?.length) {
      schoolCertificateFormData.append("file", data.schoolCertificate[0]);
      schoolLogoFormData.append("file", data.schoolLogo[0]);
    }
    const teamLogoFormData = new FormData();
    if (data.teamLogo.length) {
      teamLogoFormData.append("file", data.teamLogo[0]);
    }

    const personalPhotoFormData = new FormData();
    if (data.personalPhoto.length) {
      personalPhotoFormData.append("file", data.personalPhoto[0]);
    }

    if (leagueId) {
      putTeamInfo({
        postData: formData.postData,
        idCardFormData: idCardFormData,
        schoolCertificateFormData: schoolCertificateFormData,
        teamLogoFormData: teamLogoFormData,
        schoolLogoFormData: schoolLogoFormData,
        personalPhotoFormData: personalPhotoFormData,
      });
      return null;
    }
    handleTeamInfo({
      leagueId: data.leagueType,
      userId: localStorage.getItem("userId")!,
      postData: formData.postData,
      idCardFormData: idCardFormData,
      schoolCertificateFormData: schoolCertificateFormData,
      teamLogoFormData: teamLogoFormData,
      schoolLogoFormData: schoolLogoFormData,
      personalPhotoFormData: personalPhotoFormData,
    });
    return null;
  };

  const teamMembersSubmit = async (data: RegisterDto) => {
    return null;
  };

  const setValuesOfForm = () => {
    console.log("teamInfoData", teamInfoData);
    if (teamInfoData) {
      setValue("jerseyNumber", teamInfoData.jerseyNumber);
      setValue("quote", teamInfoData.quote);
      setValue("teamSlogan", teamInfoData.slogan);
      setValue("isPaying", teamInfoData.paymentType);
      setValue("teamName", teamInfoData.name);
      setValue("comment", teamInfoData.teamDetails.additionalComments);
      if (teamInfoData.teamDetails.schoolOfficial) {
        setValue(
          "schoolOfficial.name",
          teamInfoData.teamDetails.schoolOfficial.firstName
        );
        setValue(
          "schoolOfficial.surname",
          teamInfoData.teamDetails.schoolOfficial.lastName
        );
        setValue(
          "schoolOfficial.email",
          teamInfoData.teamDetails.schoolOfficial.email
        );
        setValue(
          "schoolOfficial.contactNumber",
          teamInfoData.teamDetails.schoolOfficial.number
        );
        setValue(
          "schoolOfficial.position",
          teamInfoData.teamDetails.schoolOfficial.position
        );
      }
    }
  };

  const handleTeamInfo = async ({
    leagueId,
    userId,
    postData,
    idCardFormData,
    schoolCertificateFormData,
    teamLogoFormData,
    schoolLogoFormData,
    personalPhotoFormData,
  }: {
    personalPhotoFormData: any;
    schoolLogoFormData: any;
    leagueId: string;
    userId: string;
    postData: {
      jerseyNumber: string;
      position: string;
      quote: string;
      name: string;
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
    idCardFormData: any;
    schoolCertificateFormData: any;
    teamLogoFormData: any;
  }) => {
    try {
      const resp = await teamInfoApi({
        leagueId: leagueId,
        userId: userId,
        body: postData,
      }).unwrap();

      await refreshTokenApi({
        accessToken: localStorage.getItem("accessToken")! as string,
        refreshToken: localStorage.getItem("refreshToken")! as string,
      })
        .unwrap()
        .then((resp: any) => {
          if (resp) {
            localStorage.setItem("accessToken", resp.accessToken);
            localStorage.setItem("refreshToken", resp.refreshToken);
          }
        });
      const respPlayersUser = await playersUserInfoApi({
        userId: userId,
      }).unwrap();
      const respPlayer = await putPlayerInfoApi({
        playerId: respPlayersUser.id,
        body: {
          jerseyNumber: postData.jerseyNumber,
          quote: postData.quote,
          position: postData.position,
          teamDetails: {
            additionalComments: postData.teamDetails.additionalComments,
          },
        },
      });
      if (personalPhotoFormData && personalPhotoFormData.get("file")) {
        await personalPhotoApi({
          userId: userId,
          body: personalPhotoFormData,
        });
      }
      if (teamLogoFormData && teamLogoFormData.get("file")) {
        await teamLogoApi({
          teamId: resp.id,
          body: teamLogoFormData,
        });
      }
      // check if school logo is not empty
      if (schoolLogoFormData && schoolLogoFormData.get("file")) {
        await schoolLogoApi({
          teamId: resp.id,
          body: schoolLogoFormData,
        });
      }
      if (idCardFormData && idCardFormData.get("file")) {
        await idCardApi({
          playerId: respPlayersUser.id,
          body: idCardFormData,
        });
      }
      console.log("schoolCertificateFormData", schoolCertificateFormData);
      // if it is not empty
      if (
        schoolCertificateFormData && // if school certificate is not empty
        schoolCertificateFormData.get("file")
      ) {
        await schoolCertificateApi({
          userId: respPlayersUser.id,
          body: schoolCertificateFormData,
        });
      }
      setValuesOfForm();
      toast.success("Team info updated");
    } catch (error) {
      toast.error("Team info update failed");
    }
  };

  const putTeamInfo = async ({
    postData,
    idCardFormData,
    schoolCertificateFormData,
    teamLogoFormData,
    schoolLogoFormData,
    personalPhotoFormData,
  }: {
    personalPhotoFormData: any;
    schoolLogoFormData: any;
    postData: {
      slogan: string;
      paymentType: string;
      jerseyNumber: string;
      quote: string;
      name: string;
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
    idCardFormData: any;
    schoolCertificateFormData: any;
    teamLogoFormData: any;
  }) => {
    try {
      console.log(schoolCertificateFormData);
      const resp = await putTeamInfoApi({
        teamId: teamId,
        body: postData,
      }).unwrap();

      const respPlayersUser = await playersUserInfoApi({
        userId: localStorage.getItem("userId")!,
      }).unwrap();

      const respPlayer = await putPlayerInfoApi({
        playerId: respPlayersUser.id,
        body: {
          jerseyNumber: postData.jerseyNumber,
          quote: postData.quote,
          teamDetails: {
            additionalComments: postData.teamDetails.additionalComments,
          },
        },
      });
      if (personalPhotoFormData && personalPhotoFormData.get("file")) {
        await personalPhotoApi({
          userId: localStorage.getItem("userId")!,
          body: personalPhotoFormData,
        });
      }
      if (teamLogoFormData && teamLogoFormData.get("file")) {
        await teamLogoApi({
          teamId: teamId,
          body: teamLogoFormData,
        });
      }
      if (schoolLogoFormData && schoolLogoFormData.get("file")) {
        await schoolLogoApi({
          teamId: teamId,
          body: schoolLogoFormData,
        });
      }
      if (schoolCertificateFormData && schoolCertificateFormData.get("file")) {
        await schoolCertificateApi({
          userId: respPlayersUser.id,
          body: schoolCertificateFormData,
        });
      }
      if (idCardFormData && idCardFormData.get("file")) {
        await idCardApi({
          playerId: respPlayersUser.id,
          body: idCardFormData,
        });
      }
      setValuesOfForm();
      toast.success("Team info updated");
    } catch (error) {
      toast.error("Team info update failed");
      console.error(error);
    }
  };

  const teamInfoErrorData = useMemo(() => {
    if (isTeamInfoError) {
      return teamInfoError as any;
    }
    return null;
  }, [isTeamInfoError, teamInfoError]);

  const playerId = useMemo(() => {
    if (isPlayersUserSuccess) {
      return playersUserInfo.id;
    }
    return null;
  }, [isPlayersUserSuccess, playersUserInfo]);

  const proceedPayment = async () => {
    let resp = null;
    try {
      if (
        onlyCaptainPaying // if captain is not paying
      ) {
        const amount = leagueInfoData?.leagueDetails?.priceRegular;
        resp = await paymentProceedApi({
          userId: localStorage.getItem("userId")!,
          amount: amount,
        });
        window.open((resp as any)?.error?.data, "_blank");
      } else {
        const amount = (
          leagueInfoData?.leagueDetails?.priceRegular / teamSize
        ).toFixed(2);

        resp = await paymentProceedApi({
          userId: localStorage.getItem("userId")!,
          amount: amount,
        });
        window.open((resp as any)?.error?.data, "_blank");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      console.log("additional comments", getTeamInfoData.teamDetails);
      methods.reset({
        teamName: getTeamInfoData?.name,
        teamSlogan: getTeamInfoData?.slogan,
        jerseyNumber: playersUserInfo?.jerseyNumber,
        quote: playersUserInfo?.quote,
        schoolOfficial: {
          name: getTeamInfoData?.teamDetails?.schoolOfficial?.firstName,
          surname: getTeamInfoData?.teamDetails?.schoolOfficial?.lastName,
          email: getTeamInfoData?.teamDetails?.schoolOfficial?.email,
          contactNumber: getTeamInfoData?.teamDetails?.schoolOfficial?.number,
          position: getTeamInfoData?.teamDetails?.schoolOfficial?.position,
        },
        isPaying: getTeamInfoData?.paymentType,
        comment: getTeamInfoData?.teamDetails?.additionalComments,
      });
      const leagueUrl = getTeamInfoData.league;
      const trimedIdFromLeagueUrl = leagueUrl.split("/").pop();
      leagueInfoApi({
        leagueId: trimedIdFromLeagueUrl,
      });
    }
  }, [isGetTeamInfoSuccess]);

  const teamId = useMemo(() => {
    if (isPlayersUserSuccess) {
      const teamsUrl = playersUserInfo.team;
      const trimedIdFromTeamsUrl = teamsUrl.split("/").pop();
      return trimedIdFromTeamsUrl as any;
    }
    return null;
  }, [isPlayersUserSuccess, playersUserInfo]);

  const leagueId = useMemo(() => {
    if (isGetTeamInfoSuccess) {
      const leagueUrl = getTeamInfoData.league;
      const trimedIdFromLeagueUrl = leagueUrl.split("/").pop();
      methods.reset({
        ...methods.getValues(),
        leagueType: trimedIdFromLeagueUrl,
      });
      return trimedIdFromLeagueUrl as any;
    }
    return null;
  }, [isGetTeamInfoSuccess, getTeamInfoData]);

  const sportId = useMemo(() => {
    if (isLeagueInfoSuccess) {
      const sportUrl = leagueInfoData?.sport;
      const trimedIdFromSportUrl = sportUrl?.split("/")?.pop();
      console.log("sportId", trimedIdFromSportUrl);
      methods.reset({
        ...methods.getValues(),
        sportType: trimedIdFromSportUrl,
      });
      getLeaguesApi({ sportId: trimedIdFromSportUrl });
      return trimedIdFromSportUrl as any;
    }
    return null;
  }, [isLeagueInfoSuccess, leagueInfoData]);

  useEffect(() => {
    if (teamId) {
      getTeamTotalPaymentApi({
        teamId: teamId,
      });
    }
  }, [teamId]);

  if (isSportsLoading) {
    return <div>Loading</div>;
  }

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
          Captain Registration Process
        </h1>
        <div className="flex  flex-wrap lg:flex-nowrap gap-5 w-full justify-center">
          <div className="flex lg:flex-col w-full lg:gap-0 gap-2 lg:w-[190px] ">
            <div className="flex flex-col sm:flex-row sm:justify-start gap-1 sm:items-center">
              <button
                onClick={() => {
                  // setStep(1);
                }}
                className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#042974]"
              >
                <FontAwesomeIcon icon={faCheck} className="text-white" />
              </button>
              <p className="text-[9px] sm:text-xs text-center">Profile Info</p>
            </div>
            {/* line */}
            <div className="w-[35px] h-[2px] lg:gap-0  lg:w-[2px] lg:h-[35px] bg-[#042974] mt-4 lg:mt-0 lg:ml-4"></div>

            <div className="flex flex-col sm:flex-row sm:justify-start flex-wrap gap-1 items-center">
              <button
                onClick={() => {
                  setStep(2);
                }}
                className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#042974]"
              >
                <FontAwesomeIcon icon={faTShirt} className="text-white" />
              </button>
              <p className="text-[9px] sm:text-xs text-center">Team Info</p>
            </div>

            <div className="w-[35px] h-[2px] lg:gap-0  lg:w-[2px] lg:h-[35px] bg-[#042974] mt-4 lg:mt-0 lg:ml-4"></div>

            <div className="flex flex-col sm:flex-row sm:justify-start flex-wrap gap-1 items-center">
              <button
                onClick={() => {
                  setStep(3);
                }}
                disabled={isPlayersUserInfo}
                className={
                  isPlayersUserInfo
                    ? "w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#a0a0a0] "
                    : "w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#042974] opacity-100"
                }
              >
                <FontAwesomeIcon icon={faUserPlus} className="text-white" />
              </button>
              <p className="text-[9px] sm:text-xs text-center">Team members</p>
            </div>

            <div className="w-[35px] h-[2px] lg:gap-0  lg:w-[2px] lg:h-[35px] bg-[#042974] mt-4 lg:mt-0 lg:ml-4"></div>

            <div className="flex flex-col sm:flex-row sm:justify-start flex-wrap gap-1 items-center">
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
              <p className="text-[9px] sm:text-xs text-center">Payment</p>
            </div>

            <div className="w-[35px] h-[2px] lg:gap-0  lg:w-[2px] lg:h-[35px] bg-[#042974] mt-4 lg:mt-0 lg:ml-4"></div>

            <div className="flex flex-col sm:flex-row sm:justify-start flex-wrap gap-1 items-center">
              <button
                onClick={() => {
                  setStep(5);
                }}
                className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-[#a0a0a0]"
              >
                <FontAwesomeIcon icon={faCheck} className="text-white" />
              </button>
              <p className="text-[9px] sm:text-xs text-center">Confirmation</p>
            </div>
          </div>
          <div className="flex flex-col max-w-[1100px] w-full">
            {step === 2 && (
              <form
                action=""
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-wrap gap-[30px] max-w-[1100px] w-full"
              >
                {/* Select sport type */}
                {!sportId && (
                  <div className="flex flex-col gap-2 max-w-[449px] w-full">
                    <label htmlFor="sportType">
                      <span className="text-red-500 mr-1">*</span>
                      <b> Sport type</b>
                    </label>
                    <select
                      disabled={leagueId}
                      value={playersData?.sportType}
                      {...register("sportType", {
                        required: "Sport type is required",
                        onChange: (e) => {
                          setValue("leagueType", "");
                          setTeamMembers([]);
                          setValue("teamMembers", []);
                          setValue("gender", "");
                          setValue("sportType", e.target.value);
                          getLeaguesApi({ sportId: e.target.value });
                        },
                      })}
                      className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                      placeholder="Sport type"
                    >
                      <option value="">Select sport type</option>
                      {sportsData.map((sport: any) => (
                        <option key={sport.id} value={sport.id}>
                          {sport.name}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-500">
                      {errors.sportType?.message}
                    </span>
                  </div>
                )}

                {sportId && (
                  <div className="flex flex-col gap-2 max-w-[449px] w-full">
                    <label htmlFor="sportType">
                      <b> Sport type</b>
                    </label>
                    <select
                      disabled={true}
                      value={sportId}
                      className="border border-gray-300 rounded-md px-[6px] py-[12px] bg-[#f2f2f2]"
                      placeholder="Sport type"
                    >
                      {sportsData.map((sport: any) => (
                        <option key={sport.id} value={sport.id}>
                          {sport.name}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-500">
                      {errors.sportType?.message}
                    </span>
                  </div>
                )}

                {/* Select leagues type */}
                {!leagueId && (
                  <div className="flex flex-col gap-2 max-w-[449px] w-full">
                    <label htmlFor="leagueType">
                      <span className="text-red-500 mr-1">*</span>
                      <b> Leagues type</b>
                    </label>
                    <select
                      {...register("leagueType", {
                        required: "League type is required",
                        onChange: (e) => {
                          setValue("teamMembers", []);
                          setValue("gender", "");
                          setTeamMembers([]);
                          setValue("leagueType", e.target.value);
                        },
                      })}
                      className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                      placeholder="League type"
                    >
                      <option value="">Select league type</option>
                      {
                        watch("sportType") && (
                          <>
                            <div></div>
                            {isLeagueInfoLoading ? (
                              <option value="">Loading...</option>
                            ) : (
                              leaguesData?.map(
                                (league: { id: number; name: string }) => (
                                  <option key={league.id} value={league.id}>
                                    {league.name}
                                  </option>
                                )
                              )
                            )}
                          </>
                        )
                        // leagues[watch("sportType")].map(
                        //   (league: { id: number; name: string }) => (
                        //     <option key={league.id} value={league.id}>
                        //       {league.name}
                        //     </option>
                        //   )
                        // )
                      }
                    </select>
                    <span className="text-red-500">
                      {errors.leagueType?.message}
                    </span>
                  </div>
                )}

                {leagueId && (
                  <div className="flex flex-col gap-2 max-w-[449px] w-full">
                    <label htmlFor="leagueType">
                      <b> Leagues type</b>
                    </label>
                    <select
                      disabled={true}
                      value={leagueId}
                      className="border border-gray-300 rounded-md px-[6px] py-[12px]  bg-[#f2f2f2]"
                      placeholder="League type"
                    >
                      {leaguesData?.map(
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
                )}

                {/* Jersey number */}
                <div className="flex flex-col gap-2 max-w-[449px] w-full">
                  <label htmlFor="jerseyNumber">
                    <span className="text-red-500 mr-1">*</span>
                    <b> Jersey number</b>
                  </label>
                  <input
                    type="text"
                    {...register("jerseyNumber")}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                    placeholder="Jersey number"
                    maxLength={2}
                  />
                  <span className="text-[#8c8c8c] text-xs">
                    If you do not have a jersey number, please enter “NA”.
                  </span>
                  <span className="text-red-500">
                    {errors.jerseyNumber?.message}
                  </span>
                </div>

                {/* {(watch("sportType") == "2" || sportId == 2) && (
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
                )} */}

                {/* Educational institution data (name, surname, email, contact number) */}
                {(watch("sportType") == "2" || sportId == 2) && (
                  <>
                    {leaguesData?.filter(
                      (league: any) => watch("leagueType") == league.id
                    )[0]?.leagueDocuments.schoolCertificate && (
                      <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="schoolCertificate">
                          <span className="text-red-500 mr-1">*</span>
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
                          // only pdf file allowed
                          accept=".pdf"
                          {...register("schoolCertificate")}
                          className="border border-gray-300 rounded-md px-[6px] py-[12px] hidden"
                        />
                        <span className="text-[#8c8c8c] text-xs">
                          Please upload a document confirming that you have ever
                          studied in the educational institution you represent.
                        </span>
                        <span className="text-red-500">
                          {errors?.schoolCertificate?.message}
                        </span>
                      </div>
                    )}
                    {/* School official Data */}
                    {/* School official Name */}
                    <div className="flex flex-col gap-2 max-w-[350px] w-full">
                      <label htmlFor="schoolOfficialName">
                        <span className="text-red-500 mr-1">*</span>
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
                        <span className="text-red-500 mr-1">*</span>
                        <b> Educational Institution official&apos;s surname</b>
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
                        <span className="text-red-500 mr-1">*</span>
                        <b> Educational Institution official&apos;s position</b>
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
                        <span className="text-red-500 mr-1">*</span>
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
                    {leaguesData?.filter(
                      (league: any) => watch("leagueType") == league.id
                    )[0]?.leagueDocuments.schoolContact && (
                      <div className="flex flex-col gap-2 max-w-[350px] w-full">
                        <label htmlFor="schoolOfficialContactNumber">
                          <span className="text-red-500 mr-1">*</span>
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
                    )}

                    {/* School logo */}
                    {leaguesData?.filter(
                      (league: any) => watch("leagueType") == league.id
                    )[0]?.leagueDocuments.schoolLogo && (
                      <div className="flex flex-col gap-2  w-full">
                        <label htmlFor="schoolLogo">
                          <span className="text-red-500 mr-1">*</span>
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
                    )}
                  </>
                )}

                {/* ID CARD */}
                {leaguesData?.filter(
                  (league: any) => watch("leagueType") == league.id
                )[0]?.leagueDocuments.identification && (
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="personalPhoto">
                      <span className="text-red-500 mr-1">*</span>
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
                      {...register("idCard", {
                        required: "ID card is required",
                      })}
                      className="border border-gray-300 rounded-md px-[6px] py-[12px] hidden"
                    />
                    {/* info about photo */}
                    <div className="text-[12px] text-gray-500">
                      <p>
                        Please upload both sides of your ID (Şəxsiyyət Vəsiqəsi)
                        in a single one-page PDF file or any image file format.
                      </p>
                    </div>

                    <span className="text-red-500">
                      {errors?.idCard?.message}
                    </span>
                  </div>
                )}
                {/* Personal Photo */}
                {watch("sportType") != "7" && (
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="personalPhoto">
                      <span className="text-red-500 mr-1">*</span>
                      <b> Individual photo</b>
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
                            href={URL.createObjectURL(
                              watch("personalPhoto")[0]
                            )}
                            target="_blank"
                          >
                            <img
                              src={URL.createObjectURL(
                                watch("personalPhoto")[0]
                              )}
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
                    <span className="text-[#8c8c8c] text-xs">
                      A personal photo will be displayed on your virtual athlete
                      badge.
                    </span>

                    <span className="text-red-500">
                      {errors?.personalPhoto?.message}
                    </span>
                  </div>
                )}

                {/* Team logo */}
                {watch("sportType") != "7" && (
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="teamLogo">
                      <span className="text-red-500 mr-1">*</span>
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
                )}

                {/* Team name */}
                <div className="flex flex-col gap-2  w-full">
                  <label htmlFor="teamName">
                    <span className="text-red-500 mr-1">*</span>
                    <b> Team name</b>
                  </label>
                  <input
                    type="text"
                    {...register("teamName", {
                      required: "Team name is required",
                    })}
                    className="border border-gray-300 rounded-md px-[6px] py-[12px]"
                    placeholder="Team name"
                  />
                  <span className="text-red-500">{errors.quote?.message}</span>
                </div>

                {/* Team slogan */}
                <div className="flex flex-col gap-2  w-full">
                  <label htmlFor="teamSlogan">
                    <span className="text-red-500 mr-1">*</span>
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
                  ></textarea>
                  <span className="text-red-500">
                    {errors.comment?.message}
                  </span>
                </div>

                {/* Are you or your institution paying for joining the tournament? */}
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="isPaying">
                    <span className="text-red-500 mr-1">*</span>
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
                    <option value="School">Institution</option>
                    <option value="Personal">Personal</option>
                  </select>
                  <span className="text-[12px] text-gray-500">
                    In case your educational institution (school or university)
                    will cover your participation costs, you will be required to
                    enter the details of the person who will be in charge of the
                    payment. The Goalplus team will contact a designated person
                    from your educational institution to discuss further details
                    about the payment and transaction process. Your team
                    registration will be approved once the payment contract
                    between Goalplus and your educational institution is signed.
                  </span>
                  <span className="text-red-500">
                    {errors.isPaying?.message}
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

                <div>
                  <ErrorMapper fieldName={"Team info:"} error={teamInfoError} />
                  <ErrorMapper fieldName={"Id card:"} error={idCardError} />
                  <ErrorMapper fieldName={"Team logo:"} error={teamLogoError} />
                  <ErrorMapper
                    fieldName={"School certificate:"}
                    error={schoolCertificateError}
                  />
                  <ErrorMapper
                    fieldName={"School logo:"}
                    error={schoolLogoError}
                  />
                  <ErrorMapper
                    fieldName={"Personal photo:"}
                    error={personalPhotoError}
                  />
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="flex flex-wrap gap-[30px]">
                <div className="flex flex-col gap-2 w-full relative">
                  <div className="gap-2">
                    <h1 className="text-[36px]">
                      <b>Add team members</b>
                    </h1>
                    <p className="text-[12px] text-gray-500">
                      You, as the captain of the team, will be allowed to add
                      your team members. They will receive an invitation to the
                      team via email. The number of allowed team members is
                      indicated on the page with leagues.
                    </p>
                    <p className="text-[12px] text-gray-500">
                      When paying through e-point, you will need to enter that
                      amount by yourselves. If a captain chooses to pay for the
                      whole team, he/she can enter the total registration
                      amount, and all others can enter 0 AZN.
                    </p>
                  </div>
                  <div>All team members</div>
                  <div className="flex flex-wrap gap-5">{teamMembersShow}</div>

                  <AddTeamMember />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-wrap gap-[30px]  w-full">
                <div className="flex flex-col gap-2 w-full ">
                  <div className="gap-2 flex flex-col">
                    <h1 className="text-[36px]">
                      <b>Payment</b>
                    </h1>
                    <div className="flex gap-4">
                      <span>Is only captain paying ?</span>
                      <input
                        value={onlyCaptainPaying}
                        onChange={(e) => {
                          setOnlyCaptainPaying(e.target.checked);
                        }}
                        type="checkbox"
                        name=""
                        id=""
                      />
                    </div>
                    <p className="text-[12px] text-gray-500">
                      When paying through e-point, you will need to enter the
                      amount displayed on the screen by yourselves. If a captain
                      choses to pay for the whole team, then he/she check the
                      box for only captain paying. If not, then all team members
                      will pay for themselves.
                    </p>
                    {!onlyCaptainPaying && (
                      <label>Please enter your team size</label>
                    )}
                    {!onlyCaptainPaying && (
                      <input
                        disabled={onlyCaptainPaying}
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
                    )}
                    {!onlyCaptainPaying && (
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
                    )}
                    {!onlyCaptainPaying && (
                      <p className="text-[12px] text-gray-500">
                        Your total will be calculated based on the number of
                        team you have entered.
                      </p>
                    )}
                    {!onlyCaptainPaying && (
                      <p className="text-[12px] text-gray-500">
                        Minimum team players{" "}
                        {leagueInfoData?.leagueDetails?.minNumberOfPlayers}
                      </p>
                    )}
                    {!onlyCaptainPaying && (
                      <p className="text-[12px] text-gray-500">
                        Maximum team players{" "}
                        {leagueInfoData?.leagueDetails?.maxNumberOfPlayers}
                      </p>
                    )}

                    {onlyCaptainPaying && (
                      <p className="text-[12px] mt-2  text-gray-500 text-[36px]">
                        Payment based on your team size:{" "}
                        {leagueInfoData?.leagueDetails?.priceRegular} AZN
                      </p>
                    )}
                    {!onlyCaptainPaying &&
                      teamData.length <=
                        leagueInfoData?.leagueDetails?.minNumberOfPlayers && (
                        <p className="text-[12px] mt-2  text-gray-500 text-[36px]">
                          Payment based on your team size:{" "}
                          {teamSize
                            ? (
                                leagueInfoData?.leagueDetails?.priceRegular /
                                teamSize
                              ).toFixed(2)
                            : leagueInfoData?.leagueDetails?.priceRegular}
                          AZN
                        </p>
                      )}
                    {!onlyCaptainPaying &&
                      teamData.length >
                        leagueInfoData?.leagueDetails?.minNumberOfPlayers && (
                        <p className="text-[12px] mt-2  text-gray-500 text-[36px]">
                          Payment based on your team size:{" "}
                          {leagueInfoData?.leagueDetails?.priceRegular /
                            teamData.length}
                        </p>
                      )}
                    <div className="flex gap-4 text-[30px] text-green-500">
                      <span>Total payment made by team</span>
                      <span>{getTeamTotalPaymentData?.value}</span>
                    </div>
                    <p className="text-[12px] text-gray-500">
                      Go to payment page and proceed payment based on calculated
                      value. You can see below payment example image for easy to
                      understand
                    </p>
                  </div>
                  <div className="flex flex-wrap items-start">
                    {/* <img
                      src={paymentExample.src}
                      className="w-[350px] mt-[35px] h-auto"
                      alt="payment example"
                    /> */}
                    {/* <iframe
                      src="https://epoint.az/az/widget?id=1882&type=users"
                      allowTransparency={true}
                      width={350}
                      height={175}
                    ></iframe> */}
                    <button
                      onClick={proceedPayment}
                      type="button"
                      className="bg-[#f2f2f2]  px-5 py-2 rounded-md text-black transition hover:bg-[#e2e2e2]"
                    >
                      Submit Payment
                    </button>
                    {/* <iframe
                      src="https://epoint.az/az/pay_form_widget?id=1882"
                      width="420"
                      height="580"
                    ></iframe> */}
                  </div>
                </div>
              </div>
            )}

            {/* {step === 5 && (
              <div className="flex flex-wrap gap-[30px]  w-full">
                You have to fill all the necessary information to proceed
              </div>
            )} */}
          </div>
        </div>
        <div className="flex justify-end w-full">
          {step > 2 && (
            <button
              onClick={() => {
                if (step === 2) {
                  return;
                }
                setStep(step - 1);
              }}
              className="bg-[#f2f2f2]  px-5 py-2 rounded-md text-black transition hover:bg-[#e2e2e2]"
            >
              Prev
            </button>
          )}
          {!isPlayersUserInfo && (
            <button
              onClick={() => {
                if (step === 4) {
                  return;
                }
                setStep(step + 1);
              }}
              className="bg-[#f2f2f2] px-5 py-2 rounded-md ml-2 text-black transition hover:bg-[#e2e2e2]"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

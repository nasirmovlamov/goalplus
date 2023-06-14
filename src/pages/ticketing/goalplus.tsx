import ErrorMapper from "@/components/ErrorMapper";
import { ticketingApi } from "@/store/ticketingApi";
import axios from "axios";
import { watch } from "fs";
import { useRouter } from "next/router";
import { config } from "process";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { date } from "yup";

type Props = {};

const GoaplusTicketing = (props: Props) => {
  const router = useRouter();
  const {
    isLoading: getTicketTypeLoading,
    isError: isGetTicketTypeError,
    isSuccess: getTicketTypeSuccess,
    data: getTicketTypeData,
    error: getTicketTypeError,
  } = ticketingApi.useGetTicketTypesQuery();
  const [errorsSubmit, setErrorsSubmit] = React.useState<any>(null);
  const [
    submitTicketApi,
    {
      isLoading: postTicketLoading,
      isError: isPostTicketError,
      isSuccess: postTicketSuccess,
      data: postTicketData,
      error: postTicketError,
    },
  ] = ticketingApi.useSubmitTicketMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const onSubmit = async (data: any) => {
    setErrorsSubmit(null);
    let postData: any = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      birthDate: data.birthdate,
      phoneNumber: data.phoneNumber,
      schoolName: data.schoolName,
    };
    if (data.date) {
      postData.attendanceDate = data.date;
    }
    const resp: any = await axios
      .post(
        `https://api.goalplus.az/api/payments/request/visitor?ticketTypeId=${data.ticketType}`,
        postData
      )
      .then((res: any) => {
        console.log(res);
        if (res.status === 204 && res.data === "") {
          toast.success(
            "Ticket is successfully created, please check you email!"
          );
        }
        if (res.status === 200 && res.data !== "") {
          toast.success("Ticket is successfully created, please make payment!");
          setTimeout(() => {
            window.open(res.data, "_blank");
          }, 2000);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.log(err.response.data);
        setErrorsSubmit(err.response.data);
      });
  };

  const checkTicketDatesInSameDay = (
    dates:
      | {
          startTime: string;
          endTime: string;
        }[]
      | undefined
      | null
  ) => {
    if (!dates) {
      return false;
    }
    let allDatesInSameDay = true;
    for (let i = 0; i < dates.length; i++) {
      const startTime = new Date(dates[i].startTime);
      const endTime = new Date(dates[i].endTime);
      if (startTime.getDate() !== endTime.getDate()) {
        allDatesInSameDay = false;
      }
    }
    return allDatesInSameDay;
  };

  if (getTicketTypeSuccess)
    return (
      <div className="mx-auto max-w-[1175px] px-[15px]  mt-[120px] ">
        <div className="mx-auto mt-10 gap-5">
          {getTicketTypeData?.filter(
            (item: any) => item.id == watch("ticketType")
          )[0]?.name ? (
            <>
              <h1 className="text-[30px] font-bold text-[#05055B]">
                {
                  getTicketTypeData?.filter(
                    (item: any) => item.id == watch("ticketType")
                  )[0]?.name
                }{" "}
              </h1>
              <p
                className={`mb-2  text-[24px] mt-[22px] ${
                  getTicketTypeData?.filter(
                    (item: any) => item.id == watch("ticketType")
                  )[0]?.name
                    ? "text-[#05055B] "
                    : "text-gray-200"
                }`}
              >
                Price - {"  "}
                {
                  getTicketTypeData?.filter(
                    (item: any) => item.id == watch("ticketType")
                  )[0]?.price
                }{" "}
                AZN
              </p>
              <p
                className={`mb-2  text-[24px] mt-[4px] ${
                  getTicketTypeData?.filter(
                    (item: any) => item.id == watch("ticketType")
                  )[0]?.name
                    ? "text-[#05055B] "
                    : "text-gray-200"
                }`}
              >
                Description - {"  "}
                {
                  getTicketTypeData?.filter(
                    (item: any) => item.id == watch("ticketType")
                  )[0]?.description
                }
              </p>
            </>
          ) : (
            <h1 className="text-[30px] font-bold text-[#05055B]">
              Please select ticket type
            </h1>
          )}
          <form
            action=""
            className="mx-auto flex flex-wrap gap-5 mt-[40px] pb-10 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="ticket-type"
                className="text-[16px] text-[#9B9B9B] "
              >
                Ticket Type
              </label>
              <select
                id="ticket-type"
                className="w-full border border-gray-300 rounded-sm px-[24px] py-[15px] bg-[#F2F2F2] text-[#9B9B9B]"
                {...register("ticketType", {
                  required: true,
                  onChange: (e) => {
                    setValue("ticketType", e.target.value);
                    setValue("date", "");
                  },
                })}
              >
                <option value="" selected>
                  {" "}
                  Select ticket date
                </option>
                {getTicketTypeData.map((ticketType: any) => (
                  <option key={ticketType.id} value={ticketType.id}>
                    {ticketType.name}
                  </option>
                ))}
              </select>
              <span className="text-red-500">
                {errors.ticketType && "Ticket Type is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1 max-w-[555px] w-full">
              <label htmlFor="date" className="text-[16px] text-[#9B9B9B] ">
                First Name
              </label>
              <input
                id="name"
                type="text"
                {...register("firstName", { required: true })}
                className="w-full border border-gray-300 rounded-sm px-[24px] py-[15px] bg-[#F2F2F2] text-[#9B9B9B]"
              />
              <span className="text-red-500">
                {errors.firstName && "Firstname is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1 max-w-[555px] w-full">
              <label htmlFor="date" className="text-[16px] text-[#9B9B9B] ">
                Last Name
              </label>
              <input
                id="name"
                type="text"
                {...register("lastName", { required: true })}
                className="w-full border border-gray-300 rounded-sm px-[24px] py-[15px] bg-[#F2F2F2] text-[#9B9B9B]"
              />
              <span className="text-red-500">
                {errors.lastName && "Lastname is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1 max-w-[555px] w-full">
              <label htmlFor="date" className="text-[16px] text-[#9B9B9B] ">
                Email
              </label>
              <input
                id="name"
                type="text"
                {...register("email", { required: true })}
                className="w-full border border-gray-300 rounded-sm px-[24px] py-[15px] bg-[#F2F2F2] text-[#9B9B9B]"
              />
              <span className="text-red-500">
                {errors.email && "Email is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1 max-w-[555px] w-full">
              <label htmlFor="date" className="text-[16px] text-[#9B9B9B] ">
                Phone number
              </label>
              <input
                id="name"
                type="text"
                {...register("phoneNumber", { required: true })}
                className="w-full border border-gray-300 rounded-sm px-[24px] py-[15px] bg-[#F2F2F2] text-[#9B9B9B]"
              />
              <span className="text-red-500">
                {errors.phoneNumber && "Phone number is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1 max-w-[555px] w-full">
              <label className="text-[16px] text-[#9B9B9B] ">Gender</label>
              <div className="flex gap-2 mt-[23px]">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    value="Male"
                    checked={watch("gender") == "Male"}
                    {...register("gender", { required: true })}
                    className="w-[32px] h-[32px]"
                  />
                  <span className="text-[20px] text-[#9B9B9B]">Male</span>
                </div>
                <div className="flex items-center gap-4 ml-[27px]">
                  <input
                    type="radio"
                    value="Female"
                    checked={watch("gender") == "Female"}
                    {...register("gender", { required: true })}
                    className="w-[32px] h-[32px]"
                  />
                  <span className="text-[20px] text-[#9B9B9B]">Female</span>
                </div>
              </div>
              <span className="text-red-500">
                {errors.gender && "Gender is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1 max-w-[555px] w-full">
              <label htmlFor="date" className="text-[16px] text-[#9B9B9B] ">
                Birthdate
              </label>
              <input
                id="name"
                type="date"
                {...register("birthdate", { required: true })}
                className="w-full border border-gray-300 rounded-sm px-[24px] py-[15px] bg-[#F2F2F2] text-[#9B9B9B]"
              />
              <span className="text-red-500">
                {errors.birthdate && "Lastname is required"}
              </span>
            </div>

            {checkTicketDatesInSameDay(
              getTicketTypeData?.filter(
                (item: any) => item.id == watch("ticketType")
              )[0]?.dates
            ) ? (
              <div className="flex flex-col w-full">
                <label htmlFor="date" className="text-[16px] text-[#9B9B9B] ">
                  Select event date
                </label>
                <select
                  id="name"
                  {...register("date", { required: true })}
                  className="w-full border border-gray-300 rounded-sm px-[24px] py-[15px] bg-[#F2F2F2] text-[#9B9B9B]"
                >
                  {getTicketTypeData
                    ?.filter((item: any) => item.id == watch("ticketType"))[0]
                    ?.dates?.map((date: any, index: any) => (
                      <option key={index} value={index}>
                        {/* start clock  */}
                        {new Date(date?.startTime)?.toDateString() + " "}
                        {new Date(date?.startTime)?.toLocaleTimeString(
                          "az-AZ"
                        )}{" "}
                        {/*  */}- {/* end date */}
                        {new Date(date?.endTime)?.toDateString() + " "}
                        {new Date(date?.endTime)?.toLocaleTimeString(
                          "az-AZ"
                        )}{" "}
                      </option>
                    ))}
                </select>
                <span className="text-red-500">
                  {errors.date && "Date is required"}
                </span>
              </div>
            ) : (
              <></>
            )}

            <button
              className="w-full bg-[#031F57] text-white py-2 rounded-md"
              type="submit"
            >
              Submit
            </button>

            <div>
              {errorsSubmit &&
                Object.keys(errorsSubmit).map((key) => {
                  return (
                    <p key={key} className="text-red-500">
                      {errorsSubmit[key]}
                    </p>
                  );
                })}
            </div>
          </form>
        </div>
      </div>
    );
};

export default GoaplusTicketing;

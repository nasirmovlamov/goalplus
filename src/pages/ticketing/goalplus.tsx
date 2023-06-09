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
      <div className="mx-auto max-w-[1140px] px-[15px]">
        <div className="mx-auto mt-10 gap-5">
          <h1 className="text-2xl font-bold">
            {
              getTicketTypeData?.filter(
                (item: any) => item.id == watch("ticketType")
              )[0]?.name
            }{" "}
          </h1>
          <h2 className="mt-2 mb-2">
            Price - {"  "}
            {
              getTicketTypeData?.filter(
                (item: any) => item.id == watch("ticketType")
              )[0]?.price
            }{" "}
            AZN
          </h2>
          <h2 className="mt-2 mb-2">
            Description - {"  "}
            {
              getTicketTypeData?.filter(
                (item: any) => item.id == watch("ticketType")
              )[0]?.description
            }
          </h2>

          <form
            action=""
            className="mx-auto flex flex-col gap-5 mt-5 pb-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="ticket-type" className="text-sm text-gray-500">
                Ticket Type
              </label>
              <select
                id="ticket-type"
                className="w-full border border-gray-300 rounded-md px-2 py-1"
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

            <div className="flex flex-col gap-1">
              <label htmlFor="date" className="text-sm text-gray-500">
                First Name
              </label>
              <input
                id="name"
                type="text"
                {...register("firstName", { required: true })}
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              />
              <span className="text-red-500">
                {errors.firstName && "Firstname is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="date" className="text-sm text-gray-500">
                Last Name
              </label>
              <input
                id="name"
                type="text"
                {...register("lastName", { required: true })}
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              />
              <span className="text-red-500">
                {errors.lastName && "Lastname is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="date" className="text-sm text-gray-500">
                Email
              </label>
              <input
                id="name"
                type="text"
                {...register("email", { required: true })}
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              />
              <span className="text-red-500">
                {errors.email && "Email is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="date" className="text-sm text-gray-500">
                Phone number
              </label>
              <input
                id="name"
                type="text"
                {...register("phoneNumber", { required: true })}
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              />
              <span className="text-red-500">
                {errors.phoneNumber && "Phone number is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500">Gender</label>
              <select
                id="name"
                {...register("gender", { required: true })}
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <span className="text-red-500">
                {errors.gender && "Gender is required"}
              </span>
            </div>

            {checkTicketDatesInSameDay(
              getTicketTypeData?.filter(
                (item: any) => item.id == watch("ticketType")
              )[0]?.dates
            ) ? (
              <div className="flex flex-col gap-1">
                <label htmlFor="date" className="text-sm text-gray-500">
                  Select event date
                </label>
                <select
                  id="name"
                  {...register("date", { required: true })}
                  className="w-full border border-gray-300 rounded-md px-2 py-1"
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

            <div className="flex flex-col gap-1">
              <label htmlFor="date" className="text-sm text-gray-500">
                Birthdate
              </label>
              <input
                id="name"
                type="date"
                {...register("birthdate", { required: true })}
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              />
              <span className="text-red-500">
                {errors.birthdate && "Lastname is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="date" className="text-sm text-gray-500">
                Educational Institution
              </label>
              <input
                id="name"
                type="text"
                {...register("schoolName", { required: true })}
                className="w-full border border-gray-300 rounded-md px-2 py-1"
              />
              <span className="text-red-500">
                {errors.schoolName && "School name is required"}
              </span>
            </div>

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

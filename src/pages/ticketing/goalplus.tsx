import ErrorMapper from "@/components/ErrorMapper";
import { ticketingApi } from "@/store/ticketingApi";
import axios from "axios";
import { useRouter } from "next/router";
import { config } from "process";
import React, { use, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Select from "react-select";
import { date } from "yup";
import { format } from "date-fns";

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
    console.log("data", data);
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

  register("ticketType", { required: true });

  useEffect(() => {
    if (getTicketTypeSuccess) {
      console.log(
        getTicketTypeData
          ?.filter((item: any) => item.id == watch("ticketType"))[0]
          ?.dates?.map((date: any, index: any) => {
            if (new Date(date.startTime) > new Date()) {
              return {
                label: `
                        ${format(new Date(date.startTime), "MMMM d")}
                  `,
                value: index,
              };
            } else {
              return null;
            }
          })
          .filter((item: any) => item !== null)
      );
    }
  }, [getTicketTypeSuccess, watch("ticketType")]);

  useEffect(() => {
    if (
      checkTicketDatesInSameDay(
        getTicketTypeData?.filter(
          (item: any) => item.id == watch("ticketType")
        )[0]?.dates
      )
    ) {
      register("date", { required: true });
    } else {
      register("date");
    }
  }, [watch("ticketType")]);

  if (getTicketTypeSuccess)
    return (
      <div className="mx-auto max-w-[1175px] px-[15px]  mt-[120px] ">
        <div className="mx-auto mt-10 gap-5">
          {getTicketTypeData?.filter(
            (item: any) => item.id == watch("ticketType")
          )[0]?.name ? (
            <>
              <h1 className="text-[30px] font-bold text-[#05055B] font-integral">
                {
                  getTicketTypeData?.filter(
                    (item: any) => item.id == watch("ticketType")
                  )[0]?.name
                }{" "}
              </h1>
              <p
                className={`mb-2  text-[24px] mt-[22px] font-bold ${
                  getTicketTypeData?.filter(
                    (item: any) => item.id == watch("ticketType")
                  )[0]?.name
                    ? "text-[#8A0F9E] "
                    : "text-gray-200"
                }`}
              >
                Price: {"  "}
                {
                  getTicketTypeData?.filter(
                    (item: any) => item.id == watch("ticketType")
                  )[0]?.price
                }{" "}
                AZN
              </p>
              <p
                className={`mb-2  text-[24px] mt-[4px] font-bold ${
                  getTicketTypeData?.filter(
                    (item: any) => item.id == watch("ticketType")
                  )[0]?.name
                    ? "text-[#8A0F9E] "
                    : "text-gray-200"
                }`}
              >
                {
                  getTicketTypeData?.filter(
                    (item: any) => item.id == watch("ticketType")
                  )[0]?.description
                }
              </p>
            </>
          ) : (
            <h1 className="text-[30px] font-bold text-[#05055B] font-integral">
              Please select the activity you want to attend:
            </h1>
          )}
          <form
            action=""
            className="mx-auto flex flex-wrap gap-8 mt-[40px] pb-10 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="ticket-type"
                className="text-[16px] text-[#9B9B9B] "
              >
                Ticket Type
              </label>
              <Select
                options={getTicketTypeData.map((ticketType: any) => {
                  return {
                    value: ticketType.id,
                    label: ticketType.name,
                  };
                })}
                onChange={(e: any) => {
                  setValue("ticketType", e.value);
                  setValue("date", "");
                }}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "#F2F2F2",
                    height: "64px",
                  }),
                }}
              />
              <span className="text-red-500">
                {errors.ticketType && "Ticket type is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1 lg:max-w-[555px] w-full">
              <label htmlFor="date" className="text-[16px] text-[#9B9B9B] ">
                First Name
              </label>
              <input
                id="name"
                type="text"
                {...register("firstName", { required: true })}
                placeholder="Your First Name"
                className=" h-[64px] w-full border border-gray-300 rounded-sm px-[24px] py-[15px] bg-[#F2F2F2] text-[#9B9B9B]"
              />
              <span className="text-red-500">
                {errors.firstName && "First name is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1 lg:max-w-[555px] w-full">
              <label htmlFor="date" className="text-[16px] text-[#9B9B9B] ">
                Last Name
              </label>
              <input
                id="name"
                type="text"
                {...register("lastName", { required: true })}
                placeholder="Your Last Name"
                className=" h-[64px] w-full border border-gray-300 rounded-sm px-[24px] py-[15px] bg-[#F2F2F2] text-[#9B9B9B]"
              />
              <span className="text-red-500">
                {errors.lastName && "Last name is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1 lg:max-w-[555px] w-full">
              <label htmlFor="date" className="text-[16px] text-[#9B9B9B] ">
                Email
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Email"
                {...register("email", { required: true })}
                className=" h-[64px] w-full border border-gray-300 rounded-sm px-[24px] py-[15px] bg-[#F2F2F2] text-[#9B9B9B]"
              />
              <span className="text-red-500">
                {errors.email && "Email is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1 lg:max-w-[555px] w-full">
              <label htmlFor="date" className="text-[16px] text-[#9B9B9B] ">
                Phone number
              </label>
              <input
                id="name"
                type="text"
                placeholder="994501234567"
                {...register("phoneNumber", { required: true })}
                className=" h-[64px] w-full border border-gray-300 rounded-sm px-[24px] py-[15px] bg-[#F2F2F2] text-[#9B9B9B]"
              />
              <span className="text-red-500">
                {errors.phoneNumber && "Phone number is required"}
              </span>
            </div>

            <div className="flex flex-col gap-1 lg:max-w-[555px] w-full">
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

            <div className="flex flex-col gap-1 lg:max-w-[555px] w-full">
              <label htmlFor="date" className="text-[16px] text-[#9B9B9B] ">
                Birthdate
              </label>
              <input
                id="name"
                type="date"
                {...register("birthdate", { required: true })}
                className=" h-[64px] w-full border border-gray-300 rounded-sm px-[24px] py-[15px] bg-[#F2F2F2] text-[#9B9B9B]"
              />
              <span className="text-red-500">
                {errors.birthdate && "Birthdate is required"}
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
                <Select
                  options={getTicketTypeData
                    ?.filter((item: any) => item.id == watch("ticketType"))[0]
                    ?.dates?.map((date: any, index: any) => {
                      if (new Date(date.startTime) > new Date()) {
                        return {
                          label: `
                        ${format(new Date(date.startTime), "MMMM d")}
                  `,
                          value: index,
                        };
                      } else {
                        return null;
                      }
                    })
                    .filter((item: any) => item !== null)}
                  onChange={(e: any) => setValue("date", e.value)}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: "#F2F2F2",
                      height: "64px",
                    }),
                  }}
                />
                <span className="text-red-500">
                  {errors.date && "Date is required"}
                </span>
              </div>
            ) : (
              <></>
            )}

            <div className="flex items-center flex-col gap-1  w-full mt-[32px]">
              <div className="max-w-[500px] flex flex-col items-center">
                <label className="text-[16px] text-[#9B9B9B] ">
                  Do you have a Wolt account?
                </label>
                <div className="flex gap-2 mt-[23px]">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      value="Yes"
                      checked={watch("hasWoltAccount") == "Yes"}
                      {...register("hasWoltAccount")}
                      className="w-[32px] h-[32px]"
                    />
                    <span className="text-[20px] text-[#9B9B9B]">Yes</span>
                  </div>
                  <div className="flex items-center gap-4 ml-[27px]">
                    <input
                      type="radio"
                      value="No"
                      checked={watch("hasWoltAccount") == "No"}
                      {...register("hasWoltAccount")}
                      className="w-[32px] h-[32px]"
                    />
                    <span className="text-[20px] text-[#9B9B9B]">No</span>
                  </div>
                </div>
                <p className="text-[#1C21FF] text-lg text-center mt-[12px]">
                  Haven’t got Wolt account yet? No worries, we got you covered!
                  <br />
                  Here’s is the chance to try out quick delivery from a wide
                  range of restaurants 🍕, stores 🛍 and supermarkets 🛒
                  <br />
                  Use the promo code below and enjoy a 3 AZN discount for the
                  first 4 purchases 💙
                  <br />
                  <span className="text-2xl">
                    {" "}
                    Promocode: <b> GOALPLUS</b>
                  </span>
                </p>
              </div>
            </div>

            <button
              className="w-full bg-[#031F57] text-white py-2 rounded-md mt-[120px] h-[64px] text-[20px]"
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

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

interface Ticket {
  id: number;
  name: string;
  description: string;
  dates: {
    startTime: string;
    endTime: string;
    weekDays: any[];
  }[];
  price: number;
  ticketCategory: string;
}

export const AZERBAIJAN_PHONE_REGEX = /^\994(77|55|50|99|51|70|10)\d{7}$/;

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
  const [submitLoading, setSubmitLoading] = React.useState<boolean>(false);
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
    reset,
  } = useForm();

  useEffect(() => {
    if (navigator.userAgent.includes("Instagram")) {
      window.open(
        "https://www.instagram.com/goalplus.az/ticketing/goalplus",
        "_blank",
        "noopener,noreferrer"
      );
    }
  }, [navigator]);

  const onSubmit = async (data: any) => {
    setSubmitLoading(true);
    setErrorsSubmit(null);
    let postData: any = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      dateOfBirth: new Date(data.birthdate).toISOString(),
      phoneNumber: data.phoneNumber,
      schoolName: data.schoolName,
      hasWolt: data.hasWolt === "Yes" ? true : false,
    };
    if (data.date) {
      postData.attendancePeriod = data.date;
    }
    const resp: any = await axios
      .post(
        `https://api.goalplus.az/api/payments/request/visitor?ticketTypeId=${data.ticketType}`,
        postData
      )
      .then((res: any) => {
        if (res.status === 204 && res.data === "") {
          toast.success(
            "Your ticket has been successfully created, please check your email! / Bilet uğurla yaradıldı, emailınızı yoxlayın!",
            {
              duration: 10000,
            }
          );
        }
        if (res.status === 200 && res.data !== "") {
          toast.success(
            "Ticket is successfully created, please make payment! / Bilet uğurla yaradıldı, ödəniş edin!",
            {
              duration: 10000,
            }
          );
          setTimeout(() => {
            // redirect to res.data
            window.location.href = res.data;
          }, 2000);
        }
      })
      .catch((err) => {
        toast.error("Something went wrong! / Bir şeylər yanlış gedir!");
        console.log(err.response.data);
        setErrorsSubmit(err.response.data);
      });
    setSubmitLoading(false);
    reset();
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
    let isTheRangeDateType = true;
    for (let i = 0; i < dates.length; i++) {
      const startTime = new Date(dates[i].startTime);
      const endTime = new Date(dates[i].endTime);
      console.log("startTime.getDate()", startTime.getDate());
      console.log("endTime.getDate()", endTime.getDate());
      if (startTime.getDate() !== endTime.getDate()) {
        isTheRangeDateType = false;
      }
    }
    return isTheRangeDateType;
  };

  register("ticketType", { required: true });

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

  function reorderTickets(response: Ticket[]): Ticket[] {
    const freeTickets: Ticket[] = [];
    const dailyTickets: Ticket[] = [];
    const unlimitedTicket: Ticket[] = [];
    const vipTicket: Ticket[] = [];
    const otherTickets: Ticket[] = [];

    for (const ticket of response) {
      if (ticket.price === 0) {
        freeTickets.push(ticket);
      } else if (ticket.name.includes("Daily GoalPass")) {
        dailyTickets.push(ticket);
      } else if (ticket.name.includes("Unlimited GoalPass")) {
        unlimitedTicket.push(ticket);
      } else if (ticket.name.includes("VIP Goalpass")) {
        vipTicket.push(ticket);
      } else {
        otherTickets.push(ticket);
      }
    }

    return [
      ...freeTickets,
      ...dailyTickets,
      ...unlimitedTicket,
      ...vipTicket,
      ...otherTickets,
    ];
  }

  const yesterday_23_59 = new Date();
  yesterday_23_59.setDate(yesterday_23_59.getDate() - 1);
  yesterday_23_59.setHours(23);
  yesterday_23_59.setMinutes(59);
  yesterday_23_59.setSeconds(0);
  yesterday_23_59.setMilliseconds(0);

  if (getTicketTypeSuccess)
    return (
      <div className="mx-auto max-w-[1175px] px-[15px]  mt-[120px] h-max">
        <div className="mx-auto mt-10 gap-5 h-max">
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
                options={reorderTickets(getTicketTypeData).map(
                  (ticketType: any) => {
                    return {
                      value: ticketType.id,
                      label: ticketType.name,
                    };
                  }
                )}
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

            {getTicketTypeData?.filter(
              (item: any) => item.id == watch("ticketType")
            )[0]?.name && (
              <div className="flex flex-col w-full h-max">
                <p
                  className={`mb-2  text-[24px]  font-bold ${
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
                  className={`mb-2 w-full resize-none h-max bg-transparent   text-[18px]  font-bold ${
                    getTicketTypeData?.filter(
                      (item: any) => item.id == watch("ticketType")
                    )[0]?.name
                      ? "text-[#8A0F9E] "
                      : "text-gray-200"
                  }`}
                >
                  {getTicketTypeData
                    ?.filter((item: any) => item.id === watch("ticketType"))[0]
                    ?.description.split("\n")
                    .map((line: any, index: any) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-1 lg:max-w-[555px] w-full">
              <label htmlFor="date" className="text-[16px] text-[#9B9B9B] ">
                First Name / Ad
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
                Last Name / Soyad
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
                Email / E-poçt
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
                Phone number / Telefon nömrəsi
              </label>
              <input
                id="name"
                type="text"
                placeholder="994501234567"
                maxLength={12}
                {...register("phoneNumber", {
                  required: true,
                  // Azerbaijani phone number regex
                  pattern: AZERBAIJAN_PHONE_REGEX,
                  onChange: (e) => {
                    // remove empty space , special char and letters
                    e.target.value = e.target.value
                      .replace(/[^0-9]/g, "")
                      .replace(/(\..*)\./g, "$1");
                    setValue("phoneNumber", e.target.value);
                  },
                })}
                className=" h-[64px] w-full border border-gray-300 rounded-sm px-[24px] py-[15px] bg-[#F2F2F2] text-[#9B9B9B]"
              />
              <span className="text-red-500">
                {errors?.phoneNumber?.type === "required" &&
                  "Phone number is required"}
              </span>
              <span className="text-red-500">
                {errors?.phoneNumber?.type === "pattern" &&
                  "Please enter valid phone number example: 994501234567"}
              </span>
            </div>

            <div className="flex flex-col gap-1 lg:max-w-[555px] w-full">
              <label className="text-[16px] text-[#9B9B9B] ">
                Gender / Cinsiniz
              </label>
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
                Birthdate / Doğum tarixi
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
                  Select event date / Tədbir tarixini seçin
                </label>
                <Select
                  options={getTicketTypeData
                    ?.filter((item: any) => item.id == watch("ticketType"))[0]
                    ?.dates?.map((date: any, index: any) => {
                      if (new Date(date.startTime) > yesterday_23_59) {
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
                  Do you have a Wolt account? / Wolt hesabınız varmı?
                </label>
                <div className="flex gap-2 mt-[23px]">
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      value="Yes"
                      checked={watch("hasWolt") == "Yes"}
                      {...register("hasWolt")}
                      className="w-[32px] h-[32px]"
                    />
                    <span className="text-[20px] text-[#9B9B9B]">Yes</span>
                  </div>
                  <div className="flex items-center gap-4 ml-[27px]">
                    <input
                      type="radio"
                      value="No"
                      checked={watch("hasWolt") == "No"}
                      {...register("hasWolt")}
                      className="w-[32px] h-[32px]"
                    />
                    <span className="text-[20px] text-[#9B9B9B]">No</span>
                  </div>
                </div>
                {watch("hasWolt") == "No" && (
                  <p className="text-[#1C21FF] text-lg text-center mt-[12px]">
                    Haven’t got Wolt account yet? No worries, we got you
                    covered! Here’s the chance to try out quick delivery from a
                    wide range of restaurants 🍕, stores 🛍 and supermarkets 🛒
                    Use the promo code below and enjoy a 3 AZN discount for the
                    first 4 purchases 💙
                    <br />
                    <br />
                    <span className="text-2xl">
                      Promocode: <b> GOALPLUS</b>
                    </span>
                  </p>
                )}
              </div>
            </div>

            <button
              disabled={submitLoading}
              className="w-full bg-[#031F57] text-white py-2 rounded-md mt-[35px] h-[64px] text-[20px]"
              type="submit"
              style={{ opacity: submitLoading ? 0.5 : 1 }}
            >
              Submit / Təsdiqlə
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

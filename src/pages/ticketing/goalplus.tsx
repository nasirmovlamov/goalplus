import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

const GoaplusTicketing = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="mx-auto max-w-[1140px] px-[15px]">
      <div className="mx-auto mt-10">
        <form
          action=""
          className="mx-auto flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="ticket-type" className="text-sm text-gray-500">
              Ticket Type
            </label>
            <select
              id="ticket-type"
              className="w-full border border-gray-300 rounded-md px-2 py-1"
              {...register("ticketType", { required: true })}
            >
              <option value="1">Ticket Type 1</option>
              <option value="2">Ticket Type 2</option>
              <option value="3">Ticket Type 3</option>
            </select>
            <span>{errors.ticketType && "Ticket Type is required"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="date" className="text-sm text-gray-500">
              Select Date
            </label>
            <input
              id="date"
              type="date"
              {...register("date", { required: true })}
              className="w-full border border-gray-300 rounded-md px-2 py-1"
            />
            <span>{errors.ticketType && "Date is required"}</span>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default GoaplusTicketing;

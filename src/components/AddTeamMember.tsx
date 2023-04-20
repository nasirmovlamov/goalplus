import { useForm } from "react-hook-form";

export const AddTeamMember = ({
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
    <div className="flex flex-wrap gap-[30px]  w-full mt-4">
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

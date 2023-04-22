import { teamApi } from "@/store/teamApi";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const AddTeamMember = () => {
  const [
    addTeamMemberApi,
    {
      isLoading: addTeamMemberLoading,
      isError: isAddTeamMemberError,
      isSuccess: addTeamMemberSuccess,
      data: addTeamMemberData,
      error: addTeamMemberError,
    },
  ] = teamApi.useInvitationsMutation();

  type teamMemberDto = {
    teamMembers: {
      name: string;
      surname: string;
      email: string;
      contactNumber: string;
    };
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<teamMemberDto>();

  const submitHandle = async (data: teamMemberDto) => {
    console.log(data);
    try {
      const resp = await addTeamMemberApi({
        firstName: data.teamMembers.name,
        lastName: data.teamMembers.surname,
        email: data.teamMembers.email,
        phoneNumber: data.teamMembers.contactNumber,
      })
        .unwrap()
        .then((res) => {
          toast.success("Team member added");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    } catch (error) {}
  };

  const teamMemberErrorData = useMemo(() => {
    if (isAddTeamMemberError) {
      return addTeamMemberError as any;
    }
    return null;
  }, [isAddTeamMemberError, addTeamMemberError]);
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
          className="bg-[#032974] text-white px-[6px] py-[12px] rounded-md"
          onClick={handleSubmit(submitHandle)}
        >
          Add Player
        </button>
      </div>

      {teamMemberErrorData &&
        ("status" in teamMemberErrorData ? (
          <div>
            <div>
              {teamMemberErrorData?.data &&
                Object.keys(teamMemberErrorData.data).map((key) => {
                  key !== "statusCode" && (
                    <p key={key} className="text-red-500">
                      {teamMemberErrorData.data[key]}
                    </p>
                  );
                })}
            </div>
          </div>
        ) : null)}
    </div>
  );
};

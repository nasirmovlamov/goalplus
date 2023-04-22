import { useAppSelector } from "@/store/store";

type Props = {};

export default function AdminDashboard(props: Props) {
  const userJwt = useAppSelector((state) => state.auth.jwt);

  if (!userJwt) {
    return <div>Not authorized</div>;
  }

  return (
    <div className="max-w-[1800px] justify-center flex gap-2 ">
      <div className="max-w-[350px] w-full p-10 min-h-[100px] border-r border-red-200">
        sidebar{" "}
      </div>
      <div className="w-full p-10">content</div>
    </div>
  );
}

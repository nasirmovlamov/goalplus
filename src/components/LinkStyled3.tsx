import Link from "next/link";

export const LinkStyled3 = (Props: any) => (
  <Link
    {...Props}
    className={`${
      Props.className +
      " bg-white text-[#05055B] font-bold text-lg px-10 py-3 rounded-md  max-w-[320px] w-full flex justify-center hover:bg-[#05055B] hover:text-white transition duration-300 ease-in-out h-[64px] items-center"
    }`}
  >
    {Props.children}
  </Link>
);

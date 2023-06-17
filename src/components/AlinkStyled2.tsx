export const ALinkStyled2 = (Props: any) => (
  <a
    {...Props}
    href={Props.href}
    target="_blank"
    className={`${
      Props.className +
      " bg-[#05055B] text-white font-bold text-lg px-10 py-3 rounded-md border-white border max-w-[320px] w-full flex justify-center hover:bg-white hover:text-[#05055B] transition duration-300 ease-in-out h-[64px] items-center"
    }`}
  >
    {Props.children}
  </a>
);

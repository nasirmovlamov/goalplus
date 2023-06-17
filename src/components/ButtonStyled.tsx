export const ButtonStyled = (Props: any) => (
  <button
    className={`${
      Props.className
        ? Props.className
        : "bg-[#FFC000] text-[#031F57] font-bold text-lg px-10 py-3 rounded-md"
    }`}
    {...Props}
  >
    {Props.children}
  </button>
);

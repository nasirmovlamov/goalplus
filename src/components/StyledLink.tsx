import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {
  href: any;
  children: React.ReactNode;
  className?: any;
};

const StyledLink = (props: Props) => {
  const router = useRouter();
  const [activePath, setActivePath] = React.useState(router.pathname);

  useEffect(() => {
    setActivePath(router.pathname);
  }, [router.pathname]);
  return (
    <Link
      href={props.href}
      className={
        props.href === activePath
          ? "text-white"
          : "text-[#9F9FB9] hover:text-white"
      }
    >
      {props.children}
    </Link>
  );
};

export default StyledLink;

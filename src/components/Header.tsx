import Image from "next/image";
import NavLinks from "./Navlinks";
import Link from "next/link";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="mx-auto container max-w-7xl mt-5">
      <Link href={"/"}>
        <div className="flex flex-col items-center justify-center">
          <Image src="/logo.png" alt="logo" width={250} height={120} />

          <div className="mt-2">{date}</div>
        </div>
      </Link>
      <NavLinks />
    </div>
  );
};

export default Header;

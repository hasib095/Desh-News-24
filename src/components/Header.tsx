
import Image from "next/image";
import NavLinks from "./Navlinks";


const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="mx-auto container max-w-7xl mt-5">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={250}
          height={120}
        />

        <div className="mt-2">
          {date}
        </div>
      </div>
      <NavLinks/>
    </div>

  );
};

export default Header;

